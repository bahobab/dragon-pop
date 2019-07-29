import React from "react";
import { Button } from "react-bootstrap";

import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";

class AccountDragonRow extends React.Component {
  state = {
    nickname: this.props.dragon.nickname,
    isPublic: this.props.dragon.isPublic,
    saleValue: this.props.dragon.saleValue,
    edit: false
  };

  toggleEdit = event => {
    console.log("toggleEdit", this.state.edit);

    this.setState({
      edit: !this.state.edit
    });
  };

  get SaveButton() {
    console.log("save nickname button", this.state.nickname);
    return <Button onClick={this.save}>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit Nickname</Button>;
  }

  save = () => {
    const dragonId = this.props.dragon.dragonId;
    const { nickname, isPublic, saleValue } = this.state;

    console.log("save nickname method", { nickname, dragonId });

    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname,
        isPublic,
        saleValue
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log("fetch json", json);

        if (json.type === "error") {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
      .catch(error => alert(error.message));
  };

  updateNickname = event => {
    this.setState({
      nickname: event.target.value
    });
  };

  updateSaleValue = event => {
    this.setState({ saleValue: event.target.value });
  };

  updateIsPublic = event => {
    this.setState({ isPublic: event.target.checked });
  };

  render() {
    const renderButtons = this.state.edit ? this.SaveButton : this.EditButton;

    return (
      <div>
        {/* <div>{this.props.dragon.nickname}</div> */}
        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
        />
        <br />
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          <span>
            Sale Value:{" "}
            <input
              type="number"
              disabled={!this.state.edit}
              value={this.state.saleValue}
              onChange={this.updateSaleValue}
            />
          </span>{" "}
          <span>
            Public:{" "}
            <input
              type="checkbox"
              disabled={!this.state.edit}
              checked={this.state.isPublic}
              onChange={this.updateIsPublic}
            />
          </span>
          {renderButtons}
        </div>
      </div>
    );
  }
}

export default AccountDragonRow;
