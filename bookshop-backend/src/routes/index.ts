import { Router } from "express";
import usersRoute from "./users.route.js";

const router = Router();

router.use("/users", usersRoute);

export default router;
