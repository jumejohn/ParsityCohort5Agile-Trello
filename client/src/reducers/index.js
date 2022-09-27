import {HANDLE_LOGOUT} from '../actions/Logout'
// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  isLoggedIn: false,
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN": {
      return {
        ...state, isLoggedIn: true, user: action.payload,
      }
    }
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
