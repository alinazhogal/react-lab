import { useNavigate } from "react-router-dom";
import Home from "./home";
import SignInForm from "./modal/forms/signInForm";
import Modal from "./modal/modal";

interface PrivateRouteProps {
  isAuth: boolean;
  children: JSX.Element;
  logIn: (arg0: string) => void;
  setSignInOpen: (arg0: boolean) => void;
}

export default function PrivateRoute({ isAuth, children, logIn, setSignInOpen }: PrivateRouteProps) {
  const navigate = useNavigate();

  function onClose() {
    setSignInOpen(false);
    navigate("/home");
  }

  return isAuth ? (
    children
  ) : (
    <>
      <Home />
      <Modal isOpen onClose={() => onClose()} title="Authorization">
        <SignInForm onClose={() => setSignInOpen(false)} logIn={logIn} />
      </Modal>
    </>
  );
}
