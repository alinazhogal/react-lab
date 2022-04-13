import InputText from "@/elements/inputText";
import { RootState } from "@/redux";
import { changePassword } from "@/redux/actions/authActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChangePasswordForm({ onClose }: { onClose: () => void }) {
  const [formValues, setFormValues] = useState({ password: "", repeatPassword: "" });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changePassword({ login: user.username, password: formValues.password }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText label="Password" id="password" type="password" value={formValues.password} onChange={handleChange} />
      <InputText
        label="Repeat password"
        id="repeatPassword"
        type="password"
        value={formValues.repeatPassword}
        onChange={handleChange}
      />
      <button type="submit" className="button-el">
        Submit
      </button>
    </form>
  );
}

export default ChangePasswordForm;
