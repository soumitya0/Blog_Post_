import React, { Component, Fragment } from "react";

import "./MyPostItemStyle.css";

import axios from "axios";
import { Redirect } from "react-router-dom";

import UpdatePost from "../UpdatePost/UpdatePost";

class MypostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  ActionDelte = () => {
    console.log("i am delete");

    axios
      .delete(`api/post/${this.props.item._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("Login"),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });
        alert("post deleted ");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  ActionEdit = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    console.log(" MyPostItem");
    console.log(this.props.item);
    return (
      <Fragment>
        <div className="MyPostItemGrid boxShadow2">
          <div className="ActionMypost">
            <div className="ActionBtn" onClick={this.ActionDelte}>
              <i class="fas fa-trash ActionBtnDelete"></i>
            </div>

            <div className="ActionBtn" onClick={this.ActionEdit}>
              <i class="far fa-edit ActionBtnCancle"></i>

              {this.state.redirect == true ? (
                <Redirect
                  to={{
                    pathname: "/updatepost",
                    state: {
                      working: "i am working",
                      updateData: this.props.item,
                    },
                  }}
                />
              ) : null}
            </div>
          </div>

          <div>
            {console.log(this.props.item.postImage, "MyPostitem IMg")}
            <img
              className="imageUser"
              src={
                process.env.PUBLIC_URL + `/uploads/${this.props.item.postImage}`
              }
            />
          </div>

          <div>
            <p className="MyPostTitle">{this.props.item.postName}</p>
          </div>

          <div>
            <p>
              {this.props.item.postDetails && (
                <p>{this.props.item.postDetails.substr(0, 100)}</p>
              )}{" "}
            </p>
          </div>

          <div>
            <p className="MyPostDate"> 04/28/2020</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MypostItem;
