import React, { Component, Fragment } from "react";
import "./LayoutStyleThree.css";
import Layout_three_item from "./Layout_three_item";

class Layout_three extends Component {
  render() {
    console.log("layout-3");
    console.log(this.props);
    console.log(this.props.allPostData);
    return (
      <Fragment>
        <div className="layout_tree_top_grid marginTop-80">
          {this.props.allPostData.map((post, index) =>
            index <= 11 ? (
              <Layout_three_item key={post._id} item={post} />
            ) : null,
          )}
        </div>
      </Fragment>
    );
  }
}

export default Layout_three;
