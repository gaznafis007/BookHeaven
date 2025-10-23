import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  handlePurchase,
} from "../core/users.core.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

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
 * PATCH /api/users/:id/purchase
 * Handles purchase & referral credit in one call
 * Body: { productId, title, description?, author?, price }
 */
router.patch("/:id/purchase", async (req, res) => {
  try {
    const productData = req.body;

    // Call core function that handles user + product updates + referral
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
