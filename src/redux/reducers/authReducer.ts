import { ActionsType, AuthState, RestoreUser, Login, Logout, SignUp } from "../types";

const initialState = { isAuth: false, username: "" };

// eslint-disable-next-line default-param-last
const modalReducer = (state: AuthState = initialState, action: Login | Logout | SignUp | RestoreUser) => {
  switch (action.type) {
    case ActionsType.LOGIN:
      return { isAuth: true, username: action.payload };
    case ActionsType.LOGOUT:
      return { isAuth: false, username: "" };
    case ActionsType.SIGNUP:
      return { isAuth: true, username: action.payload };
    case ActionsType.RESTORE_USER:
      return { isAuth: action.payload.isAuth, username: action.payload.username };
    default:
      return state;
  }
};
export default modalReducer;
