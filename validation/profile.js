const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfile(data) {
  let errors = {};
  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.nickname, { min: 6, max: 40 })) {
    errors.nickname = "nickname needs to be between 6 and 40";
  }
  if (validator.isEmpty(data.nickname)) {
    errors.nickname = "Profile nickname is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Profile status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Profile skills is required";
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
