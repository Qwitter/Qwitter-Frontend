import { User } from "@/models/User";
import { createContext, useEffect, useState } from "react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  token: string | null;
  saveUser: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  token: null,
  saveUser: () => {},
  logout: () => {},
  setUser: () => {},
  setToken: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveUser = (user: User, token: string) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, token, setUser, setToken, saveUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
