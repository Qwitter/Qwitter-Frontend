import { User } from "@/models/User";
import { createContext, useState } from "react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  token: string | null;
  saveUser: (user: User, token: string) => void;
  logout: () => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  token: null,
  saveUser: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveUser = (user: User, token: string) => {
    setUser(user);
    setToken(token);
  }

  const logout = () => {
    setUser(null);
    setToken(null);
  }

  return (
    <UserContext.Provider value={{ user, token, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
