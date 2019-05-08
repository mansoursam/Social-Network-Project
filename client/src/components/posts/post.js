import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postAction";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="shadow p-2">
        <h4 className="text-center">Posts</h4>
        <form onSubmit={this.onSubmit}>
          <div className="input-group ">
            <div className="input-group-prepend" />

            <textarea
              placeholder="What are you doing Now ..."
              className="form-control"
              aria-label="With textarea"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn m-1 btn-primary rounded-0">
            Post
          </button>
          <button className="btn m-1 btn-primary rounded-0">
            <i className="fas fa-image" />
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
