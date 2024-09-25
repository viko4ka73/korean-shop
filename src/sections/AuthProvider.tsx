import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с куки

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (userData: any) => {
    const token = userData?.access_token;
    if (!token) {
      console.error("Access token is missing in login data:", userData);
      return;
    }

    Cookies.set("access_token", token, { expires: 7, sameSite: "Lax" });

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
