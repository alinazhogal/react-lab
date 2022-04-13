export interface AuthFields {
  login?: string;
  password: string;
  confirmPassword?: string;
  response?: string;
}

export interface ProfileFields {
  username: string;
  description: string;
  phone: string;
  address: string;
}

export function checkEmpty(value: string) {
  if (!value) {
    return "Field is required";
  }
  return "";
}

export function validateLogin(value: string) {
  const loginRegex = "^[a-z0-9]{4,12}$";
  if (!value.match(loginRegex)) {
    return "Login should be 4 -12 characters and shouldn't include special characters";
  }
  return "";
}

export function validatePassword(value: string) {
  const passwordRegex = "^(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,20}$";
  if (!value.match(passwordRegex)) {
    return "Password should be 6-20 characters and should include at least 1 capital and 1 lowercase letter and 1 number";
  }
  return "";
}

export function validateConfirmPassword(value: string, passwordValue: string | undefined) {
  if (value !== passwordValue) {
    return "Passwords don't match";
  }
  return "";
}

export function validateAuth(fieldName: string, value: string, formErrors: AuthFields, passwordValue?: string) {
  const errors = { ...formErrors };
  switch (fieldName) {
    case "login":
      errors.login = checkEmpty(value) || validateLogin(value);
      break;
    case "password":
      errors.password = checkEmpty(value) || validatePassword(value);
      break;
    case "confirmPassword":
      errors.confirmPassword = checkEmpty(value) || validateConfirmPassword(value, passwordValue);
      break;
    default:
      return errors;
  }
  return errors;
}

export function validateProfile(fieldName: string, value: string, formErrors: ProfileFields) {
  const errors = { ...formErrors };
  switch (fieldName) {
    case "username":
      errors.username = checkEmpty(value) || validateLogin(value);
      break;
    default:
      errors[fieldName as keyof ProfileFields] = checkEmpty(value);
  }
  return errors;
}
