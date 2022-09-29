import { FETCH_BOARD } from "../actions/BoardFetch";

const initialState = {
  boardName: "",
  lists: [],
}

const reducerBoard = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOARD:
        console.log("current Board:", action.payload)
            return action.payload

        default:
            return state;
  }
}

export default reducerBoard;
