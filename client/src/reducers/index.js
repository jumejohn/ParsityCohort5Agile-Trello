import { combineReducers } from "redux";

import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser";
import reducerBoard from "./reducerBoard";
import reducerCard from "./reducerCard";
import reducerLists from "./reducerLists";
import reducerDnd from "./reducerDnd";

const rootReducer = combineReducers({
  token: reducerLogin,
  user: reducerUser,
  currentBoard: reducerBoard,
  currentCard: reducerCard,
  normalizedLists: reducerLists,
  disabledDnd: reducerDnd,
});

export default rootReducer;
