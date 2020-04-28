import React, { Component } from "react";

class Check extends Component {
  state = {
    data: "",
  };
  componentDidMount() {
    console.log("fetching...");
    fetch("/testing").then((response) => {
      //   console.log(response.text());

      response.text().then((data) => {
        console.log(data);
        this.setState({
          data: data,
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Hello Check</h1>
        <h2>{this.state.data}</h2>
      </div>
    );
  }
}

export default Check;
