"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL = "https://bookshop-backend-api.vercel.app/api/users";

// --- TYPES --- //
export interface Product {
  productId: string;
  title: string;
  description: string;
  author: string;
  price: number;
  purchasedAt?: string;
}

export interface ReferredUser {
  userId: string;
  status: string;
  createdAt: string;
  convertedAt?: string | null;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  referralCode: string;
  referredBy: string | null;
  credits: number;
  referredUsers: ReferredUser[];
  products: Product[];
  createdAt: string;
}

// Context type
interface AuthContextType {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;

  // API actions
  fetchUsers: () => Promise<void>;
  createUser: (
    name: string,
    email: string,
    password: string,
    referredBy?: string
  ) => Promise<User | null>;
  getUserById: (id: string) => Promise<User | null>;
  purchaseProduct: (userId: string, product: Product) => Promise<User | null>;

  // Helpers
  setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER --- //
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      const data = await res.json();
      setUsers((prev) => [...prev, data]);
      return data;
    } catch (err: any) {
      console.error("Create user error:", err);
      setError(err.message);
      return null;
    }
  };

  // Get user by ID
  const getUserById = async (id: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message);
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
      const data = await res.json();
      const updatedUser = data.user;

      // Update users list
      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      // If this user is the current logged-in user, update it too
      if (currentUser && currentUser._id === updatedUser._id)
        setCurrentUser(updatedUser);

      return updatedUser;
    } catch (err: any) {
      console.error("Purchase error:", err);
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AuthContext.Provider
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- HOOK --- //
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
