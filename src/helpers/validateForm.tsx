export default function validate(fieldName: string, value: string, passwordValue = "") {
  const errors = { login: "", password: "", confirmPassword: "" };
  const passwordRegex = "^(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,20}$";
  const loginRegex = "^[a-z0-9]{4,16}$";
  // eslint-disable-next-line default-case
  switch (fieldName) {
    case "login":
      if (!value) {
        errors.login = "Field is required";
      } else if (!value.match(loginRegex)) {
        errors.login = "Login should be 4 -16 characters and shouldn't include special characters";
      } else errors.login = "";
      break;

    case "password":
      if (!value) {
        errors.password = "Field is required";
      } else if (!value.match(passwordRegex)) {
        errors.password =
          "Password should be 6-20 characters and should include at least 1 capital and 1 lowercase letter and 1 number";
      } else errors.password = "";
      break;

    case "confirmPassword":
      if (!value) {
        errors.confirmPassword = "Field is required";
      } else if (value !== passwordValue) {
        errors.confirmPassword = "Passwords don't match";
      } else errors.confirmPassword = "";
  }

  return errors;
}
