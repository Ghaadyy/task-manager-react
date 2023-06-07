import React from "react";
import AuthProvider from "./AuthProvider";

type Props = { children: React.ReactNode };

const MainProvider: React.FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MainProvider;
