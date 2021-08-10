import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

const Wrapper = (props) => {
  return (
    <Container>
      <Header></Header>
      {props.children}
    </Container>
  );
};

export default Wrapper;
