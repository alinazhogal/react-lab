import {
  ActionsType,
  AuthState,
  RestoreUser,
  Login,
  Logout,
  SignUp,
  ChangePassword,
  GetProfile,
  SaveProfile,
} from "../types";

const initialState = { isAuth: false, username: "", phone: "", description: "", address: "" };

const modalReducer = (
  // eslint-disable-next-line default-param-last
  state: AuthState = initialState,
  action: Login | Logout | SignUp | RestoreUser | ChangePassword | SaveProfile | GetProfile
) => {
  switch (action.type) {
    case ActionsType.LOGIN:
      return {
        isAuth: true,
        username: action.payload.username,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
      };
    case ActionsType.LOGOUT:
      return { isAuth: false, username: "", phone: "", description: "", address: "" };
    case ActionsType.SIGNUP:
      return { ...state, isAuth: true, username: action.payload };
    case ActionsType.RESTORE_USER:
      return { ...state, isAuth: action.payload.isAuth, username: action.payload.username };
    case ActionsType.CHANGE_PASSWORD:
      return state;
    case ActionsType.SAVE_PROFILE:
      return {
        ...state,
        username: action.payload.username,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
      };
    case ActionsType.GET_PROFILE:
      return {
        ...state,
        username: action.payload.username,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
      };
    default:
      return state;
  }
};
export default modalReducer;
