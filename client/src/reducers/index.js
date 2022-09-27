// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    }
    case "LOAD_CARD": {
      return {
        ...state,
        cards: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
