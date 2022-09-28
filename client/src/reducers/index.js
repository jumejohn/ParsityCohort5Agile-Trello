import { combineReducers } from "redux";

import reducerLogin from "./reducerLogin";
import reducerUser from "./reducerUser"

const rootReducer = combineReducers({
    token: reducerLogin,
    user: reducerUser
  });

export default rootReducer;