import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import { Form, Button, Input, Message, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Newcampaign from "../Newcampaign";
import RequestRow from "./RequestRow";

const RequestsList = (props) => {
  const getAddress = window.location.pathname.toString().slice(10, 52);
  const [requests, setRequests] = useState([]);
  const [approval, setApproval] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  useEffect(async () => {
    const campaign = Newcampaign(getAddress);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    setApproval(approversCount);
    const new_requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    console.log(new_requests);
    setRequests(new_requests);
  }, [flip]);

  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          ind={index}
          request={request}
          address={getAddress}
          approversCount={approval}
          onAction={handleFlip}
        ></RequestRow>
      );
    });
  };

  return (
    <Wrapper>
      <Link to={`/campaign/${getAddress}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
    </Wrapper>
  );
};

export default RequestsList;
