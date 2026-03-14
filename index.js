import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// connect DB
connectDB();

app.use(cors({
    origin: "https://melotix-fullstack-music-player.netlify.app",
    credentials: true,
}));

app.use("/api/songs", songRouter);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));