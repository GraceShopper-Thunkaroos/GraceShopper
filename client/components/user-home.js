/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { ProductCard } from "./product-card";

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { firstName } = props;
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/products/retrieve`);
      setDisplay(data);
      return data;
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="userHome__container">
        <div className="userHome__left" />
        <div className="userHome">
          {firstName === "Guest" ? null : <h3>Welcome, {firstName}!</h3>}
          <div className="userHome__top">
            <div className="userHome__button">
              <button
                type="button"
                onClick={() => props.history.push("/products")}
              >
                Shop Dogs!
              </button>
            </div>
          </div>

          <div className="userHome__bottom">
            {display.map((item, iter) => (
              <ProductCard product={item} key={`${item}+${iter}`} />
            ))}
          </div>
          <div className="userHome__right" />
          {/* <Cart /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
