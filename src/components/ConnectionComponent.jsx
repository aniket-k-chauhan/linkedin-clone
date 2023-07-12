import React, { useEffect, useState } from "react";

import "../Sass/ConnectionComponent.scss";
import {
  getAllUsers,
  getConnectionRequestToUser,
  getConnectionsOfUser,
} from "../api/FirestoreAPI";
import ConnectionCard from "./common/ConnectionCard";
import { useCurrentUser } from "../helpers/CurrentUserContext";
import ConnectionRequestCard from "./common/ConnectionRequestCard";

export default function ConnectionComponent() {
  const [allUsers, setAllUsers] = useState([]);
  const [connectionRequestToUser, setConnectionRequestToUser] = useState([]);
  const [userConnections, setUserConnections] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      getConnectionRequestToUser(currentUser.email, setConnectionRequestToUser);
      getConnectionsOfUser(currentUser.email, setUserConnections);
    }
  }, [currentUser.email]);

  return (
    <div>
      <div className="connection-request-card-grid">
        {connectionRequestToUser.map((user) => (
          <ConnectionRequestCard key={user.requestEmail} user={user} />
        ))}
      </div>

      <div className="connection-card-cmp-grid">
        {allUsers.map((user) => {
          return currentUser.userId == user.id ||
            userConnections.includes(user.email) ||
            connectionRequestToUser.find(
              (reqUser) => reqUser.requestEmail === user.email
            ) ? null : (
            <ConnectionCard key={user.id} user={user} />
          );
        })}
      </div>
    </div>
  );
}
