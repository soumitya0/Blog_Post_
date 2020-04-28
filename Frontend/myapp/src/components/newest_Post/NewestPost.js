import React, { Component, Fragment } from "react";

import "./NewestPostStyle.css";
import Layout_One from "./LayoutPost/Layout1/Layout_One";
import Layout_two from "./LayoutPost/Layout2/Layout_two";
import Layout_three from "./LayoutPost/Layout3/Layout_three";

import axios from "axios";

class NewestPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block1: {},
      block2: {},
      block3: {},
      block4: {},
      block5: {},
      allPost: [],
    };
  }

  componentDidMount() {
    console.log(" i  am from NewestPost");
    console.log(localStorage.getItem("Login"));

    axios
      .get("api/addPost/post")
      .then((res) => {
        console.log("i am data");
        console.log(res.data[0]);

        this.setState({
          allPost: res.data,
          block1: res.data[3],
          block2: res.data[4],
          block3: res.data[5],
          block4: res.data[6],
          block5: res.data[7],
        });

        // console.log("block1");
        // console.log(this.state.block1);

        // console.log("block2");
        // console.log(this.state.block2);

        // console.log("block3");
        // console.log(this.state.block3);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="NewestPost_Grid">
          <div className="Item1">
            <Layout_One data={this.state.block1} />
          </div>
          <div>
            <Layout_two data={this.state.block2} />
          </div>
          <div>
            <Layout_two data={this.state.block3} />
          </div>
          <div>
            <Layout_two data={this.state.block4} />
          </div>
          <div className="Item5">
            <Layout_One data={this.state.block5} />
          </div>
        </div>
        <div className="margin-20">
          <Layout_three allPostData={this.state.allPost} />
        </div>
      </Fragment>
    );
  }
}

export default NewestPost;
