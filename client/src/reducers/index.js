import { combineReducers } from "redux";

import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser"

const rootReducer = combineReducers({
    token: reducerLogin,
    user: reducerUser
  });

export default rootReducer;