import { ActionsType, ModalState, SetSignInOpen } from "../types";

const initialState = { isOpen: false };

// eslint-disable-next-line default-param-last
const modalReducer = (state: ModalState = initialState, action: SetSignInOpen) => {
  switch (action.type) {
    case ActionsType.SET_SIGNIN_OPEN:
      return { isOpen: action.payload };
    default:
      return state;
  }
};
export default modalReducer;
