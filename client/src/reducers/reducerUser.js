import { FETCH_USER } from "../actions/UserFetch";
import { HANDLE_LOGOUT } from '../actions/Logout';

const initialState = {currentUser: null }

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
        console.log("user", action.payload)
            return {
            currentUser: action.payload,}
        case HANDLE_LOGOUT:
            return initialState;
        default:
            return state;
  }
}

export default reducerUser;