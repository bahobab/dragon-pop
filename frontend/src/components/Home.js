import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import Generation from "./Generation";
import DragonNew from "./DragonNew";
import AccountDragons from "./AccountDragons";

import { signout } from "../action/account";

class Home extends React.Component {
  render() {
    const { signout } = this.props;
    return (
      <div>
        <Button onClick={signout} className="signout-button">
          Sign out
        </Button>
        <h2>Dragon Pop</h2>
        <Generation />
        <DragonNew />
        <AccountDragons />
      </div>
    );
  }
}

/*********************** debugging code to fetch dragons for a logged in user **************/

// fetch("http://localhost:3003/account/dragons", { credentials: "include" })
//   .then(res => res.json())
//   .then(json => console.log("account dragons", json));

export default connect(
  null,
  { signout }
)(Home);
