import { useState } from "react";
import InputText from "@/elements/inputText";
import Button from "@/elements/button";
import debounce from "@/helpers/debounce";
import validate from "@/helpers/validateForm";

function SignUpForm() {
  const [formValues, setFromValues] = useState({ login: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState({ ...formValues });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value, formValues.password)));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputText
        label="Login"
        id="login"
        type="text"
        value={formValues.login}
        onChange={(e) => handleChange(e)}
        errorMessage={formErrors.login}
      />
      <InputText
        label="Password"
        id="password"
        type="password"
        value={formValues.password}
        onChange={(e) => handleChange(e)}
        errorMessage={formErrors.password}
      />
      <InputText
        label="Confirm password"
        id="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={(e) => handleChange(e)}
        errorMessage={formErrors.confirmPassword}
      />
      <Button title="Submit" onClick={() => console.log(formValues)} />
    </form>
  );
}

export default SignUpForm;
