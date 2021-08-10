import React from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link to="/" className="item">
        Crowd Coin
      </Link>

      <Menu.Menu position="right">
        <Link to="/" className="item">
          Campaign
        </Link>
        <Link to="/campaign/new" className="item">
          +
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
