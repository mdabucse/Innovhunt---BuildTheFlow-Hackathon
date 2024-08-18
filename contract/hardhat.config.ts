import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337
    }
  },
  solidity: "0.8.20",
  namedAccounts: {
    deployer:{
      default: 0,
    },
    funder: {
      default: 1,
    }

  }
};

export default config;
