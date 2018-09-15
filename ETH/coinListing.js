import web3 from './web3';
import CoinListing from './build/CoinListing.json';

const instance = new web3.eth.Contract(JSON.parse(CoinListing.interface),'0x8578a7f3BABFBA2A175699557c1559a8633061f0');

export default instance;