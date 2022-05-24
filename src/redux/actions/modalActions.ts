import { ActionsType } from "../types";

const setSignInOpen = (isOpen: boolean, callbackLink?: string) => ({
  type: ActionsType.SET_SIGNIN_OPEN,
  payload: { isOpen, callbackLink },
});

export default setSignInOpen;
