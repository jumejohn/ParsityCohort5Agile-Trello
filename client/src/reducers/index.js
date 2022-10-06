import { combineReducers } from "redux";

import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser";
import reducerBoard from "./reducerBoard";
import reducerCard from "./reducerCard";
import reducerLists from "./reducerLists";

const rootReducer = combineReducers({
  token: reducerLogin,
  user: reducerUser,
  currentBoard: reducerBoard,
  currentCard: reducerCard,
  normalizedLists: reducerLists
});

export default rootReducer;
