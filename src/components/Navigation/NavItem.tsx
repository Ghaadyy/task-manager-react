import { NavLink } from "react-router-dom";

type Props = { name: string; link: string };

export const NavItem: React.FC<Props> = ({ name, link }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `text-xl ${isActive ? "text-white font-bold" : "text-blue-100 "}`
      }
      to={link}
    >
      {name}
    </NavLink>
  );
};
