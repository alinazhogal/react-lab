import Button from "@/elements/button";
import InputText from "@/elements/inputText";
import { useState } from "react";
import ChangePasswordForm from "./modal/forms/changePasswordForm";
import Modal from "./modal/modal";
import "./profile.scss";

function Profile() {
  const [formValues, setFormValues] = useState({ username: "", phone: "", address: "", description: "" });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
          <form>
            <InputText label="Username" id="username" type="text" value={formValues.username} onChange={handleChange} />
            <InputText label="Phone" id="phone" type="tel" value={formValues.phone} onChange={handleChange} />
            <InputText label="Address" id="address" type="text" value={formValues.address} onChange={handleChange} />
            <div className="input-div">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
              <label htmlFor="desc">Profile description</label>
              <textarea id="desc" name="description" onChange={handleChangeTextArea} value={formValues.description} />
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
