import React, { useState } from "react";
import UserContext, { User, UserContextType } from "../store/user-context";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const defaultState: UserContextType = {
    isLoggedIn,
    token,
    user,
    login(userToken, loggedInUser) {
      setToken(userToken);
      setUser(loggedInUser);
      setIsLoggedIn(true);
    },
    logout() {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    },
  };

  return (
    <UserContext.Provider value={defaultState}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
