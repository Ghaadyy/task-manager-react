import React, { useState } from "react";
import UserContext, { UserContextType } from "../store/user-context";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const defaultState: UserContextType = {
    isLoggedIn,
    username: null,
    login(email, password) {
      setIsLoggedIn(true);
    },
    logout() {
      setIsLoggedIn(false);
    },
  };

  return (
    <UserContext.Provider value={defaultState}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
