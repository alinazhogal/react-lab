import { useState } from "react";
import Input from "@/elements/input";
import { AuthFields, validateAuth } from "@/helpers/validate";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux";

function SignInForm() {
  const [formValues, setFormValues] = useState({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState<AuthFields>({ ...formValues, response: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callbackLink = useSelector((state: RootState) => state.modal.callbackLink);

  const isError = formErrors.login || formErrors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors(validateAuth(e.target.name, e.target.value, formErrors));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: "", response: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      dispatch(
        logIn(
          formValues,
          () => {
            if (callbackLink) {
              navigate(callbackLink);
            }
          },
          () => setFormErrors({ ...formErrors, response: "Invalid login or password" })
        )
      );
    }
  };

  return (
    <>
      <p>{formErrors.response}</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Login"
          id="login"
          type="text"
          value={formValues.login}
          onChange={handleChange}
          errorMessage={formErrors.login}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          errorMessage={formErrors.password}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <button type="submit" className="button-el">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignInForm;
