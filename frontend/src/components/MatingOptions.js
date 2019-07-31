import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

class MattingOptions extends React.Component {
  render() {
    return (
      <div>
        <h4>Pick one of your dragons to mate with:</h4>
        {this.props.accountDragons.dragons.map(dragon => {
          const { dragonId, generationId, nickname } = dragon;

          return (
            <span key={dragonId}>
              <Button>
                G{generationId}.I{dragonId}. {nickname}
              </Button>{" "}
            </span>
          );
        })}
      </div>
    );
  }
}

export default connect(({ accountDragons }) => ({ accountDragons }))(
  MattingOptions
);
