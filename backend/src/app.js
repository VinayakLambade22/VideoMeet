import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";
import unsplashRoutes from "./routes/unsplash.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const allowedOrigins = [process.env.LOCAL_ORIGIN, process.env.PROD_ORIGIN];
const io = connectToSocket(server, allowedOrigins);

app.set("port", process.env.PORT || 8000);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: This origin (${origin}) is not allowed`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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
