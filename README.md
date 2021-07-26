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
  defaultNetwork: 'mumbai',   // Change here to maticMainNet when deploying to real matic network
  networks: {
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
```

- Change `defaultNetwork` to `maticMainNet` when deploying to real MATIC network
- Change `url` amd `accounts` with appropriate providers and account
- `accounts` should be one element array of account private keys. This will be used to deploy contract and this will be initial owner of the deployed contract.  

```shell
$ cd generated/ContractName
$ npx hard run scripts/deploy.js

# Also can specify network like this (mumbai, maticMainNet)
$ npx hardhat run --network maticMainNet scripts/deploy.js


# It will out put the deployed contract address in console
```
