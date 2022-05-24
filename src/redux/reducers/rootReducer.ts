import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import gamesReducer from "./gamesReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  games: gamesReducer,
  cart: cartReducer,
});

export default rootReducer;
