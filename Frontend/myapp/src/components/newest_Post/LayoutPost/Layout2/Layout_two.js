import React, { Component, Fragment } from "react";

import "./LayoutStyleTwo.css";

import axios from "axios";
import { Link } from "react-router-dom";

class Layout_two extends Component {
  constructor(props) {
    super(props);
    this.userString = this.props.data;
    this.state = {
      Auther: "soumitya",
      postDetails: "",
    };

    console.log(this.props.data.user);
  }

  render() {
    console.log("layout-2");
    console.log(this.props.data);

    console.log(this.props.data.postImage);

    return (
      <Fragment>
        <Link className="linkLayout_three" to={`/user/${this.props.data._id}`}>
          <div className="Layout_two_Grid boxShadow">
            <div className="Layout-two-img">
              <img
                className="imageLayout"
                src={
                  process.env.PUBLIC_URL +
                  `/uploads/${this.props.data.postImage}`
                }
              />
            </div>
            <div className="Layout-two-text">
              <h4 className=" Layout-two-text-text">
                {this.props.data.postName}
              </h4>
            </div>

            <div className="Layout-two-writer">
              <p>
                {this.props.data.postDetails && (
                  <p>{this.props.data.postDetails.substr(0, 50)}</p>
                )}{" "}
              </p>

              <h4 className="AutherName"> AutherName</h4>
            </div>
          </div>
        </Link>
      </Fragment>
    );
  }
}

export default Layout_two;
