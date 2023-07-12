import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";

export default function ProfileEdit({ onEdit }) {
  const { userId, ...currentUser } = useCurrentUser();
  const [editInputs, setEditInputs] = useState(currentUser);

  const getInputs = (event) => {
    const { name, value } = event.target;

    setEditInputs({
      ...editInputs,
      [name]: value,
    });
  };

  const updateProfileData = async () => {
    await editProfile(userId, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="close-btn">
        <button onClick={onEdit}>
          <AiOutlineClose className="close-icon" />
        </button>
      </div>

      <div className="profile-edit-form">
        <label htmlFor="name">Name</label>
        <input
          className="edit-common-input"
          placeholder="Name"
          id="name"
          name="name"
          onChange={getInputs}
          value={editInputs.name}
        />
        <label htmlFor="headline">Headline</label>
        <input
          className="edit-common-input"
          placeholder="Headline"
          id="headline"
          name="headline"
          onChange={getInputs}
          value={editInputs.headline}
        />
        <label htmlFor="country">Country</label>
        <input
          className="edit-common-input"
          placeholder="Country"
          id="country"
          name="country"
          onChange={getInputs}
          value={editInputs.country}
        />
        <label htmlFor="city">City</label>
        <input
          className="edit-common-input"
          placeholder="City"
          id="city"
          name="city"
          onChange={getInputs}
          value={editInputs.city}
        />
        <label htmlFor="company">Company</label>
        <input
          className="edit-common-input"
          placeholder="Company"
          id="company"
          name="company"
          onChange={getInputs}
          value={editInputs.company}
        />
        <label htmlFor="industry">Industry</label>
        <input
          className="edit-common-input"
          placeholder="Industry"
          id="industry"
          name="industry"
          onChange={getInputs}
          value={editInputs.industry}
        />
        <label htmlFor="college">College</label>
        <input
          className="edit-common-input"
          placeholder="College"
          id="college"
          name="college"
          onChange={getInputs}
          value={editInputs.college}
        />
        <label htmlFor="website">Website</label>
        <input
          className="edit-common-input"
          placeholder="Website"
          id="website"
          name="website"
          onChange={getInputs}
          value={editInputs.website}
        />
        <label htmlFor="about">About</label>
        <textarea
          rows={3}
          className="edit-common-teaxtarea"
          placeholder="About Yourself"
          id="about"
          name="about"
          onChange={getInputs}
          value={editInputs.about}
        />
        <label htmlFor="skills">Skills</label>
        <input
          className="edit-common-input"
          placeholder="skills"
          id="skills"
          name="skills"
          onChange={getInputs}
          value={editInputs.skills}
        />
      </div>

      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}
