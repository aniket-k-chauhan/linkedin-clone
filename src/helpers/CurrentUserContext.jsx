import { createContext, useContext, useMemo, useState } from "react";

import { getCurrentUser } from "../api/FirestoreAPI";

const CurrentUserContext = createContext();

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
