/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as jose from "jose";
import { UserModel } from "@/models";
import { getUser, instance, login, logout } from "@/api";

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserModel | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  async function fetchUser(id: string) {
    getUser(id).then((data) => {
      if (data) setUser(data as UserModel);
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = jose.decodeJwt(token) as { id: string };

      fetchUser(payload.id);
    } else {
      navigate("/login");
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const res = await login(email, password);
    if (res) {
      const { user, token } = res;
      localStorage.setItem("token", token);
      instance.defaults.headers["Authorization"] = token;
      setUser(user);
      navigate("/");
    }
  }

  async function signOut() {
    localStorage.removeItem("token");
    setUser(null);
    await logout();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
