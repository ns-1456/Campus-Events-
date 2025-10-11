"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "student" | "organizer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (role: UserRole, name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("campus-events-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("campus-events-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole, name: string, email: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem("campus-events-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campus-events-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Safe hook that returns null if not in provider
export function useAuthSafe() {
  const context = useContext(AuthContext);
  return context || { user: null, login: () => {}, logout: () => {}, isLoading: false };
}
