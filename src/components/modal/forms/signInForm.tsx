import { useState } from "react";
import InputText from "@/elements/inputText";
import { validate, Fields } from "@/helpers/validate";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/actions/authActions";

function SignInForm() {
  const [formValues, setFormValues] = useState<Fields>({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues, response: "" });

  const dispatch = useDispatch();

  const isError = formErrors.login || formErrors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors(validate(e.target.name, e.target.value, formErrors));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: "", response: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      dispatch(logIn(formValues, () => setFormErrors({ ...formErrors, response: "Invalid login or password" })));
    }
  };

  return (
    <>
      <p>{formErrors.response}</p>
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
        <button type="submit" className="button-el">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignInForm;
