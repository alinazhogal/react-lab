import { ActionsType, ModalState, SetSignInOpen } from "../types";

const initialState = { isOpen: false, callbackLink: undefined };

// eslint-disable-next-line default-param-last
const modalReducer = (state: ModalState = initialState, action: SetSignInOpen) => {
  switch (action.type) {
    case ActionsType.SET_SIGNIN_OPEN:
      return {
        isOpen: action.payload.isOpen,
        callbackLink: action.payload.isOpen ? action.payload.callbackLink : undefined,
      };
    default:
      return state;
  }
};
export default modalReducer;
