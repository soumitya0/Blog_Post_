import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Check from "./checkComp/Check";

import NavBar from "./components/navbar/NavBar";
import NewestPost from "./components/newest_Post/NewestPost";
import Layout_One from "./components/newest_Post/LayoutPost/Layout1/Layout_One";
import Layout_two from "./components/newest_Post/LayoutPost/Layout2/Layout_two";
import Layout_three from "./components/newest_Post/LayoutPost/Layout3/Layout_three";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import About from "./Routes/About/About";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Register/Register";
import Mypost from "./Routes/MyPost/Mypost";
import Addpost from "./Routes/AddPost/Addpost";
import SinglePost from "./Routes/SinglePost/SinglePost";
import UpdatePost from "./Routes/UpdatePost/UpdatePost";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div>
          <div className="App">
            <NavBar />
          </div>

          <div className="margin-50">
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>
          </div>
        </div>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/mypost">
          <Mypost />
        </Route>

        <Route exact path="/addPost">
          <Addpost />
        </Route>

        <Route
          exact
          path="/updatepost"
          render={(props) => <UpdatePost {...props} />}
        />

        <Route
          exact
          path="/user/:id"
          render={(props) => <SinglePost {...props} />}
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
