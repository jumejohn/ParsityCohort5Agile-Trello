import { combineReducers } from "redux";

import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser"
import reducerBoard from "./reducerBoard";

const rootReducer = combineReducers({
    token: reducerLogin,
    user: reducerUser,
    currentBoard: reducerBoard
  });

export default rootReducer;