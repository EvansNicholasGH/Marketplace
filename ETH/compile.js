const solc = require("solc");
const path = require ("path");
const fs = require('fs-extra');
console.log("running solidity compiler")
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
const coinListingPath = path.resolve(__dirname,'contracts','CoinListing.sol');
const source = fs.readFileSync(coinListingPath, 'utf8');
const out = solc.compile(source,1).contracts;
console.log("checking and rebuilding builds")
fs.ensureDirSync(buildPath);
for(let contract in out){
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','')+'.json' ),
        out[contract]
    )
}
console.log("waiting for dep.js")