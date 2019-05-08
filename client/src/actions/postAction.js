import axios from "axios";

import { ADD_POST } from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
