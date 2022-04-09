import { RootState } from "@/redux";
import setSignInOpen from "@/redux/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./home";
import SignInForm from "./modal/forms/signInForm";
import Modal from "./modal/modal";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  // function onClose() {
  //   dispatch({ type: "setSignInOpen", payload: false });
  // }

  function onSignInClose() {
    dispatch(setSignInOpen(false));
    navigate("/home");
  }

  return user.isAuth ? (
    children
  ) : (
    <>
      <Home />
      <Modal isOpen onClose={() => onSignInClose()} title="Authorization">
        <SignInForm />
      </Modal>
    </>
  );
}

// onClose={() => dispatch({ type: "setSignInOpen", payload: false })}
