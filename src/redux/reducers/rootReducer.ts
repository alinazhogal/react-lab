import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gamesReducer from "./gamesReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  games: gamesReducer,
});

export default rootReducer;
