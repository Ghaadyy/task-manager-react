import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import SignUpPage from "./pages/SignUpPage";
import EditTaskPage from "./pages/EditTaskPage";
import { useContext } from "react";
import UserContext from "./store/user-context";

const App: React.FC = () => {
  const userCtx = useContext(UserContext);

  const protectRoute = (child: React.ReactNode): React.ReactNode => {
    return userCtx.isLoggedIn ? child : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: (
            <div className="w-full flex flex-col items-center justify-center h-52">
              <h1 className="font-bold text-2xl">Welcome to Task Manager!</h1>
            </div>
          ),
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignUpPage />,
        },
        {
          path: "tasks",
          element: protectRoute(<TasksPage />),
        },
        {
          path: "create-task",
          element: protectRoute(<CreateTaskPage />),
        },
        {
          path: "edit-task/:id",
          element: protectRoute(<EditTaskPage />),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
