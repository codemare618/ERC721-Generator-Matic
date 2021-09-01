const hre = require('hardhat');

async function main() {
  // We get the contract to deploy
  const Token = await hre.ethers.getContractFactory('{{contractName}}');
  const token = await Token.deploy();

  console.log('{{contractName}} deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
