import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xe2Ffe6D5e05955FCdA4951bF5F047ba05C28d85a"
);
export default instance;
