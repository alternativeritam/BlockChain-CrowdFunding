import Web3 from "web3";

let web3;

web3 = new Web3(window.web3.currentProvider);

/*const providers = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/ad31d91678054accb10df3cfc6789da3"
);*/

web3 = new Web3(providers);

export default web3;
