import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  referralCode: string;
  referredBy: string | null;
  referredUsers: {
    userId: string;
    status: "pending" | "converted";
    createdAt: Date;
    convertedAt: Date | null;
  }[];
  products: {
    productId: string;
    title: string;
    description: string;
    author: string;
    price: number;
    purchasedAt: Date;
  }[];
  credits: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: String, default: null },
    referredUsers: {
      type: [
        {
          userId: { type: String, required: true },
          status: {
            type: String,
            enum: ["pending", "converted"],
            required: true,
          },
          createdAt: { type: Date, required: true, default: Date.now },
          convertedAt: { type: Date, default: null },
        },
      ],
      default: [],
    },
    products: {
      type: [
        {
          productId: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          author: { type: String, required: true },
          price: { type: Number, required: true },
          purchasedAt: { type: Date, required: true, default: Date.now },
        },
      ],
      default: [],
    },
    credits: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const User = mongoose.model<IUser>("User", UserSchema);
