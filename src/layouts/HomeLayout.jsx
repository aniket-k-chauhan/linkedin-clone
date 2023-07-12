import React from "react";

import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar";
import { CurrentUserProvider } from "../helpers/CurrentUserContext";

export default function HomeLayout() {
  return (
    <div>
      <CurrentUserProvider>
        <Topbar />
        <Home />
      </CurrentUserProvider>
    </div>
  );
}
