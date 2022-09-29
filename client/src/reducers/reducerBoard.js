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
            return action.payload
        case HANDLE_LOGOUT:
          return initialState;
        default:
            return state;
  }
}

export default reducerBoard;
