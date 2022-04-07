import React, { createContext, useEffect, useReducer } from "react";
import { getItemFromStorage, SavableKeys } from "./helpers/storage";

export type ActionsMap = {
  setUsername: string;
  setIsAuth: boolean;
  setSignInOpen: boolean;
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

type AuthState = {
  userName?: string;
  isAuth?: boolean;
  signInOpen?: boolean;
};

const initialState: AuthState = {
  userName: undefined,
  isAuth: undefined,
  signInOpen: undefined,
};

export const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => {
    console.log("Default");
  },
});

export function reducer(state: AuthState, action: Actions): AuthState {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        userName: action.payload,
      };
    case "setIsAuth":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "setSignInOpen":
      return {
        ...state,
        signInOpen: action.payload,
      };
    default:
      throw new Error();
  }
}

function AuthProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedUser = getItemFromStorage(SavableKeys.User);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as { userName: string; isAuth: boolean };
      dispatch({ type: "setUsername", payload: parsedUser.userName });
      dispatch({ type: "setIsAuth", payload: parsedUser.isAuth });
    }
  }, [dispatch]);

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
