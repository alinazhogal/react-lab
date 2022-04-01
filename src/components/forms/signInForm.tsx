import { useState } from "react";
import InputText from "@/elements/inputText";
import Button from "@/elements/button";
import debounce from "@/helpers/debounce";
import validate from "@/helpers/validateForm";

function SignInForm() {
  const [formValues, setFromValues] = useState({ login: "", password: "" });
  const [formErrors, setFormErrors] = useState({ ...formValues });

  // const validate = (fieldName: string, value: string) => {
  //   const errors = { ...formErrors };
  //   const passwordRegex = "^(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,20}$";
  //   const loginRegex = "^[a-z0-9]{4,16}$";
  //   // eslint-disable-next-line default-case
  //   switch (fieldName) {
  //     case "login":
  //       if (!value) {
  //         errors.login = "Field is required";
  //       } else if (!value.match(loginRegex)) {
  //         errors.login = "Login should be 4 -16 characters and shouldn't include special characters";
  //       } else errors.login = "";
  //       break;

  //     case "password":
  //       if (!value) {
  //         errors.login = "Field is required";
  //       } else if (!value.match(passwordRegex)) {
  //         errors.password =
  //           "Password should be 6-20 characters and should include at least 1 capital and 1 lowercase letter and 1 number";
  //       } else errors.password = "";
  //       break;
  //   }

  //   setFormErrors(errors);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
    debounce(() => setFormErrors(validate(e.target.name, e.target.value)));
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
      <Button title="Submit" onClick={() => console.log(formValues)} />
    </form>
  );
}

export default SignInForm;
