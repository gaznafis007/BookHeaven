import { Router } from "express";
import usersRoute from "./users.route.js";
import productsRoute from "./products.route.js";
const router = Router();

router.use("/users", usersRoute);

router.use("/products", productsRoute);

export default router;
