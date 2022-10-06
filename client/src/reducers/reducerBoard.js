import { FETCH_BOARD } from "../actions/BoardFetch";
import { CREATE_CARD } from "../actions/CreateCard";
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
    case CREATE_LIST:
      let newLists2 = [...state.lists];
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
    // dispatched by editListTitle, deleteCard, quickEditCard action creators
    case "UPDATE_LIST":
      let newLists4 = [...state.lists];
      let listToUpdateIndex = newLists4.findIndex(list => list._id == action.payload._id);
      newLists4[listToUpdateIndex] = action.payload;
      return {
        ...state,
        lists: newLists4,
      }
    case CREATE_CARD:
      let newLists5 = [...state.lists];
      let listToAddCardIndex = newLists5.findIndex(list => list._id == action.payload._id);
      newLists5[listToAddCardIndex] = action.payload;
      return {
        ...state,
        lists: newLists5,
      }
    case "UPDATE_BOARD":
      console.log("board updated!")
      return action.payload;
    case "RESET_CURRENT_BOARD":
      return initialState;
    case HANDLE_LOGOUT:
      return initialState;
    case "MOVE_LIST":
      const order = action.payload.newOrder
      const oldLists = action.payload.oldLists
      
      const newLists = order.map(id => {
        return oldLists.find(list => list._id == id)
      })
      return {
        ...state, lists: newLists
      }
    default:
      return state;
  }
}

export default reducerBoard;
