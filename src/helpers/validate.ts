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

export interface EditErrors {
  name: string;
  image: string;
  price: string;
  genre: string;
  description: string;
  platforms: string;
}

export function checkEmpty(value: string) {
  if (!value.trim()) {
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

export function validatePrice(value: string) {
  const priceRegex = /^\d+(\.\d{1,2})?$/gm;
  if (!priceRegex.test(value)) {
    return "Incorrect price";
  }
  return "";
}

export function validateImage(value: string) {
  const imageRegex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
  if (!imageRegex.test(value)) {
    return "Incorrect image url";
  }
  return "";
}

export function validateEdit(fieldName: string, value: string, formErrors: EditErrors) {
  const errors = { ...formErrors };
  switch (fieldName) {
    case "price":
      errors.price = checkEmpty(value) || validatePrice(value);
      break;
    case "image":
      errors.image = checkEmpty(value) || validateImage(value);
      break;
    default:
      errors[fieldName as keyof EditErrors] = checkEmpty(value);
  }
  return errors;
}
