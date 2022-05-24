import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../../elements/input";
import { AuthFields, validateAuth } from "../../../helpers/validate";
import { register } from "../../../redux/actions/authActions";

function SignUpForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFormValues] = useState({ login: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState<AuthFields>({ ...formValues });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isError = formErrors.login || formErrors.password || formErrors.confirmPassword;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors(validateAuth(e.target.name, e.target.value, formErrors, formValues.password));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      dispatch(
        register(formValues, () => {
          navigate("/profile");
          onClose();
        })
      );
    }
  };

  return (
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
      <Input
        label="Confirm password"
        id="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        errorMessage={formErrors.confirmPassword}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default SignUpForm;
