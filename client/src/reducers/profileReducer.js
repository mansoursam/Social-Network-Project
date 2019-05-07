import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE } from "../actions/types";
const initialState = {
  profiles: null,
  profile: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {}
      };
    default:
      return state;
  }
}
