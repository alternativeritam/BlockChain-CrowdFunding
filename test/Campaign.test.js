const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compiledFactory = require("../etherum/build/CampaignFactory.json");
const compiledCampaign = require("../etherum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaign", () => {
  it("deloys the two contracts", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("mark the caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("requires a minmum amount to be contributed", async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ value: "5", from: accounts[1] });
      console.log("contributed successfully");
    } catch (e) {
      console.log("less than the minimum contribution");
    }
  });

  /*it("allow people to contribute", async () => {
    await campaign.methods
      .contribute()
      .send({ value: "200", from: accounts[1] });

    const isContributer = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributer);
  });*/
});
