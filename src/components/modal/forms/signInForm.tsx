import { useState } from "react";
import InputText from "@/elements/inputText";
import debounce from "@/helpers/debounce";
import { validate, Fields } from "@/helpers/validate";
import { signIn } from "@/api/users";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";

function SignInForm({ onClose, logIn }: { onClose: () => void; logIn: (arg0: string) => void }) {
  const [formValues, setFormValues] = useState<Fields>({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues, response: "" });

  const isError = formErrors.login || formErrors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value, formErrors)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      const { isAuth, userName } = await signIn(formValues);
      if (isAuth) {
        onClose();
        logIn(userName);
        saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, userName }));
      } else {
        setFormErrors({ ...formErrors, response: "Invalid login or password" });
      }
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
        />
        <InputText
          label="Password"
          id="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
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
