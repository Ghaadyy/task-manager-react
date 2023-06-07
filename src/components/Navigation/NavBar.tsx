import { useContext } from "react";
import { NavItem } from "./NavItem";
import UserContext from "../../store/user-context";
import { useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row gap-5 w-full justify-center items-center h-20 bg-blue-300">
      <NavItem name="Home" link="/" />
      {!userCtx?.isLoggedIn && <NavItem name="Login" link="/auth" />}
      {userCtx?.isLoggedIn && (
        <>
          <NavItem name="Tasks" link="/tasks" />
          <NavItem name="Create Task" link="/create-task" />
          <button
            type="button"
            onClick={() => {
              userCtx?.logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};
