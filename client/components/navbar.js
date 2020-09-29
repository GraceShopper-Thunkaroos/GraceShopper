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

const Navbar = ({ handleClick, isLoggedIn }) => (
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
              Cart <MdShoppingCart />
            </Link>
            <Link to="/profile">Profile</Link>
          </div>
          <div className="navbar__right">
            <Link to="/checkout">
              Checkout <MdPayment />
            </Link>
            <a href="#" onClick={handleClick}>
              Logout <MdExitToApp />
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            Login <BiLogInCircle />
          </Link>
          <Link to="/signup">
            Sign Up <MdCreate />
          </Link>
          <Link to="/products">
            Dogs <FaDog />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout <MdExitToApp />
          </a>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

//  : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/products/1">Single</Link>
//           <Link to="/products">Products</Link>
//         </div>
//       )

/**
 * CONTAINER
 */
const mapState = state => {
  console.log("NAVBAR RENDER", !!state.user.id);
  return {
    isLoggedIn: !!state.user.id
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
