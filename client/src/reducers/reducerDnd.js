// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  disabled: false
};

const reducerDnd = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_DISABLE":
      return {
        disabled: true
      };
    case "HANDLE_ENABLE":
      return {
        disabled: false
      }
    default:
      return state;
  }
};

export default reducerDnd;
