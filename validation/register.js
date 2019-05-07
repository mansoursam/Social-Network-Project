const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistration(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 16 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password not matched";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
