import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import "./Layout_three_itemStyle.css";
class Layout_three_item extends Component {
  render() {
    console.log("layoutThreeItem");
    console.log(this.props.item);

    return (
      <Fragment>
        <Link className="linkLayout_three" to={`/user/${this.props.item._id}`}>
          <div className="layoutThreeItem_grid boxShadow2">
            <div className="ItemPic">
              <img
                className="imageLayoutthree"
                src={
                  process.env.PUBLIC_URL +
                  `/uploads/${this.props.item.postImage}`
                }
              />
            </div>
            <div className="ItemTitle">
              <h4 className=" LayoutThreeTitle">{this.props.item.postName}</h4>
            </div>
            <div className="ItemDescription">
              <p>
                {this.props.item.postDetails && (
                  <p>{this.props.item.postDetails.substr(0, 130)}</p>
                )}{" "}
              </p>
            </div>
            <div className="ItemAuther">
              <h4>Auther</h4>
            </div>
          </div>
        </Link>
      </Fragment>
    );
  }
}

export default Layout_three_item;
