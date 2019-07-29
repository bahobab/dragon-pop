import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPublicDragons } from "../action/publicDragons";

class PublicDragons extends React.Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
  }

  render() {
    return (
      <div>
        <h3>Public Dragons</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default connect(
  publicDragons => publicDragons,
  { fetchPublicDragons }
)(PublicDragons);
