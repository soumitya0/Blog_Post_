import React, { Component } from "react";

import "../navbarStyle.css";

import axios from "axios";

import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
//Sechema

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      logout: false,
    };
  }

  componentDidMount() {
    console.log("i am Account ComonentDidMount");
    console.log(localStorage.getItem("Login"));

    axios
      .get("/api/login", {
        headers: {
          "x-auth-token": localStorage.getItem("Login"),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  LogOut = () => {
    console.log("logout");
    this.setState({
      logout: true,
    });
    localStorage.clear();
  };

  render() {
    console.log(localStorage.getItem("Login"));
    console.log(this.state.data.name);

    return (
      <div>
        <div>
          <div className="Account_menu">
            <div className="display_userInfo">
              <div className="display_userInfo_grid">
                <div className="display_userInfo_pic">
                  <i className="fas fa-user"></i>
                </div>
                <div className="display_userInfo_username ">
                  <div>
                    <p>{this.state.data.name}</p>
                  </div>
                </div>
                <div className="display_userInfo_userEmail ">
                  <div>
                    <p>{this.state.data.email}</p>
                  </div>
                </div>
              </div>

              <hr className="sidebar-divider" />

              <ul className="display_userInfo_ul margin-20 ">
                <h5>DashBoard</h5>
                <hr className="sidebar-divider" />

                <Link to="/mypost">
                  <li className="display_userInfo_li margin-10">My Post</li>
                </Link>

                <Link to="/addPost">
                  <li className="display_userInfo_li margin-10">AddPost</li>
                </Link>

                <hr className="sidebar-divider" />

                <li
                  className="display_userInfo_li margin-10"
                  onClick={this.LogOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </li>
              </ul>

              {this.state.logout == true ? (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}

export default Account;
