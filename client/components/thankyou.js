import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ThankYou = props => {
  return (
    <div
      className="page-header"
      style={{
        backgroundImage: "https://dog.ceo/api/breed/Eskimo/images/random",
        backgroundSize: "cover",
        backgroundPosition: "top left"
      }}
    >
      <h1>thanks {props.user} </h1>
      <h2> Thank You for shopping with us, enjoy your new best friend!!!</h2>
      <Link to="/products"> buy some more dogs</Link>
    </div>
  );
};

const mapState = state => ({
  user: state.user
});

export default withRouter(connect(mapState)(ThankYou));
