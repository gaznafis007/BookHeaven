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

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles errors in async functions
   */
  const handleError = (err: unknown) => {
    if (err instanceof Error) setError(err.message);
    else setError(String(err));
  };

  /**
   * Fetch all users from backend
   */
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

  /**
   * Load currentUser and token from cookies on mount
   */
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

  /**
   * Save currentUser to cookie whenever it changes
   */
  useEffect(() => {
    if (currentUser) {
      Cookies.set("currentUser", JSON.stringify(currentUser), { expires: 1 });
      Cookies.set("token", "true", { expires: 1 });
    } else {
      Cookies.remove("currentUser");
      Cookies.remove("token");
    }
  }, [currentUser]);

  /**
   * Create a new user and auto-login
   */
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

  /**
   * Get a user by their ID
   */
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

  /**
   * Purchase a product for the current user
   */
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

      // Update users list
      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      // Update currentUser if it's the same
      if (currentUser && currentUser._id === updatedUser._id)
        setCurrentUser(updatedUser);

      return updatedUser;
    } catch (err: unknown) {
      console.error("Purchase error:", err);
      handleError(err);
      return null;
    }
  };

  /**
   * Logout the user
   */
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

/**
 * Custom hook to use UserContext
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
