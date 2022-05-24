import { getItemFromStorage, SavableKeys } from "../../helpers/storage";
import {
  ActionsType,
  AuthState,
  Login,
  Logout,
  SignUp,
  ChangePassword,
  GetProfile,
  SaveProfile,
  GetUser,
} from "../types";

const restoredUser = getItemFromStorage(SavableKeys.User);
const user = restoredUser
  ? JSON.parse(restoredUser)
  : {
      username: "",
    };

const initialState = {
  isAuth: !!user.username,
  username: user.username,
  phone: "",
  description: "",
  address: "",
  photo: "",
  role: "",
};

const modalReducer = (
  // eslint-disable-next-line default-param-last
  state: AuthState = initialState,
  action: Login | Logout | SignUp | ChangePassword | SaveProfile | GetProfile | GetUser
) => {
  switch (action.type) {
    case ActionsType.LOGIN:
      return {
        ...state,
        isAuth: true,
        username: action.payload.username,
        role: action.payload.role,
        phone: action.payload.phone,
        address: action.payload.address,
        description: action.payload.description,
        photo: action.payload.photo,
      };
    case ActionsType.LOGOUT:
      return { isAuth: false, username: "", phone: "", description: "", address: "", photo: "", role: "" };
    case ActionsType.SIGNUP:
      return {
        ...state,
        isAuth: true,
        username: action.payload.username,
        role: action.payload.role,
      };
    case ActionsType.GET_USER:
      return { ...state, role: action.payload };
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
