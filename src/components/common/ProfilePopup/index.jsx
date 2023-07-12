import React from "react";
import { useNavigate } from "react-router-dom";

import { onLogout } from "../../../api/AuthAPI";

import "./index.scss";
import Button from "../Button";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const currentUser = useCurrentUser();

  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", { state: { email: currentUser.email } })
        }
      />
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
