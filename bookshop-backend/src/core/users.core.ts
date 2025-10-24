import bcrypt from "bcryptjs";
import { User, IUser } from "../db/schema/users.schema.js";
import { userValidator } from "../validator/users.validator.js";
import { Types } from "mongoose";
import { Product } from "../db/schema/products.schema.js";

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await User.findById(id);
};

export const createUser = async (data: any) => {
  const parsed = userValidator.parse(data);
  const { name, email, password, referredBy } = parsed;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const referralCode = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    referralCode,
    referredBy: referredBy ? String(referredBy).toUpperCase() : null,
    credits: 50,
  });

  if (referredBy) {
    const refCode = String(referredBy).toUpperCase();
    const referrer = await User.findOne({ referralCode: refCode });
    if (referrer) {
      const already = referrer.referredUsers.find(
        (r: any) => String(r.userId) === String(newUser._id)
      );
      if (!already) {
        referrer.referredUsers.push({
          userId: String(newUser._id),
          status: "pending",
          createdAt: new Date(),
          convertedAt: null,
        });
        await referrer.save();
      }
    }
  }

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const u = user.toObject();
  delete (u as any).password;
  return u;
};

export const handlePurchase = async (userId: string, productData: any) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const { productId, title, description, author, price } = productData;
  const productPrice = Number(price);

  const alreadyPurchased = user.products.some((p) => p.productId === productId);
  if (alreadyPurchased) return { user, credited: false };

  if (user.credits < productPrice) {
    throw new Error("Insufficient credits to purchase this product");
  }

  user.credits -= productPrice;
  user.products.push({
    productId,
    title,
    description,
    author,
    price: productPrice,
    purchasedAt: new Date(),
  });

  let credited = false;
  let referrer: IUser | null = null;

  if (user.referredBy && user.products.length === 1) {
    credited = true;
    user.credits += 2;

    referrer = await User.findOne({ referralCode: user.referredBy });
    if (referrer) {
      referrer.credits += 2;

      const referredUser = referrer.referredUsers.find(
        (u: any) => u.userId === userId
      );

      if (referredUser) {
        referredUser.status = "converted";
        referredUser.convertedAt = new Date();
      }

      await referrer.save();
    }
  }

  await user.save();

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const alreadyInProduct = product.purchasedBy.some((p) => p.userId === userId);
  if (!alreadyInProduct) {
    product.purchasedBy.push({ userId, name: user.name, email: user.email });
    await product.save();
  }

  return { user, credited, referrer };
};
