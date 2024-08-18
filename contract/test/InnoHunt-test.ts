import { expect } from "chai";
import { ethers } from "hardhat";
const { Abi } = require('../token.js');

describe("InnoHunt", function () {
  let innoHunt: any;
  let deployer: any;
  let user: any;
  let user1: any;
  let user2: any;
  let user3: any;
  let projectId = 0;
  let totalshares = 11;
  let shareprice = 1;
  const projectName = "Test Project";
  const projectSymbol = "TST";

  before(async function () {
    [deployer, user, user1,user2, user3] = await ethers.getSigners();
    const InnoHunt = await ethers.getContractFactory("InnoHunt");
    innoHunt = await InnoHunt.deploy();
  });

  it("should create a project", async function () {
    await innoHunt.connect(deployer).createProject(
      projectName,
      projectSymbol,
      shareprice,
      totalshares
    );

    const project = await innoHunt.projects(projectId);
    expect(project.owner).to.equal(deployer.address);
    expect(project.totalShares).to.equal(totalshares);
    expect(project.remainingShares).to.equal(totalshares);
    expect(project.shareprice).to.equal(shareprice);
  });

  it("should allow user to buy shares", async function () {
    
    await innoHunt.connect(user).buyShares(projectId, 5, {
      value: ethers.parseEther('5')
    });

    await innoHunt.connect(user1).buyShares(projectId, 2, {
      value: ethers.parseEther('2')
    })

    await innoHunt.connect(user2).buyShares(projectId, 1, {
      value: ethers.parseEther('2')
    })
     
    await innoHunt.connect(user3).buyShares(projectId,1, {
      value: ethers.parseEther('3')
    })

    const project = await innoHunt.projects(projectId);
    expect(project.remainingShares).to.equal(totalshares - 9);

    let innoToken = new ethers.Contract(project.tokenAddress, Abi, deployer);
    const userBalance = await innoToken.balanceOf(user.address);
    expect(userBalance).to.equal(5);
  });

  it("should allow user to sell shares", async function () {
    const project = await innoHunt.projects(projectId);
  
    const tokenAddress = project.tokenAddress;
    let innoToken = new ethers.Contract(tokenAddress, Abi, deployer);

    await innoToken.connect(user).approve(innoHunt, 10);
    await innoHunt.connect(user).sellShares(projectId, 1);

    const userTokenBalance = await innoToken.balanceOf(user.address);
    expect(userTokenBalance).to.equal(4); 

    const contractTokenBalance = await innoToken.balanceOf(innoHunt);
    expect(contractTokenBalance).to.equal(3);
  });

  it("should create a proposal", async function () {
    const threshold = 3;
    const requiredFund = 5;
    const project = await innoHunt.projects(projectId);

    await innoHunt.connect(deployer).createProposal(projectId, threshold, requiredFund);

    const proposal = await innoHunt.getProposal(projectId, project.proposalCount);
    //upcount, downcount, threshold, currthreshold, requiredFund
    expect(proposal[2]).to.equal(threshold);
    expect(proposal[4]).to.equal(requiredFund);
  });

  it("should allow users to vote on proposals", async function () {
    const proposalId = 0;
    await innoHunt.connect(user).vote(projectId, proposalId, true, 4);
    await innoHunt.connect(user1).vote(projectId, proposalId, true, 2);
    await innoHunt.connect(user3).vote(projectId, proposalId, true, 1);

    const proposal = await innoHunt.getProposalVotes(projectId,proposalId);
    //Checking Upvotes
    expect(proposal[0]).to.equal(7);
  });

  it("should execute proposal if conditions are met", async function () {
    const proposalId = 0;
    const initialBalance = await ethers.provider.getBalance(deployer.address);
    await innoHunt.connect(user2).vote(projectId, proposalId, true, 1);
    const proposal = await innoHunt.getProposalVotes(projectId,proposalId);
    expect(proposal[0]).to.equal(8);

    const finalBalance = await ethers.provider.getBalance(deployer.address);

    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should allow project owner to withdraw funds", async function () {
    
    const initialBalance = await ethers.provider.getBalance(deployer.address);
    await innoHunt.connect(deployer).withdraw(projectId);
    const finalBalance = await ethers.provider.getBalance(deployer.address);

    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should not allow non-owner to withdraw funds", async function () {
    await expect(innoHunt.connect(user).withdraw(projectId)).to.be.revertedWith("Only owner can withdraw!");
  });
});
