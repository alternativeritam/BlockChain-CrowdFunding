import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Newcampaign from "../Newcampaign";
import web3 from "../web3";
const ContributeForm = (props) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    const campaign = Newcampaign(props.address);
    try {
      setLoading(true);
      setMsg("");
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      props.onAction();
    } catch (err) {
      setMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={submitHandler} error>
      <Form.Field>
        <label>Amount to contribute</label>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="ether"
          labelPosition="right"
        ></Input>
      </Form.Field>
      {msg !== "" && <Message error header="OOPS!" content={msg}></Message>}
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
