import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <h1>Home</h1> },
      {
        path: "auth",
        element: <LoginPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
      {
        path: "create-task",
        element: <CreateTaskPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
