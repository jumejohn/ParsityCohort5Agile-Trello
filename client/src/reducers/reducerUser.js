import { FETCH_USER } from "../actions/UserFetch";

const initialState = {currentUser: null }

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
        console.log("user", action.payload)
            return {
            currentUser: action.payload,}

        default:
            return state;
  }
}

export default reducerUser;