import Web3 from 'web3';
let web3;
if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
}else{
    const prov = new Web3.providers.HttpProvider('https://rinkeby.infura.io/l7ZvcwIzTHgOCruD2JaN');
    web3 = new Web3(prov);
}
export default web3;