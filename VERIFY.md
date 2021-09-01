# Contract Verification

This document is for the old contract generator code to add verification.
For further releases of the generator project `#1`,  It will have these configurations


- Go into the `generated/<ContractName>`
- Add `hardhat-etherscan` package

```shell
$cd generated/<ContractName>
$yarn add --dev @nomiclabs/hardhat-etherscan
```  

- Add [etherscan.io](etherscan.io) API Key to `hardhat.config.js` so it will look like this (Check lines that has comments)


```javascript
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");    //Add this line next to the first import
...
...
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: 'rinkeby',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/<ALCHEMY_API_KEY>',
      accounts: ['<CONTRACT_OWNER_PRIVATE_KEY>'],
    }
  },
  etherscan: {
    apiKey: '<ETHERSCAN_API_KEY>'   // Update here
  }
};
```

- Verify
As soon as the contract is deployed, run the following command
```shell
$npx hardhat verify --network rinkeby <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

  - `CONTRACT_ADDRESS` is the deployed contract address, and you should change `rinkeby` to your deployoed network
  - The generated contract has no constructor arguments for now, so it can be omitted. For the generated contracts in the future, it might have constructor parameters, and you should add it 

