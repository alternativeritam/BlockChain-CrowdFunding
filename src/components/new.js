import React, { useState } from "react";
import Wrapper from "./Wrapper";
import { Form, Button, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../factory";
import web3 from "../web3";

const NewCampaign = (props) => {
  const [contribution, setContribution] = useState(0);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const inputHandler = (event) => {
    setContribution(event.target.value);
  };

  const submitHandler = async (event) => {
    setLoading(true);
    setMsg("");
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(contribution).send({
        from: accounts[0],
      });
      window.location.href = "/";
    } catch (e) {
      setMsg(e.message);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <h3>Create New Campaign</h3>
      <Form onSubmit={submitHandler} error>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            value={contribution}
            onChange={inputHandler}
            label="wei"
            labelPosition="right"
          ></Input>
        </Form.Field>
        {msg !== "" && <Message error header="OOPS!" content={msg}></Message>}
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Wrapper>
  );
};

export default NewCampaign;
