'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type User = {
    _id:string;
    email:string;
}

type UserContextType = {
    user : User | undefined;
    setUser:  React.Dispatch<React.SetStateAction<User | undefined>>;
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }:{children: ReactNode}) => {
  const [user, setUser] = useState<User>();
  const [login, setLogin] = useState<boolean>(false);
  
  useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch("/api/auth/user");
                const data = await res.json();

                if (res.ok && data.message) {
                    setUser(data.message);
                    setLogin(true);
                } else {
                    setLogin(false);
                    setUser(undefined);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setLogin(false);
                setUser(undefined);
            }
        };

        checkUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};