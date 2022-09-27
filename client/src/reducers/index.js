// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN": {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
