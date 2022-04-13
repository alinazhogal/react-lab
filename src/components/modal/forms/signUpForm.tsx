import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "@/elements/inputText";
import { validate, Fields } from "@/helpers/validate";
import { useDispatch } from "react-redux";
import { register } from "@/redux/actions/authActions";

function SignUpForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFormValues] = useState<Fields>({ login: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isError = formErrors.login || formErrors.password || formErrors.confirmPassword;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors(validate(e.target.name, e.target.value, formErrors, formValues.password));
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
      dispatch(register(formValues));
      onClose();
      navigate("/profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Login"
        id="login"
        type="text"
        value={formValues.login}
        onChange={handleChange}
        errorMessage={formErrors.login}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <InputText
        label="Password"
        id="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        errorMessage={formErrors.password}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <InputText
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
