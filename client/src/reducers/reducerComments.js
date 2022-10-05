import { HANDLE_LOGOUT } from "../actions/Logout";
import { LOAD_COMMENTS, UPDATE_CARD } from "../actions/PostComment";

const initialState = { cardComments: [] };
const reducerComments = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      console.log("currentComments", action.payload);
      return action.payload;
    case UPDATE_CARD:
      console.log("create comment reducer", action.payload);
      const comments = [...state.cardComments];
      comments.push(action.payload);
      console.log(state);
      return {
        ...state,
        cardComments: comments,
      };
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default reducerComments;
