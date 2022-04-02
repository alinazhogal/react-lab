import { useState } from "react";
import InputText from "@/elements/inputText";
import debounce from "@/helpers/debounce";
import { validate, Fields } from "@/helpers/validateForm";
import { signIn } from "@/api/users";

function SignInForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFromValues] = useState<Fields>({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues, response: "" });

  const isError = formErrors.login || formErrors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value, formErrors)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      const isAuth = await signIn(formValues);
      if (isAuth) {
        onClose();
      } else {
        setFormErrors({ ...formErrors, response: "Invalid login or password" });
      }
    }
  };

  return (
    <>
      <p>{formErrors.response}</p>
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
    </>
  );
}

export default SignInForm;
