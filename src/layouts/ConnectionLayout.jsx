import React from "react";

import Connection from "../Pages/Connection";
import Topbar from "../components/common/Topbar";
import { CurrentUserProvider } from "../helpers/CurrentUserContext";

export default function ConnectionLayout() {
  return (
    <div>
      <CurrentUserProvider>
        <Topbar />
        <Connection />
      </CurrentUserProvider>
    </div>
  );
}
