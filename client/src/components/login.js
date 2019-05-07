import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profiles");
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(obj, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container mt-5">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="col">
            <div className="form-group col">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                className={classnames("form-control", {
                  "is-invalid": errors.email
                })}
                onChange={this.onChange}
                placeholder="Enter email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <small className="text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                onChange={this.onChange}
                placeholder="Password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <span>
            <a href="/users/registration"> Or Create an Account</a>
          </span>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
