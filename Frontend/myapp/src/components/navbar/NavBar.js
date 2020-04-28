import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Style
import "./navbarStyle.css";
import Check from "../../checkComp/Check";

import Account from "./Account/Account";

class NavBar extends Component {
  constructor(props) {
    console.log("i am constructor");
    super(props);

    this.state = {
      showMenu: false,
    };
  }
  componentDidMount() {
    console.log("components Did Update");
  }

  showMenu = (event) => {
    this.setState(
      {
        showMenu: true,
      },
      () => {
        document.addEventListener("click", this.closeMenu);
      },
      <h1>Soumitya</h1>,
    );
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  render() {
    console.log("checking the isLogin navBar");

    return (
      <Fragment>
        <nav className="nav ">
          {/* Name  */}
          <div>
            <div className="text-700 padding-15">
              Blog <sup>Post</sup>
            </div>
          </div>

          {/* Home */}
          <div className="">
            <Link to="/">
              <div className="btn btn_nav">Home</div>
            </Link>
          </div>

          {/* About */}
          <div className="">
            <Link to="/about">
              <div className="btn btn_nav">About</div>
            </Link>
          </div>

          {localStorage.getItem("Login") ? (
            <div className="AccountMenu">
              <div className="btn btn_nav nav_account" onClick={this.showMenu}>
                <div>
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
          ) : (
            <div className="Login/register_menu">
              <div
                className="btn btn_nav"
                style={{ marginRight: "20px" }}
                onClick={this.showMenu}
              >
                Login/Register
              </div>
            </div>
          )}

          {this.state.showMenu ? (
            localStorage.getItem("Login") ? (
              <Account />
            ) : (
              <div className="Account_menu" style={{ height: "130px" }}>
                <div className="display_login_register_grid">
                  <div className="display_login">
                    <div className="">
                      <Link to="/login">
                        <div className="Account_btn">Login</div>
                      </Link>
                    </div>
                  </div>

                  <div className="display_login">
                    <div className="">
                      <Link to="/register">
                        <div className="Account_btn">Register</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </nav>
      </Fragment>
    );
  }
}

export default NavBar;
