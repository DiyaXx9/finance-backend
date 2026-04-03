import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 👤 Get Profile (Protected)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// 🔥 Admin only route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;