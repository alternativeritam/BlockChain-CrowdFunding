import React, { useState, useEffect } from "react";
import factory from "../factory";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Wrapper from "./Wrapper";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const campaign = await factory.methods.getDeployedCampaigns().call();
    setCampaigns(campaign);
    setItems(
      campaigns.map((address) => {
        return {
          header: address,
          description: <Link to={`/campaign/${address}`}>View Campaign</Link>,
          fluid: true,
        };
      })
    );
  }, [campaigns]);

  return (
    <Wrapper>
      <h2>Open Campaign</h2>
      <Link to="/campaign/new">
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        ></Button>
      </Link>
      <Card.Group items={items} />
    </Wrapper>
  );
};

export default Home;
