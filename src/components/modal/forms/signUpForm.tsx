import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "@/elements/inputText";
import debounce from "@/helpers/debounce";
import { validate, Fields } from "@/helpers/validate";
import { signUp } from "@/api/users";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";

function SignUpForm({ onClose, logIn }: { onClose: () => void; logIn: (arg0: string) => void }) {
  const [formValues, setFormValues] = useState<Fields>({ login: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState<Fields>({ ...formValues });

  const navigate = useNavigate();
  const isError = formErrors.login || formErrors.password || formErrors.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value, formErrors, formValues.password)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      const { isAuth, userName } = await signUp(formValues);
      if (isAuth) {
        onClose();
        navigate("/profile");
        logIn(userName);
        saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, userName }));
      }
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
      />
      <InputText
        label="Password"
        id="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        errorMessage={formErrors.password}
      />
      <InputText
        label="Confirm password"
        id="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        errorMessage={formErrors.confirmPassword}
      />
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default SignUpForm;
