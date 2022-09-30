import { ADD_LIST_STATE } from "../actions/AddListState";
import { FETCH_BOARD } from "../actions/BoardFetch";
import { CREATE_LIST } from "../actions/CreateList";
import { DELETE_LIST } from "../actions/DeleteList";
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
    case DELETE_LIST:
      let listToRemoveIndex = state.lists.findIndex((list) => list._id == action.payload);
      let newLists3 = [...state.lists];
      newLists3.splice(listToRemoveIndex, 1);
      return {
        ...state,
        lists: newLists3,
      }
    case "RESET_CURRENT_BOARD":
      return initialState;
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default reducerBoard;
