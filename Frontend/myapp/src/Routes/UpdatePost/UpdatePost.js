import React, { Component, Fragment } from "react";
import axios from "axios";

import { Redirect } from "react-router";

import "./UpdatePostStyle.css";
class UpdatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      Selectedfile: "",

      imgRef: "",

      update: false,
      cancle: false,
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
      .put(
        `/api/post/${this.props.location.state.updateData._id}`,
        fd,
        axiosConfig,
        bodyData,
      )
      .then((res) => {
        console.log("UI");
        console.log(res.data);

        this.setState({
          update: true,
          cancle: false,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  componentDidMount(props) {
    console.log("property_id", this.props.location.state.updateData);
    this.setState({
      title: this.props.location.state.updateData.postName,
      description: this.props.location.state.updateData.postDetails,
    });

    console.log(this.state.title, "title");
  }

  ActionCancel = () => {
    console.log(" i am cancle");
    this.setState({
      cancle: true,
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

                <div style={{ display: "inline" }}>
                  <input
                    className="Btn_Addpost_form"
                    type="submit"
                    value="Update"
                  />

                  <input
                    className="Btn_Addpost_form"
                    type="submit"
                    value="Cancle"
                    onClick={this.ActionCancel}
                  />
                </div>

                {this.state.update == true || this.state.cancle == true ? (
                  <Redirect
                    to={{
                      pathname: "/mypost",
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

export default UpdatePost;
