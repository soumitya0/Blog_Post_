import React, { Component, Fragment } from "react";
import NewestPost from "../../components/newest_Post/NewestPost";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "null",
    };
  }

  render() {
    console.log("HOme.js" + localStorage.getItem("Login"));
    return (
      <Fragment>
        <div className="margin-10">
          <NewestPost />
        </div>
      </Fragment>
    );
  }
}

export default Home;
