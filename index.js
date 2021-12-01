const prompts = require('prompts');
const fse = require('fs-extra');
const fs = require('fs');

const questions = [
  {
    type: 'text',
    name: 'contractName',
    message: 'Enter contract name',
    validate: value => value && value.length > 0
  },
  {
    type: 'text',
    name: 'tickerSymbol',
    message: 'Enter 3-4 character string defining the ticker symbol of the token',
    validate: value => value && value.length >= 3
  }
];

async function generateTokenSource(){
  const response = await prompts(questions);

  const contractName = response.contractName;
  console.log(`Copying templates into ${contractName}`);

  const contractDir = `generated/${contractName}`;

  // Create generated directory when not existing
  if (!fs.existsSync('generated')){
    fs.mkdirSync('generated');
  }

  try {
    // 1. Copy the template directory
    fse.copySync('template', contractDir);


    // 2. Read the content of Token.sol and replace values, write to sol file
    const templatePath = `${contractDir}/contracts/Token.sol`;

    let content = fs.readFileSync(templatePath, 'utf8');
    content = content
      .replace(new RegExp('{{contractName}}', 'g'), contractName)
      .replace(new RegExp('{{tickerSymbol}}', 'g'), response.tickerSymbol)

    console.log(content);

    fs.writeFileSync(`${contractDir}/contracts/${contractName}.sol`, content, 'utf-8');
    fs.unlinkSync(templatePath);

    // 3. change deploy.js
    const deployScriptPath = `${contractDir}/scripts/deploy.js`;
    content = fs.readFileSync(deployScriptPath, 'utf8');
    content = content.replace(new RegExp('{{contractName}}', 'g'), contractName);
    fs.writeFileSync(deployScriptPath, content, 'utf-8');
  }catch(ex){
    console.log("Error occurred - ", ex);
  }

  // This is like context
  return response;
}

async function run(){
  const response = await generateTokenSource();

}

run().then();
