import React from "react";
import { NavBar } from "../Navigation/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (message?: string) =>
  toast.error(message || "An error occured!");

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default RootLayout;
