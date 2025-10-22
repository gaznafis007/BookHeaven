import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  purchasedBy: {
    userId: string;
    name: string;
    email: string;
  }[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  purchasedBy: {
    type: [
      {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
