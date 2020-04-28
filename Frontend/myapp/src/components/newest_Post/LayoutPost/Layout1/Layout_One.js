import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import "./LayoutStyleOne.css";

class Layout_One extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: "",
      Auther: "soumitya",
    };

    console.log("layout one");

    console.log(this.state);
  }

  componentWillUnmount() {}

  render() {
    console.log("layout1");

    console.log(this.props.data);
    if (this.state.postDetails != "") {
      this.setState({ postDetails: this.props.data });
    }

    console.log(this.state.postDetails);
    return (
      <Fragment>
        <Link className="linkLayout_three" to={`/user/${this.props.data._id}`}>
          <div className="Layout_one_Grid boxShadow">
            {/* image */}
            <div>
              <img
                className="imageLayoutLayout1"
                src={
                  process.env.PUBLIC_URL +
                  `/uploads/${this.props.data.postImage}`
                }
              />
            </div>
            {/* Title */}
            <div>
              <h4 className=" Layout-two-text-text">
                {this.props.data.postName}
              </h4>
            </div>

            {/* discription */}
            <div>
              <p>
                {this.props.data.postDetails && (
                  <p>{this.props.data.postDetails.substr(0, 150)}</p>
                )}{" "}
              </p>
            </div>
            <div>
              <h4>Auther Name</h4>
            </div>
          </div>
        </Link>
      </Fragment>
    );
  }
}

export default Layout_One;
