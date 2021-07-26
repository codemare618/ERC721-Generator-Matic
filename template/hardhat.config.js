require("@nomiclabs/hardhat-waffle");

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
  solidity: "0.8.0",
  defaultNetwork: 'mumbai',
  networks: {
    // This is for ethereum network
    /*
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/gya-fwTOC4ajKW76Uj7otzzwgeIQFtNP',
      accounts: ['84c5d46357e084ba578231d520332e3648de6839572b1ffe7d369454067a3041'],
    },
     */
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/a4239c6b78a420cf81bd3c23e9ddc5f682be6970',
      accounts: [''],
    },
    maticMainNet: {
      url: 'https://rpc-mainnet.maticvigil.com/v1/a4239c6b78a420cf81bd3c23e9ddc5f682be6970',
      accounts: [''],
    }
  },
};

