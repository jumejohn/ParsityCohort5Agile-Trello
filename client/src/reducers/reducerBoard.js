import { ADD_LIST_STATE } from "../actions/AddListState";
import { FETCH_BOARD } from "../actions/BoardFetch";
import { HANDLE_LOGOUT } from "../actions/Logout";
const initialState = {
  boardName: "",
  lists: [],
}

const reducerBoard = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARD:
      console.log("current Board:", action.payload)
      return action.payload;
    case ADD_LIST_STATE:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    case HANDLE_LOGOUT:
      return initialState;
    case "RESET_CURRENT_BOARD":
      return initialState;
    default:
      return state;
  }
}

export default reducerBoard;
