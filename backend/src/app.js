import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
dotenv.config();

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";
import unsplashRoutes from "./routes/unsplash.routes.js";

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/unsplash", unsplashRoutes);
const start = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database: ${connectionDB.connection.name}`);

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
start();
