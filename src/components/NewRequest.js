import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Newcampaign from "../Newcampaign";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import ContributeForm from "./ContributeForm";
import web3 from "../web3";

const NewRequest = (props) => {
  const getAddress = window.location.pathname.toString().slice(10, 52);
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState(0);
  const [recp, setRecp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const campaign = Newcampaign(getAddress);
    setLoading(true);
    setMsg("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(desc, web3.utils.toWei(value, "ether"), recp)
        .send({
          from: accounts[0],
        });
      window.location.pathname = `/campaign/${getAddress}/requests`;
    } catch (err) {
      //console.log(err);
      setMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitHandler} error>
        <Link to={`/campaign/${getAddress}/requests`}>
          <Button primary>Back</Button>
        </Link>
        <Form.Field>
          <label>Description</label>
          <Input
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          ></Input>
        </Form.Field>
        <Form.Field>
          <label>Value of ether</label>
          <Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          ></Input>
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recp}
            onChange={(event) => {
              setRecp(event.target.value);
            }}
          ></Input>
        </Form.Field>
        {msg !== "" && <Message error header="OOPS!" content={msg}></Message>}
        <Button loading={loading} primary>
          {" "}
          Create
        </Button>
      </Form>
    </Wrapper>
  );
};
export default NewRequest;
