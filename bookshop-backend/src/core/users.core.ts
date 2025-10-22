import bcrypt from "bcryptjs";
import { User } from "../db/schema/users.schema.js";
import { userValidator } from "../validator/users.validator.js";

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (data: any) => {
  const parsed = userValidator.parse(data);
  const { name, email, password } = parsed;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const referralCode = Math.random().toString(36).substring(2, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    referralCode,
  });

  return newUser;
};
