import InputText from "@/elements/inputText";
import { AuthFields, validateAuth } from "@/helpers/validate";
import { RootState } from "@/redux";
import { changePassword } from "@/redux/actions/authActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChangePasswordForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFormValues] = useState<AuthFields>({ password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState<AuthFields>({ ...formValues });

  const isError = formErrors.password || formErrors.confirmPassword;

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors(validateAuth(e.target.name, e.target.value, formErrors, formValues.password));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      dispatch(changePassword({ login: user.username, password: formValues.password }));
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Password"
        id="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        errorMessage={formErrors.password}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <InputText
        label="Repeat password"
        id="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        errorMessage={formErrors.confirmPassword}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default ChangePasswordForm;
