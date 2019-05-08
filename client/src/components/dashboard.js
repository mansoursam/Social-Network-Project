import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileAction";
import Navbar from "./navbar";
import Spinner from "../images/spinner";
import Post from "./posts/post";
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    console.log(this.props.profile);
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has proile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="container ">
            <div>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                  <img
                    src={profile.images.background_image[0].url}
                    alt="background_image"
                  />
                </div>
                <div className="row user-left-part">
                  <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                    <div className="row ">
                      <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                        <img
                          src={profile.images.profile_image[0].url}
                          className="rounded-circle"
                          alt="profile_image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-center w-100 ">
                  {user.firstName} {user.lastName}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className=" mt-5 mb-1 shadow p-2">
                  <h5 className="text-center border-bottom p-1">Info</h5>
                  <ul
                    className="p-0"
                    style={{
                      listStyle: "none",
                      fontSize: "15px",
                      lineHeight: "25px"
                    }}
                  >
                    <li>Name:{profile.nickname}</li>
                    <li>status:{profile.status}</li>
                    <li>
                      Location:{profile.street},{profile.zip}
                      <br />
                      {profile.city},{profile.country}
                    </li>
                    <li>
                      skills:
                      {profile.skills.map((skill, index) => {
                        return (
                          <span key={index} className="badge  badge-info m-1">
                            {skill}
                          </span>
                        );
                      })}
                    </li>
                  </ul>
                </div>
                <div className="  mt-2 mb-1 shadow p-2">
                  <h5 className="text-center border-bottom p-1">Social</h5>
                  <ul
                    className="p-0"
                    style={{
                      listStyle: "none",
                      fontSize: "15px",
                      lineHeight: "25px"
                    }}
                  >
                    <li>
                      <i
                        className="fab fa-youtube "
                        style={{ color: "#ff0000" }}
                      />{" "}
                      <a href="https://www.youtube.com" target="_blank">
                        {profile.social.youtube}
                      </a>
                    </li>
                    <li>
                      <i
                        className="fab fa-facebook"
                        style={{ color: "#3b5998" }}
                      />{" "}
                      {profile.social.facebook}
                    </li>
                    <li>
                      <i
                        className="fab fa-twitter"
                        style={{ color: "#1da1f2" }}
                      />{" "}
                      {profile.social.twitter}
                    </li>
                    <li>
                      <i
                        className="fab fa-instagram"
                        style={{ color: "#833ab4" }}
                      />{" "}
                      {profile.social.instagram}
                    </li>
                  </ul>
                </div>
                <div className="  mt-2 mb-1 shadow p-2">
                  <h5 className="text-center border-bottom p-1">Gallery</h5>
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          className="d-block w-100"
                          src={profile.images.profile_image[0].url}
                          alt="First slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src={profile.images.profile_image[0].url}
                          alt="Second slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src={profile.images.profile_image[0].url}
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-8 mt-5 ">
                <Post />
              </div>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="container text-center">
            <h1>welcome {user.firstName} Create Your Profile</h1>
            <a href="/create-profile">
              <button className="btn btn-primary">Create</button>
            </a>
          </div>
        );
      }
    }
    return (
      <div>
        <Navbar />
        <div className=" mt-5 ">
          <div className="row">
            <div className="col-md-12">
              <div>{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
