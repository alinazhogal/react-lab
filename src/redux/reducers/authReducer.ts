import { getItemFromStorage, SavableKeys } from "@/helpers/storage";
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

const restoredUser = getItemFromStorage(SavableKeys.User);
const user = restoredUser
  ? JSON.parse(restoredUser)
  : {
      isAuth: "",
      username: "",
      role: "",
    };

const initialState = {
  isAuth: user.isAuth,
  username: user.username,
  phone: "",
  description: "",
  address: "",
  photo: "",
  role: user.role,
};

const modalReducer = (
  // eslint-disable-next-line default-param-last
  state: AuthState = initialState,
  action: Login | Logout | SignUp | RestoreUser | ChangePassword | SaveProfile | GetProfile
) => {
  switch (action.type) {
    case ActionsType.LOGIN:
      return { ...state, isAuth: true, username: action.payload.username, role: action.payload.role };
    case ActionsType.LOGOUT:
      return { isAuth: false, username: "", phone: "", description: "", address: "", photo: "", role: "" };
    case ActionsType.SIGNUP:
      return { ...state, isAuth: true, username: action.payload.username, role: action.payload.role };
    case ActionsType.RESTORE_USER:
      return { ...state, isAuth: action.payload.isAuth, username: action.payload.username, role: action.payload.role };
    case ActionsType.CHANGE_PASSWORD:
      return state;
    case ActionsType.SAVE_PROFILE:
      return {
        ...state,
        username: action.payload.username,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
        photo: action.payload.photo,
      };
    case ActionsType.GET_PROFILE:
      return {
        ...state,
        username: action.payload.username,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
        photo: action.payload.photo,
      };
    default:
      return state;
  }
};
export default modalReducer;
