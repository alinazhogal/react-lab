import Button from "@/elements/button";
import InputText from "@/elements/inputText";
import { RootState } from "@/redux";
import { getProfileInfo, saveProfileInfo } from "@/redux/actions/authActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordForm from "./modal/forms/changePasswordForm";
import Modal from "./modal/modal";
import "./profile.scss";

function Profile() {
  const user = useSelector((state: RootState) => state.auth);
  const [formValues, setFormValues] = useState({ ...user });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileInfo(user.username));
    setFormValues({ ...user });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNewLogin =
      user.username !== formValues.username
        ? { login: user.username, newLogin: formValues.username }
        : { login: user.username };
    dispatch(saveProfileInfo({ ...formValues, ...isNewLogin }));
  };

  return (
    <section>
      <div className="section-content">
        <h2>Profile page</h2>
        <div className="profile-content">
          <div className="side-info">
            <div className="picture">
              <h4>No picture</h4>
            </div>
            <Button title="Change password" onClick={() => setModalOpen(true)} />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Change password">
              <ChangePasswordForm onClose={() => setModalOpen(false)} />
            </Modal>
          </div>
          <form onSubmit={handleSubmit}>
            <InputText label="Username" id="username" type="text" value={formValues.username} onChange={handleChange} />
            <InputText label="Phone" id="phone" type="tel" value={formValues.phone} onChange={handleChange} />
            <InputText label="Address" id="address" type="text" value={formValues.address} onChange={handleChange} />
            <div className="input-div">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
              <label htmlFor="desc">Profile description</label>
              <textarea id="desc" name="description" onChange={handleChange} value={formValues.description} />
            </div>
            <button type="submit" className="button-el">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Profile;
