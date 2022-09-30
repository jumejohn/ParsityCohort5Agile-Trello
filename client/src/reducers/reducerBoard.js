import { ADD_LIST_STATE } from "../actions/AddListState";
import { FETCH_BOARD } from "../actions/BoardFetch";
import { CREATE_CARD } from "../actions/CreateCard";
import { CREATE_LIST } from "../actions/CreateList";
import { DELETE_CARD } from "../actions/DeleteCard";
import { DELETE_LIST } from "../actions/DeleteList";
import { EDIT_LIST_TITLE } from "../actions/EditListTitle";
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
    case EDIT_LIST_TITLE:
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
    case DELETE_CARD:
      let listToRemoveCardIndex = state.lists.findIndex(list => list._id == action.payload.listId);
      let newCards = [...state.lists[listToRemoveCardIndex].cards]
      let cardToRemoveIndex = state.lists[listToRemoveCardIndex].cards.findIndex(card => card._id == action.payload.cardId);
      newCards.splice(cardToRemoveIndex, 1);
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, listToRemoveCardIndex),
          state.lists[listToRemoveCardIndex] = { ...state.lists[listToRemoveCardIndex], cards: newCards },
          ...state.lists.slice(listToRemoveCardIndex+1)
        ],
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
