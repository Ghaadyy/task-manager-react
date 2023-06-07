import { createContext } from "react";

export type UserContextType = {
  username: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
