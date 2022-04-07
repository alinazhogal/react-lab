import { AuthContext } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./home";
import SignInForm from "./modal/forms/signInForm";
import Modal from "./modal/modal";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  function onClose() {
    dispatch({ type: "setSignInOpen", payload: false });
    navigate("/home");
  }

  return state.isAuth ? (
    children
  ) : (
    <>
      <Home />
      <Modal isOpen onClose={() => onClose()} title="Authorization">
        <SignInForm onClose={() => dispatch({ type: "setSignInOpen", payload: false })} />
      </Modal>
    </>
  );
}
