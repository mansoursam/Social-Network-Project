import axios from "axios";
import setAuthToken from "../utiles/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
//User Registration
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/registration", userData)
    .then(res => history.push("/users/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//User Login
export const loginUser = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      //save token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //decode token to get userData
      const decoded = jwt_decode(token);
      //set cureent user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
//User Logout
export const logoutUser = () => dispatch => {
  //remove token from localStorage
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
