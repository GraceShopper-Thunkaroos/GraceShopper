import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  MdShoppingCart,
  MdPayment,
  MdExitToApp,
  MdCreate
} from "react-icons/md";
import { FaDog, FaHome } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";

const Navbar = ({ handleClick, isLoggedIn, cartItems, user }) => {
  return (
    <div className="navbar">
      <nav>
        {isLoggedIn ? (
          <div className="navbar__container">
            {/* The navbar will show these links after you log in */}
            <div className="navbar__left">
              <Link to="/home">
                Home <FaHome />
              </Link>
              <Link to="/products">
                Dogs <FaDog />
              </Link>
              <Link to="/cart">
                Cart <MdShoppingCart /> ({cartItems.length})
              </Link>
            </div>
            <div className="navbar__right">
              <Link to="/profile">
                <img
                  src={
                    user.imgUrl
                      ? user.imgUrl
                      : "https://cdn.onlinewebfonts.com/svg/img_258083.png"
                  }
                  alt=""
                />
                My Account
              </Link>
              <a href="#" onClick={handleClick}>
                Logout <MdExitToApp />
              </a>
            </div>
          </div>
        ) : (
          <div className="navbar__container">
            {/* The navbar will show these links before you log in */}
            <div className="navbar__left">
              <Link to="/products">
                Dogs <FaDog />
              </Link>
              <Link to="/cart">
                Cart <MdShoppingCart />
              </Link>
            </div>

            <div className="navbar__right">
              <Link to="/login">
                Login <BiLogInCircle />
              </Link>
              <Link to="/signup">
                Sign Up <MdCreate />
              </Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartItems: state.cartItems,
    user: state.user

  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
