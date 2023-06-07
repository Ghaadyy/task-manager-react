import React from "react";
import AuthProvider from "./AuthProvider";

const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MainProvider;
