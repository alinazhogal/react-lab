import { useState } from "react";
import InputText from "@/elements/inputText";
import debounce from "@/helpers/debounce";
import { validate, Fields } from "@/helpers/validateForm";
import { signUp } from "@/api/users";

function SignUpForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFromValues] = useState<Fields>({ login: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues });

  const isError = formErrors.login || formErrors.password || formErrors.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value, formErrors, formValues.password)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      const isAuth = await signUp(formValues);
      console.log(isAuth);
      if (isAuth) {
        onClose();
      }
    }
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
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default SignUpForm;
