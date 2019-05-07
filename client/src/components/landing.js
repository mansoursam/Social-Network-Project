import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Logo from "../images/logo_project.jpg";
import Login from "./login";

class App extends Component {
  render() {
    return (
      <div className="landingPage" style={{ height: "500px" }}>
        <div className=" bg-info text-center  w-50 p-5">
          <img
            src={Logo}
            className="rounded-circle"
            alt="Logo"
            width="250"
            height="250"
          />

          <h1>Welcome to our Website</h1>

          <p className="lead">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </div>
        <div className="bg-warning w-50 p-5">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
