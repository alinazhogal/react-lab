import { ActionsType } from "../types";

const setSignInOpen = (isOpen: boolean) => ({
  type: ActionsType.SET_SIGNIN_OPEN,
  payload: isOpen,
});

export default setSignInOpen;
