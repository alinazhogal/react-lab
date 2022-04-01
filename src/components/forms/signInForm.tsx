import { useState } from "react";
import InputText from "@/elements/inputText";
import debounce from "@/helpers/debounce";
import validate from "@/helpers/validateForm";
import { signIn } from "@/api/users";

function SignInForm() {
  const [formValues, setFromValues] = useState({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState({ ...formValues });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value)));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const data = await signIn(formValues);
      console.log(data);
    })();
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
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default SignInForm;
