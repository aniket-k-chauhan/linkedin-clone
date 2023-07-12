import { useEffect, useState } from "react";
import "./index.scss";
import {
  acceptConnectionRequest,
  getUserbyMail,
} from "../../../api/FirestoreAPI";
import { getCurrentUserImage } from "../../../helpers/getCurrentUserImage";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";

export default function ConnectionRequestCard({ user }) {
  const currentUser = useCurrentUser();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserbyMail(setUserInfo, user.requestEmail);
  }, []);

  const handleRequestAccept = () => {
    acceptConnectionRequest(currentUser, userInfo);
  };

  return (
    <div className="connection-request-card-container">
      <div className="connection-request-card-info">
        <img
          className="connection-request-card-img"
          src={getCurrentUserImage(userInfo)}
          alt="profile-image"
        />
        <div className="trucket-text-wrapper">
          <p className="user-name">{userInfo.name}</p>
          <p className="user-headline">{userInfo.headline}</p>
        </div>
      </div>
      <div className="connection-request-card-btn">
        {/* <button className="connection-request-ignore-btn">Ignore</button> */}
        <button
          className="connection-request-accept-btn"
          onClick={handleRequestAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
