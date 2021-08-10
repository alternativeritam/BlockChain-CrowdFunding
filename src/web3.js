import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const providers = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/ad31d91678054accb10df3cfc6789da3"
  );
  web3 = new Web3(providers);
}

export default web3;
