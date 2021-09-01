# ERC721 MATIC Token Generator

### Installation 

```shell
$ yarn
```

### Token Generation

```shell
$ node index.js
```

Enter required parameters. The token project will be generated under `generated/<ContractName>` directory


### Config MetaMask Wallet
Add Matic network (Mumbai and Mainnet) RPCs to MetaMask wallet 


### Token Deployment

```shell
$ cd generated/ContractName
$ yarn
```

Edit `hardhat.config.js` file under the generated contract directory

```javascript
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: 'rinkeby',   // Change here to mainNet when deploying to real matic network
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
```

- Change `defaultNetwork` to `mainnet` when deploying to real MATIC network
- `accounts` should be one element array of account private keys. This will be used to deploy contract and this will be initial owner of the deployed contract.  


### Deploying

```shell
$ cd generated/ContractName
$ npx hard run scripts/deploy.js

# Also can specify network like this
$ npx hardhat run --network mainnet scripts/deploy.js


# It will out put the deployed contract address in console
```


### Verify Contract

```shell
$ npx hardhat verify --network mainnet <DEPLOYED_CONTRACT_ADDRESS> <CONTRACT ARGS>  
```
