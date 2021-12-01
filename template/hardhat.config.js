require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      }
    }
  },
  defaultNetwork: 'rinkeby',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/gya-fwTOC4ajKW76Uj7otzzwgeIQFtNP',
      accounts: [''],
    },
    mainnet: {
      url: 'https://cloudflare-eth.com',
      accounts: [''],
    }
  },
  etherscan: {
    apiKey: ''      // ETHER SCAN API KEY
  }
};

