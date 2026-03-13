import express from "express";
import {
    signup,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    editProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); // ← THIS LINE WAS MISSING

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/edit-profile", protect, editProfile);

export default router;