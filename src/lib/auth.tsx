"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface User { id: string; name: string; email: string; }
interface AuthCtx {
  user: User | null;
  token: string | null;
  loading: boolean;
  savedIds: string[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSaved: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("edunexus_token");
    const storedUser = localStorage.getItem("edunexus_user");
    if (stored && storedUser) {
      setToken(stored);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user && token) {
      refreshSaved();
    } else {
      setSavedIds([]);
    }
  }, [user, token]);

  const refreshSaved = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch(`${API_URL}/users/${user.id}/saved`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedIds(data.map((c: any) => c.id));
      }
    } catch (err) {
      console.error("Failed to refresh saved colleges", err);
    }
  };

  const persist = (t: string, u: User) => {
    setToken(t); setUser(u);
    localStorage.setItem("edunexus_token", t);
    localStorage.setItem("edunexus_user", JSON.stringify(u));
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    persist(data.token, data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    persist(data.token, data.user);
  };

  const logout = () => {
    setToken(null); setUser(null); setSavedIds([]);
    localStorage.removeItem("edunexus_token");
    localStorage.removeItem("edunexus_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, savedIds, login, register, logout, refreshSaved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
