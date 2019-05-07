import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initilState = {
  isAuthenticated: false,
  user: {}
};
export default function(state = initilState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
