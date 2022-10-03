import { LOAD_CARD } from "../actions/LoadCard";
import { HANDLE_LOGOUT } from "../actions/Logout";
import { CREATE_COMMENT } from "../actions/PostComment";

const initialState = {};
const reducerCard = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARD:
      console.log("current reducer Card:", action.payload);
      return action.payload;
    case CREATE_COMMENT:
      console.log("create comment reducer", action.payload);
      let comments = [...state.cardComments];
      comments.push(action.payload);
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

export default reducerCard;
