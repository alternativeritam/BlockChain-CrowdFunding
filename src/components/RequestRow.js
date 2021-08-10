import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import web3 from "../web3";
import Newcampaign from "../Newcampaign";

const RequestRow = (props) => {
  const { Cell, Row } = Table;
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);

  const approveHandler = async () => {
    setLoad1(true);
    try {
      const campaign = Newcampaign(props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(props.ind).send({
        from: accounts[0],
      });
    } catch (err) {}
    setLoad1(false);
    props.onAction();
  };

  const finalzeHandle = async () => {
    setLoad2(true);
    try {
      const campaign = Newcampaign(props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(props.ind).send({
        from: accounts[0],
      });
    } catch (err) {}
    setLoad2(false);
  };

  return (
    <Row disabled={props.request.complete}>
      <Cell>{props.ind + 1}</Cell>
      <Cell>{props.request.description}</Cell>
      <Cell>{web3.utils.fromWei(props.request.value, "ether")}</Cell>
      <Cell>{props.request.recipient}</Cell>
      <Cell>
        {props.request.approvalCount}/{props.approversCount}
      </Cell>
      <Cell>
        {props.request.complete ? (
          "Approved"
        ) : (
          <Button loading={load1} color="green" basic onClick={approveHandler}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {props.request.complete ? (
          "Finalized"
        ) : (
          <Button loading={load2} color="red" basic onClick={finalzeHandle}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
