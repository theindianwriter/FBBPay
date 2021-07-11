import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import LogOut from "./LogOut";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <nav
        className={
          this.props.smoothTransition
            ? "navbar fixed-top navbar-expand-lg scrolling-navbar top-nav-collapse bg-primary"
            : "navbar fixed-top navbar-expand-lg scrolling-navbar bg-primary "
        }
      >
        <div className="container nav_container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* based on the authenticated state of the user i.e logged in or logged out the following components are rendered */}
            {this.props.authenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/home" className="btn btn-primary">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="btn btn-primary">
                    CART
                    {this.props.cartItemsLength ? (
                      <sup
                        className="badge badge-pill badge-danger"
                        style={{ fontSize: "14px" }}
                      >
                        {this.props.cartItemsLength}
                      </sup>
                    ) : null}
                  </NavLink>
                </li>
                <LogOut />
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <NavLink to="/home" className="btn btn-primary">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-primary">
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="btn btn-primary">
                    SIGN UP
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItemsLength: Object.keys(state.cartItems).length,
  };
};

export default connect(mapStateToProps, null)(Header);
