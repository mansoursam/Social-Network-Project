import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authAction";
import { clearProfile } from "../actions/profileAction";
import { getCurrentProfile } from "../actions/profileAction";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  logoutClick = e => {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
    // window.location.assign("/");
  };
  render() {
    const { profile } = this.props.profile;
    console.log(this.props.profile);

    console.log(profile.images ? profile.images.profile_image[0].url : null);

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Friends
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <li className="nav-item" style={{ listStyle: "none" }}>
            <a href="" onClick={this.logoutClick} className="nav-link">
              <img
                className="rounded-circle"
                src={
                  profile.images ? profile.images.profile_image[0].url : null
                }
                alt={
                  profile.images
                    ? profile.images.profile_image[0].originalname
                    : null
                }
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />
              Logout
            </a>
          </li>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile, getCurrentProfile }
)(Navbar);
