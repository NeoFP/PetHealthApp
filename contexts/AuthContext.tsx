"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated, getUserData, removeAuthToken } from "@/lib/auth";

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, email: string, name?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUserData();
        if (userData?.email) {
          setIsLoggedIn(true);
          setUser({
            email: userData.email,
            name: userData.name || undefined,
          });
        } else {
          // Token exists but no user data, clear everything
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string, email: string, name?: string) => {
    // Token and user data are already stored by the login/signup functions
    setIsLoggedIn(true);
    setUser({ email, name });
  };

  const logout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
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
