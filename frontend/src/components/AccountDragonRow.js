import React from "react";
import { Button } from "react-bootstrap";

import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";

class AccountDragonRow extends React.Component {
  state = {
    nickname: this.props.dragon.nickname,
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
    const nickname = this.state.nickname;

    console.log("save nickname method", { nickname, dragonId });

    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname: this.state.nickname
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
        {renderButtons}
      </div>
    );
  }
}

export default AccountDragonRow;
