export type AuthType = "login" | "signup";

export interface AuthFormProps {
  initialType?: AuthType;
}

export interface Product {
  productId: string;
  title: string;
  description: string;
  author: string;
  price: number;
  purchasedAt?: string;
  _id: string;
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

export interface UserContextType {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  createUser: (
    name: string,
    email: string,
    password: string,
    referredBy?: string
  ) => Promise<User | null>;
  loginUser: (email: string, password: string) => Promise<User | null>;
  getUserById: (id: string) => Promise<User | null>;
  purchaseProduct: (userId: string, product: Product) => Promise<User | null>;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}
