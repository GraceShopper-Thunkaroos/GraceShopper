import React from "react";

const ThankYou = () => {
  return (
    <div
      className="page-header"
      style={{
        backgroundImage: "https://dog.ceo/api/breed/Eskimo/images/random",
        backgroundSize: "cover",
        backgroundPosition: "top left"
      }}
    >
      <h1>Your order has been submitted</h1>
      <h2> Thank You for shopping with us, enjoy your new best friend!!!</h2>
    </div>
  );
};

export default ThankYou;
