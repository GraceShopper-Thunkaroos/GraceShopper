import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ThankYou = props => {
  return (
    <div className="thankyou">
      <h4>Thank you for purchasing</h4>
    </div>
  );
};

const mapState = state => ({
  user: state.user
});

export default withRouter(connect(mapState)(ThankYou));
