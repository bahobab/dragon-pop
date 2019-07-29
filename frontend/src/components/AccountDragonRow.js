import React from "react";
import { Button } from "react-bootstrap";

import DragonAvatar from "./DragonAvatar";

class AccountDragonRow extends React.Component {
  state = {
    nickname: this.props.dragon.nickname,
    edit: false
  };

  toggleEdit = event => {
    this.setState({
      edit: !this.state.edit
    });
  };

  get SaveButton() {
    return <Button>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit Nickname</Button>;
  }

  updateNickname = event => {
    this.setState({
      nickname: event.target.value
    });
  };

  render() {
    const renderButtons = this.state.edit ? this.SaveButton : this.EditButton;

    return (
      <div>
        <div>{this.props.dragon.nickname}</div>
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
