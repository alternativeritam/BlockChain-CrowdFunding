import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Newcampaign from "../Newcampaign";
import { Card, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import ContributeForm from "./ContributeForm";

const Campaign = (props) => {
  const [items, setItems] = useState([]);
  const [flip, setFlip] = useState(false);
  const getAddress = window.location.pathname.toString().slice(10);
  const handleFlip = () => {
    setFlip(!flip);
  };

  useEffect(async () => {
    const campaign = Newcampaign(getAddress);
    const summary = await campaign.methods.getSummary().call();
    const details = Object.values(summary);
    setItems([
      {
        header: "Minimu amount to be donate",
        meta: details[0],
        description:
          "Please donate minimum this much amount to join this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "Current Balance (wei)",
        meta: details[1],
        description: "Total balance avaliable here",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "Current Request",
        meta: details[2],
        description: "Total Request avaliable here",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "Current approvers",
        meta: details[3],
        description: "Total approvers participated in this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "Address of the manager",
        meta: details[4],
        description:
          "The manager created the campaign and any one can donate here",
        style: { overflowWrap: "break-word" },
      },
    ]);
  }, [flip]);

  return (
    <Wrapper>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm
              address={getAddress}
              onAction={handleFlip}
            ></ContributeForm>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Link to={`/campaign/${getAddress}/requests`}>
            <Button primary>View Requests</Button>
          </Link>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
};

export default Campaign;
