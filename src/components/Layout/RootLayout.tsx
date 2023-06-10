import React, { useContext, useEffect } from "react";
import { NavBar } from "../Navigation/NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isExpired } from "react-jwt";
import UserContext from "../../store/user-context";

export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (message?: string) =>
  toast.error(message || "An error occured!");

const RootLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken && isExpired(storedToken)) {
      userCtx.logout();
      navigate("/");
    }
  }, [navigate, userCtx, storedToken, location]);

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
