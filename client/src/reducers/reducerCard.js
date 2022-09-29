import { LOAD_CARD } from "../actions/LoadCard";
import { HANDLE_LOGOUT } from "../actions/Logout";

const initialState = { _id: "" };
const reducerCard = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARD:
      console.log("current Card:", action.payload);
      return action.payload;
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducerCard;
