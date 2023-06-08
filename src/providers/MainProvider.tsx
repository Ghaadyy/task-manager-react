import React from "react";
import AuthProvider from "./AuthProvider";
import TaskProvider from "./TaskProvider";

type Props = { children: React.ReactNode };

const MainProvider: React.FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  );
};

export default MainProvider;
