import { ADD_LIST_STATE } from "../actions/AddListState";
import { FETCH_BOARD } from "../actions/BoardFetch";
import { CREATE_LIST } from "../actions/CreateList";
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
    case "CANCEL_ADD_LIST":
      let newLists = [...state.lists];
      newLists.pop();
      return {
        ...state,
        lists: newLists,
      }
    case CREATE_LIST:
      let newLists2 = [...state.lists];
      newLists2.pop();
      newLists2.push(action.payload);
      return {
        ...state,
        lists: newLists2,
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
