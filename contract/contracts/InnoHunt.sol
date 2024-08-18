// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract CreateToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address to) ERC20(name, symbol) {
        _mint(to, initialSupply);
    }
}

contract InnoHunt {
    address private owner;
    uint public totalProjects;

    struct Project {
        address owner;
        uint256 totalRaised;
        uint256 totalShares;
        uint256 remainingShares;
        uint256 shareprice;
        mapping(address => uint256) shares;
        uint256 proposalCount;
        mapping(uint256 => Proposal) proposals;
        address tokenAddress;
        bool isWithdrawed;
    }

    struct Proposal {
        uint256 upvoteCount;
        uint256 downvoteCount;
        uint256 threshold;
        uint256 currThreshold;
        uint256 requiredFund;
        mapping(address => Vote) votes;
    }

    struct Vote {
        bool hasVoted;
        bool isUpvote;
        uint256 voteWeight;
    }

    mapping(uint256 => Project) public projects;

    constructor() {
        owner = msg.sender;
    }

    function createProject(
        string memory name,
        string memory symbol,
        uint _shareprice,
        uint _totalshares
    ) external {
        uint projectId = totalProjects; 
        Project storage project = projects[projectId];
        project.owner = msg.sender;
        project.totalShares = _totalshares;
        project.remainingShares = _totalshares;
        project.shareprice = _shareprice;
        totalProjects = projectId + 1;
        address newToken = address(new CreateToken(name, symbol, _totalshares, address(this)));
        project.tokenAddress = newToken;
    }


    function buyShares(uint256 projectId, uint256 _amount) external payable {
        assert(_amount > 0);
        Project storage project = projects[projectId];
        uint256 cost = _amount * project.shareprice;
        require(msg.value >= cost, "Insufficient funds");

        project.totalRaised += cost;

        IERC20(project.tokenAddress).transfer(msg.sender, _amount);
        project.shares[msg.sender] += _amount;
        project.remainingShares -= _amount;
        project.shareprice = ((project.totalShares) + (project.totalShares*7)/100) / IERC20(project.tokenAddress).balanceOf(address(this));
    }

    function sellShares(uint256 projectId, uint256 _amount) external payable {
        Project storage project = projects[projectId];
        require(_amount > 0 && IERC20(project.tokenAddress).balanceOf(msg.sender) >= _amount, "Invalid amount");
        uint256 revenue = _amount * project.shareprice;
        IERC20(project.tokenAddress).transferFrom(msg.sender,address(this), _amount);
        project.shares[msg.sender] -= _amount;
        project.remainingShares += _amount;
        project.totalRaised -= revenue;
        (bool s,) = msg.sender.call{value: revenue*1e18}("");
        require(s);
        project.shareprice = ((project.totalShares) - (project.totalShares*15)/100) / IERC20(project.tokenAddress).balanceOf(address(this));
    }

    function withdraw(uint projectId) external {
        Project storage project = projects[projectId];
        require(project.owner == msg.sender, "Only owner can withdraw!");
        require(!project.isWithdrawed, "Owner can withdraw only one time");
        require(project.totalRaised > 0, "Not enough Funds to withdraw!");
        require(address(this).balance > project.totalRaised);
        (bool s,) = msg.sender.call{value: (project.totalRaised/2)*1e18}("");
        require(s);
        project.totalRaised = project.totalRaised/2;
        project.isWithdrawed = true;
    }

    function createProposal(uint projectId,uint _threshold,uint _requiredFund) external {
        Project storage project = projects[projectId];
        require(msg.sender == project.owner, "Only owner is Allowed");

        Proposal storage newProposal = project.proposals[project.proposalCount];
        newProposal.threshold = _threshold;
        
        require(_requiredFund <= project.totalRaised, "Fund not enough");
        newProposal.requiredFund = _requiredFund;
        project.proposalCount += 1;
    }

    function vote(uint projectId, uint256 proposalId, bool isUpvote, uint _amount) external payable {
        Project storage project = projects[projectId];
        require(_amount > 0  && _amount <=  project.shares[msg.sender], "Not enough shares");
        Proposal storage proposal = project.proposals[proposalId];

        require(!(proposal.votes[msg.sender].hasVoted), "Already voted");
    
        if (isUpvote) {
            proposal.upvoteCount += _amount;
            proposal.currThreshold += 1;

            if(proposal.upvoteCount >= (project.totalShares*75)/100){
                 if(proposal.currThreshold >= proposal.threshold){
                    require(address(this).balance > proposal.requiredFund, "Not enough funds");
                    (bool s,) = projects[projectId].owner.call{value: proposal.requiredFund * 1e18}("");
                    require(s);
                    projects[projectId].totalRaised -= proposal.requiredFund;
                 }
            }
        } else {
            proposal.downvoteCount += _amount;
        }
        proposal.votes[msg.sender] = Vote(true, isUpvote, _amount);
    }

    function getProposalVotes(uint projectId, uint256 proposalId) external view returns (uint256 upvotes, uint256 downvotes) {
        Project storage project = projects[projectId];
        Proposal storage proposal = project.proposals[proposalId];
        return (proposal.upvoteCount, proposal.downvoteCount);
    }

    function getProposal(uint projectId, uint256 proposalId) external view returns (uint,uint,uint,uint,uint) {
        Project storage project = projects[projectId];
        Proposal storage proposal = project.proposals[proposalId];
        return (proposal.upvoteCount, proposal.downvoteCount,proposal.threshold,proposal.currThreshold,proposal.requiredFund);
    }
    
}
