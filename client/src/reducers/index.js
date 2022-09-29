import { combineReducers } from "redux";

import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser";
import reducerBoard from "./reducerBoard";
import reducerCard from "./reducerCard";

const rootReducer = combineReducers({
  token: reducerLogin,
  user: reducerUser,
  currentBoard: reducerBoard,
  currentCard: reducerCard,
});

export default rootReducer;
