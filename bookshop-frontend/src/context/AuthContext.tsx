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

  // Fetch all users
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

  // Save currentUser to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Load currentUser and fetch users on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    fetchUsers();
  }, [fetchUsers]);

  // Create new user (normal or referral)
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
      setCurrentUser(data); // auto login after signup
      return data;
    } catch (err: unknown) {
      console.error("Create user error:", err);
      handleError(err);
      return null;
    }
  };

  // Get user by ID
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

  // Purchase product
  const purchaseProduct = async (
    userId: string,
    product: Product
  ): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/${userId}/purchaserchase`, {
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

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
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
