import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLeadById,
  getLeadStats,
  updateLead,
  updateLeadStatus,
} from "../controller/lead.controller.js";

const leadRouter = express.Router();

leadRouter.post("/", protect, createLead);

leadRouter.get("/", protect, getAllLeads);

leadRouter.get("/stats", protect, getLeadStats);

leadRouter.get("/:id", protect, getLeadById);

leadRouter.put("/:id", protect, updateLead);

leadRouter.delete("/:id", protect, deleteLead);

leadRouter.patch("/:id/status", protect, updateLeadStatus);

export default leadRouter;