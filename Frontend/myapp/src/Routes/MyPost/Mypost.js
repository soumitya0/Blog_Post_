import React, { Component, Fragment } from "react";
import About from "../About/About";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import axios from "axios";

import "./Mypost.css";

import MypostItem from "./MypostItem";
class Mypost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log("i am Account ComonentDidMount");
    console.log(localStorage.getItem("Login"));

    axios
      .get("/api/addPost/Userpost", {
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

  render() {
    // console.log(this.state.data, "state");
    return (
      <Fragment>
        <div className="layoutUserPost ">
          {this.state.data.map((post, index) => (
            <MypostItem key={post._id} item={post} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Mypost;
