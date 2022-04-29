import Button from "@/elements/button";
import Input from "@/elements/input";
import { ProfileFields, validateProfile } from "@/helpers/validate";
import { RootState } from "@/redux";
import { getProfileInfo, saveProfileInfo } from "@/redux/actions/authActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordForm from "./modal/forms/changePassword";
import Modal from "./modal/modal";
import "./profile.scss";

function Profile() {
  const user = useSelector((state: RootState) => state.auth);
  const [formValues, setFormValues] = useState({ ...user });
  const [formErrors, setFormErrors] = useState<ProfileFields>({
    username: "",
    address: "",
    phone: "",
    description: "",
  });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const isError = formErrors.username || formErrors.address || formErrors.phone || formErrors.description;

  useEffect(() => {
    dispatch(getProfileInfo(user.username));
  }, []);

  useEffect(() => {
    setFormValues({ ...user });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues({ ...updatedValues });
    if (
      updatedValues.username === user.username &&
      updatedValues.address === user.address &&
      updatedValues.phone === user.phone &&
      updatedValues.description === user.description
    ) {
      setDisabled(true);
    } else setDisabled(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormErrors(validateProfile(e.target.name, e.target.value, formErrors));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const { files } = e.target;
    if (files) {
      reader.onloadend = () => {
        const updatedValues = { ...formValues, photo: reader.result as string };
        setFormValues({ ...updatedValues });
        if (updatedValues.photo === user.photo) {
          setDisabled(true);
        } else setDisabled(false);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isError) {
      const isNewLogin =
        user.username !== formValues.username
          ? { login: user.username, newLogin: formValues.username }
          : { login: user.username };
      dispatch(saveProfileInfo({ ...formValues, ...isNewLogin }));
      setDisabled(true);
    }
  };

  return (
    <section>
      <div className="section-content">
        <h2>Profile page</h2>
        <div className="profile-content">
          <div className="side-info">
            <div className="picture">
              {formValues.photo ? <img src={formValues.photo} alt="profile avatar" /> : <h4>No picture</h4>}
            </div>
            <div className="file-container" role="button">
              <label htmlFor="file" className="file-button">
                Change photo
                <input type="file" name="file" id="file" accept="image/*" onChange={onUpload} />
              </label>
            </div>

            <Button title="Change password" onClick={() => setModalOpen(true)} />
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Change password">
              <ChangePasswordForm onClose={() => setModalOpen(false)} />
            </Modal>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              type="text"
              value={formValues.username}
              onChange={handleChange}
              errorMessage={formErrors.username}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <Input
              label="Phone"
              id="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange}
              errorMessage={formErrors.phone}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <Input
              label="Address"
              id="address"
              type="text"
              value={formValues.address}
              onChange={handleChange}
              errorMessage={formErrors.address}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <div className="input-div">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="desc">Profile description</label>
              <textarea
                id="desc"
                name="description"
                onChange={handleChange}
                value={formValues.description}
                onBlur={handleBlur}
                onFocus={handleFocus}
                required
              />
              <span>{formErrors.description}</span>
            </div>
            <button type="submit" className={disabled ? "button-el disabled" : "button-el"} disabled={disabled}>
              Save changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Profile;
