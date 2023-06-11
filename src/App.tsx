import { Navigate, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./store/user-context";
import { createRouter } from "./routers/mainRouter";

const App: React.FC = () => {
  const userCtx = useContext(UserContext);

  const protectRoute = (child: React.ReactNode): React.ReactNode => {
    return userCtx.isLoggedIn ? child : <Navigate to="/login" />;
  };

  const router = createRouter(protectRoute);

  return <RouterProvider router={router} />;
};

export default App;
