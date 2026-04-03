import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Create (Admin only)
router.post("/", protect, authorizeRoles("admin"), createTransaction);

// 📥 Get (Admin + Analyst)
router.get("/", protect, authorizeRoles("admin", "analyst"), getTransactions);

// ✏️ Update (Admin only)
router.put("/:id", protect, authorizeRoles("admin"), updateTransaction);

// ❌ Delete (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteTransaction);

export default router;