import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NewCampaign from "./components/new";
import Campaign from "./components/campaign";
import RequestsList from "./components/RequestsList";
import NewRequest from "./components/NewRequest";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/campaign/new">
          <NewCampaign></NewCampaign>
        </Route>
        <Route exact path="/campaign/:address">
          <Campaign></Campaign>
        </Route>
        <Route exact path="/campaign/:address/requests">
          <RequestsList></RequestsList>
        </Route>
        <Route exact path="/campaign/:address/requests/new">
          <NewRequest></NewRequest>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
