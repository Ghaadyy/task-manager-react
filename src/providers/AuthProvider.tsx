import React, { useState } from "react";
import UserContext, { UserContextType } from "../store/user-context";
import { isExpired } from "react-jwt";
import { User } from "../models/User";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const isValidToken = storedToken ? !isExpired(storedToken) : false;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isValidToken);
  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<User | null>(
    storedUser && JSON.parse(storedUser)
  );

  const defaultState: UserContextType = {
    isLoggedIn,
    token,
    user,
    login(userToken, loggedInUser) {
      setToken(userToken);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", userToken);
    },
    logout() {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  };

  return (
    <UserContext.Provider value={defaultState}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
