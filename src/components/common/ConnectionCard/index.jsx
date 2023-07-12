import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdPersonAddAlt } from "react-icons/md";

import {
  addConnectionRequest,
  getPendingConnectionRequestsToUser,
} from "../../../api/FirestoreAPI";
import { getCurrentUserImage } from "../../../helpers/getCurrentUserImage";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";

import "./index.scss";

export default function ConnectionCard({ user }) {
  const navigate = useNavigate();
  const [isRequestPending, setIsRequestPending] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser?.email) {
      getPendingConnectionRequestsToUser(
        currentUser.email,
        user.email,
        setIsRequestPending
      );
    }
  }, [currentUser.email]);

  const handleConnectBtnClick = () => {
    addConnectionRequest(currentUser, user);
  };

  const handleShowUserProfileClick = (user) => {
    navigate("/profile", { state: { email: user.email } });
  };

  return (
    <div className="connection-card">
      <div
        className="connection-card-info-wrapper"
        onClick={() => handleShowUserProfileClick(user)}
      >
        <img
          className="user-connection-card-img"
          src={getCurrentUserImage(user)}
          alt="profile-image"
        />
        <p className="user-name">{user.name}</p>
        <p className="user-headline">{user.headline}</p>
      </div>
      {isRequestPending ? (
        <button className="connection-pending">
          <AiOutlineClockCircle className="connect-btn-icon" />
          <span>Pending</span>
        </button>
      ) : (
        <button className="connect-btn" onClick={handleConnectBtnClick}>
          <MdPersonAddAlt className="connect-btn-icon" />
          <span>Connect</span>
        </button>
      )}
    </div>
  );
}
