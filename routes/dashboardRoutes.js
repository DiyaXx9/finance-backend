import express from "express";
import {
  getDashboard,
  getCategoryStats,
  getMonthlyStats,
} from "../controllers/dashboardController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📊 Dashboard summary
router.get("/", protect, authorizeRoles("admin", "analyst"), getDashboard);

// 📊 Category stats
router.get("/categories", protect, authorizeRoles("admin", "analyst"), getCategoryStats);

// 📊 Monthly stats
router.get("/monthly", protect, authorizeRoles("admin", "analyst"), getMonthlyStats);

export default router;