import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { logger } from "./utils/logger.js";
import { connectDB } from "./db/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api");
});

app.get("/api", (_req: Request, res: Response) => {
  const response = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Server is running!!!",
    version: "1.0.0",
  };
  res.json(response);
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  logger.success(`🚀 Server running at http://localhost:${port}/api`);
});
