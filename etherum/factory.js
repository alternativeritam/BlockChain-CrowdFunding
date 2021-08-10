import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x60c76CcFa69DDeb312bD018f78906E1F40C54931"
);
export default instance;
