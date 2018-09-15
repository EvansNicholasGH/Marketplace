//allows signing of transaction derived from 12 word mnemonics
const HDWalletProvider = require("truffle-hdwallet-provider");
//need web3 to communicate with anything ethereum
const Web3 = require('web3');
//get the compiled contract interface
const compiledContract = require('./build/CoinListing.json');
const mnemonic = 'marriage lunch resemble analyst hub cactus ancient guess impact aim similar ugly';
const infuraToken = 'https://rinkeby.infura.io/l7ZvcwIzTHgOCruD2JaN';
//use the two above to create a provider. Now we can use web3!!!
const provider = new HDWalletProvider(mnemonic, infuraToken);
//create web3 instance using the provider
const web3 = new Web3(provider);
//the deploy function. Needs to be a function to allow async notation. 
const deploy = async () => {    
  //get list of accounts
  const accounts = await web3.eth.getAccounts();
  //HDWalletProvider uses accounts[0] by default, making that clear
  console.log('Attempting from: '+accounts[0]);
  //use web3 to create a contract instance py parsing the contract interface
  const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
    //deploy the contract using the bytecode 'add 0x because bytecode omits it
   .deploy({ data: '0x'+ compiledContract.bytecode})
    //send the actual transaction with 3million gas (could assign this to variable? decrease increase as needed)
   .send({gas: '3000000' ,from: accounts[0] })
   //cath any errors and log them
   .catch(err => console.log(err));
   //print the address of the deployed contract
  console.log('deployed at: ', result.options.address);
}
deploy();