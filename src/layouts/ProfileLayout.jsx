import React from "react";

import Profile from "../Pages/Profile";
import Topbar from "../components/common/Topbar";
import { CurrentUserProvider } from "../helpers/CurrentUserContext";

export default function ProfileLayout() {
  return (
    <div>
      <CurrentUserProvider>
        <Topbar />
        <Profile />
      </CurrentUserProvider>
    </div>
  );
}
