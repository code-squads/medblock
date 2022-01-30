import Web3 from 'web3';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
const INFURA_ACCESS_TOKEN = process.env.REACT_APP_INFURA_ACCESS_TOKEN;
console.log(INFURA_PROJECT_ID);
console.log(INFURA_ACCESS_TOKEN);

const infuraURL = `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`;
const web3 = new Web3(infuraURL);
window.customWeb3 = web3;

console.log("Web3 config:");
console.log("Infura access token:", INFURA_ACCESS_TOKEN);
console.log("Infura URL:", infuraURL);
console.log("Web3: \n", web3);

export default web3;