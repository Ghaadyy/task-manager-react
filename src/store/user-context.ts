import { createContext } from "react";
import { User } from "../models/User";

export type UserContextType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default UserContext;
