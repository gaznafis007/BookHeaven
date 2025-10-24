import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  handlePurchase,
} from "../core/users.core.js";

const router = Router();

/**
 * Get all users
 */
router.get("/", async (_, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * Get user by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

/**
 * Create a new user
 */
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const u = newUser.toObject();
    delete (u as any).password;
    res.status(201).json(u);
  } catch (err: any) {
    if (err.name === "ZodError")
      return res.status(400).json({ error: err.errors });
    res.status(400).json({ error: err.message || "Failed to create user" });
  }
});

/**
 * Process product purchase for a user
 * Updates credits, purchase history, and referral rewards
 */
router.patch("/:id/purchase", async (req, res) => {
  try {
    const productData = req.body;
    const result = await handlePurchase(req.params.id, productData);

    const userObj = result.user.toObject();
    delete (userObj as any).password;

    res.json({
      message: "Purchase processed successfully",
      credited: result.credited,
      user: userObj,
      ...(result.credited ? { referrer: result.referrer } : {}),
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Purchase failed" });
  }
});

export default router;
