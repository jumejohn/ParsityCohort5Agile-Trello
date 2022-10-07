import { EDIT_CARD_LABELS } from "../actions/EditCardLabels";
import { LOAD_CARD } from "../actions/LoadCard";
import { HANDLE_LOGOUT } from "../actions/Logout";
import { CREATE_COMMENT } from "../actions/PostComment";
import { UPDATE_CARD } from "../actions/PostComment";

const initialState = {};
const reducerCard = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARD:
      // console.log("current reducer Card:", action.payload);
      return action.payload;
    case EDIT_CARD_LABELS:
      return action.payload;
    case HANDLE_LOGOUT:
      return initialState;
    case UPDATE_CARD:
      return action.payload;
    default:
      return state;
  }
};

export default reducerCard;
