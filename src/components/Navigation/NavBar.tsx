import { NavItem } from "./NavItem";

export const NavBar: React.FC = () => {
  return (
    <nav className="flex flex-row gap-5 w-full justify-center items-center h-20 bg-blue-300">
      <NavItem name="Home" link="/" />
      <NavItem name="Login" link="/auth" />
    </nav>
  );
};
