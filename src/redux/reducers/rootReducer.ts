import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
});

export default rootReducer;
