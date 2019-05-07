import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../actions/profileAction";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      gender: "",
      age: "",
      aboutme: "",
      skills: "",
      background_image: "",
      profile_image: "",
      street: "",
      zip: "",
      country: "",
      city: "",
      status: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    switch (e.target.name) {
      case "profile_image":
        this.setState({ profile_image: e.target.files[0] });
        break;
      case "background_image":
        this.setState({ background_image: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
    console.log(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      profile_image,
      background_image,
      nickname,
      age,
      gender,
      status,
      skills,
      street,
      zip,
      country,
      city
    } = this.state;
    const profileData = new FormData();
    profileData.append("profile_image", profile_image);
    profileData.append("background_image", background_image);
    profileData.append("nickname", nickname);
    profileData.append("age", age);
    profileData.append("gender", gender);
    profileData.append("status", status);
    profileData.append("skills", skills);
    profileData.append("street", street);
    profileData.append("zip", zip);
    profileData.append("country", country);
    profileData.append("city", city);

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    console.log(this.props);

    return (
      <div className="container m-5">
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Nickname</label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                className="form-control"
                placeholder="Your Nickname"
                value={this.state.nickname}
                onChange={this.onChange}
                className={classnames("form-control", {
                  "is-invalid": errors.nickname
                })}
              />
              {errors.nickname && (
                <div className="invalid-feedback">{errors.nickname}</div>
              )}
            </div>
            <div className="form-group col-md-3">
              <label>status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                placeholder="status"
                value={this.state.status}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                placeholder="age"
                value={this.state.age}
                onChange={this.onChange}
              />
            </div>
            <div className="form-check form-check-inline ml-3">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio1"
                value="male"
                onChange={this.onChange}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio2"
                value="female"
                onChange={this.onChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Profile Image</label>
              <input
                // style={{ display: "none" }}
                type="file"
                name="profile_image"
                className="form-control"
                // ref={fileInput => (this.fileInput = fileInput)}
                id="skills"
                onChange={this.onChange}
              />
              {/* <button
                className="btn btn-success m-2"
                onClick={() => this.fileInput.click()}
              >
                select image
              </button> */}
            </div>
            <div className="form-group col-md-6">
              <label>Background Image</label>
              <input
                // style={{ display: "none" }}
                type="file"
                name="background_image"
                className="form-control"
                // ref={fileInput => (this.fileInput = fileInput)}
                id="backgroundImage"
                onChange={this.onChange}
              />
              {/* <button
                className="btn btn-success m-2"
                onClick={() => this.fileInput.click()}
              >
                select image
              </button> */}
            </div>
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              id="skills"
              placeholder="Enter your Skills"
              value={this.state.skills}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="street"
              className="form-control"
              id="address"
              placeholder="Street , House Nr"
              value={this.state.street}
              onChange={this.onChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                id="country"
                value={this.state.country}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                id="city"
                value={this.state.city}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Zip</label>
              <input
                type="text"
                className="form-control"
                name="zip"
                id="zip"
                value={this.state.zip}
                onChange={this.onChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    );
  }
}
CreateProfile.propsTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
