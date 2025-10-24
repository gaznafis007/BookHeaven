"use client";

import { UserContextType, Product, User } from "@/types/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie"; // npm install js-cookie

const API_URL = "https://bookshop-backend-api.vercel.app/api/users";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) setError(err.message);
    else setError(String(err));
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = Cookies.get("currentUser");
    if (token && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [fetchUsers]);

  useEffect(() => {
    if (currentUser) {
      Cookies.set("currentUser", JSON.stringify(currentUser), { expires: 1 });
      Cookies.set("token", "true", { expires: 1 });
    } else {
      Cookies.remove("currentUser");
      Cookies.remove("token");
    }
  }, [currentUser]);

  /** Create new user (signup) */
  const createUser = async (
    name: string,
    email: string,
    password: string,
    referredBy?: string
  ): Promise<User | null> => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referredBy }),
      });

      if (!res.ok) throw new Error("Failed to create user");
      const data: User = await res.json();
      setUsers((prev) => [...prev, data]);
      setCurrentUser(data); // auto-login
      return data;
    } catch (err: unknown) {
      console.error("Create user error:", err);
      handleError(err);
      return null;
    }
  };

  /** Login user */
  const loginUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      setCurrentUser(data);
      return data;
    } catch (err: unknown) {
      handleError(err);
      return null;
    }
  };

  /** Get a user by ID */
  const getUserById = async (id: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("User not found");
      const data: User = await res.json();
      return data;
    } catch (err: unknown) {
      handleError(err);
      return null;
    }
  };

  /** Purchase product */
  const purchaseProduct = async (
    userId: string,
    product: Product
  ): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/${userId}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to process purchase");
      const data: { user: User } = await res.json();
      const updatedUser = data.user;

      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
      if (currentUser && currentUser._id === updatedUser._id)
        setCurrentUser(updatedUser);

      return updatedUser;
    } catch (err: unknown) {
      console.error("Purchase error:", err);
      handleError(err);
      return null;
    }
  };

  /** Logout */
  const logout = () => {
    setCurrentUser(null);
    Cookies.remove("token");
    Cookies.remove("currentUser");
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loading,
        error,
        fetchUsers,
        createUser,
        loginUser,
        getUserById,
        purchaseProduct,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
