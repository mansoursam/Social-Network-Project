import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_PROFILE,
  GET_ERRORS
} from "./types";

//Get the current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get("/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
//profile Loading
export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};
// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/profiles", profileData)
    .then(res => history.push("/profiles"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
