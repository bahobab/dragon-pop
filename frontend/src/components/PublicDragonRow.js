import React from "react";
import { Button } from "react-bootstrap";

import DragonAvatar from "./DragonAvatar";

import { BACKEND } from "../config";
import history from "../history";

class PublicDragonRow extends React.Component {
  buy = () => {
    const { dragonId, saleValue } = this.props.dragon;
    fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ dragonId, saleValue }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        alert(json.message);
        history.push("/account-dragons");
      })
      .catch(error => alert(error.message));
  };

  render() {
    return (
      <div>
        <div>{this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>Sale Value: {this.props.dragon.saleValue}</div>
        <br />
        <Button onClick={this.buy}>Buy This Dragon</Button>
      </div>
    );
  }
}

export default PublicDragonRow;
