import mongoose, { Schema, Document } from "mongoose";

/**
 * Product interface for Mongoose
 */
export interface IProduct extends Document {
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

/**
 * Mongoose schema for products
 */
const ProductSchema = new Schema<IProduct>(
  {
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
  },
  { versionKey: false }
);

/**
 * Product model
 */
export const Product = mongoose.model<IProduct>("Product", ProductSchema);
