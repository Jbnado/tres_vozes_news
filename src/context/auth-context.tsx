import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
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
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!token;

  useEffect(() => {
    async function fetchUser(id: string) {
      getUser(id).then((data) => {
        if (data) {
          setUser(data as UserModel);
        }
      });
    }

    if (token && !user) {
      const payload = jose.decodeJwt(token) as { id: string };
      fetchUser(payload.id);
    }
  }, [user, token]);

  async function signIn({ email, password }: SignInData) {
    const res = await login(email, password);
    if (res) {
      const { user, token } = res;
      localStorage.setItem("token", token);
      instance.defaults.headers["Authorization"] = token;
      setToken(token);
      setUser(user);
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    }
  }

  async function signOut() {
    console.log("signOut");
    setToken(null);
    setUser(null);
    await logout();
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
