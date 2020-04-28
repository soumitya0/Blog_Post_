import React, { Component, Fragment } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import "./SinglePostStyle.css";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      data: "",
    };

    console.log(this.props.match.params.id, "match");

    console.log(this.state._id);
  }

  componentDidMount() {
    console.log(this.props.match.params.id, "componentsDidMount");

    axios
      .get(`/api/addPost/post/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
        console.log("stata");
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="SinglePostGrid">
          <div className="framone">
            <div>
              <p className="frameOneText">{this.state.data.postName}</p>
            </div>

            <div className="frameOneInfo">
              <div className="frameOneInfoUserImage">
                <div className="Fram_display_pic">
                  <i className="fas fa-user fa-farm-pic"></i>
                </div>
              </div>

              <div className="frameOneInfoUser">
                <h4>soumitya chauha</h4>
              </div>

              <div className="frameOneInfoUser">
                <h5>04/28/2020</h5>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "lightGreen" }}>
            <img
              className="frameOneInfoPostImg"
              src={
                process.env.PUBLIC_URL + `/uploads/${this.state.data.postImage}`
              }
            />
          </div>

          <div>
            <p style={{ fontSize: "20px" }}>{this.state.data.postDetails}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SinglePost;
