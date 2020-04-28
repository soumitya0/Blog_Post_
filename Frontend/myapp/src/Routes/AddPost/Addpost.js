import React, { Component, Fragment } from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";
import "./AddpostStyle.css";
class Addpost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      Selectedfile: "",

      imgRef: "",

      upload: false,
    };
  }

  changeHandle = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    console.log(this.state.title);
    console.log(this.state.description);
    console.log(this.state.Selectedfile);
  };

  onChange = (e) => {
    console.log(e.target.files[0]);

    console.log("img preview ");

    console.log(URL.createObjectURL(e.target.files[0]));
    this.setState({
      Selectedfile: e.target.files[0],

      imgRef: URL.createObjectURL(e.target.files[0]),
    });
  };

  onSubmit = async (event) => {
    console.log("i am clicked");
    event.preventDefault();
    console.log(localStorage.getItem("Login"));

    const bodyData = {
      postName: this.state.title,
      postDetails: this.state.description,
    };

    console.log(bodyData);

    const fd = new FormData();
    fd.append("image", this.state.Selectedfile, this.state.Selectedfile.name);
    fd.append("postName", this.state.title);
    fd.append("postDetails", this.state.description);

    let axiosConfig = {
      headers: {
        "x-auth-token": localStorage.getItem("Login"),
      },
    };

    axios
      .post("/api/addPost", fd, axiosConfig, bodyData)
      .then((res) => {
        console.log("UI");
        console.log(res.data);

        this.setState({
          upload: true,
        });

        console.log(this.state.upload, "upload");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="AddPostContainer">
          <div className="AddPostGrid">
            <div className="AddPostImg">
              <img
                src={this.state.imgRef}
                style={{
                  width: "80%",
                  margin: "50px",
                  border: " 1px solid #ddd",
                  borderRadius: " 4px",
                  padding: "5px",
                }}
              />
            </div>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              {/*TITLE  */}
              <div className="AddPostDetailsGrid">
                <div>
                  <div>
                    <input
                      className="formInput"
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={this.changeHandle}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <input
                      className="formInput"
                      type="file"
                      name="file"
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                {/* description */}
                <div>
                  <div>
                    <textarea
                      className="formTextarea"
                      name="description"
                      placeholder="type here ......"
                      onChange={this.changeHandle}
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    className="Btn_Addpost_form"
                    type="submit"
                    value="Publish"
                  />
                </div>

                {this.state.upload == true ? (
                  <Redirect
                    to={{
                      pathname: "/",
                    }}
                  />
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Addpost;
