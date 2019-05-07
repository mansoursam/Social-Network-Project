import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../actions/authAction";
class Registration extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(obj, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h1 className="title">Signup Page</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                className={classnames("form-control", {
                  "is-invalid": errors.firstName
                })}
                placeholder="First name"
                onChange={this.onChange}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                className={classnames("form-control", {
                  "is-invalid": errors.lastName
                })}
                placeholder="Last name"
                onChange={this.onChange}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                className={classnames("form-control", {
                  "is-invalid": errors.email
                })}
                placeholder="Email"
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                placeholder="Password"
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={this.state.password2}
                className={classnames("form-control", {
                  "is-invalid": errors.password2
                })}
                placeholder="Confirm Password"
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    );
  }
}
Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Registration));
