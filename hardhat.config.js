require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const Private_Key = process.env.DeployerPrivateKey
module.exports = {
  solidity: "0.8.0",

  networks: {
    matic: {
      url: process.env.TestnetURl,
      accounts: [`0x${Private_Key}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.EtherscanApiKey,
    },
  },
};