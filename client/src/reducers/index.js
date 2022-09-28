import {HANDLE_LOGOUT} from '../actions/Logout'
// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  isLoggedIn: false,
  token: localStorage.token,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN": {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };
    }
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
