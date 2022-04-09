import { ActionsType, AuthState, Login, LoginError, Logout, SignUp } from "../types";

const initialState = { isAuth: false, username: "" };

// eslint-disable-next-line default-param-last
const modalReducer = (state: AuthState = initialState, action: Login | Logout | SignUp | LoginError) => {
  switch (action.type) {
    case ActionsType.LOGIN:
      return { isAuth: true, username: action.payload };
    case ActionsType.LOGOUT:
      return { isAuth: false, username: "" };
    case ActionsType.SIGNUP:
      return { isAuth: true, username: action.payload };
    case ActionsType.LOGIN_ERROR:
      return { isAuth: false, username: "" };
    default:
      return state;
  }
};
export default modalReducer;
