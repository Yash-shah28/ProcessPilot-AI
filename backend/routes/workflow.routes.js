import express from "express";

import { getWorkflows, createWorkflow, updateWorkflow, deleteWorkflow,getWorkflowById,getUserProfile, getUserActivity, getAllWorkflows, getTotalProfile } from "../controllers/workflow.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken, getWorkflows);
router.get("/all",verifyToken, getAllWorkflows);
router.get("/profile", verifyToken, getUserProfile);
router.get("/totalprofile", verifyToken, getTotalProfile);
router.get("/activity", verifyToken, getUserActivity);
router.get("/:id",verifyToken, getWorkflowById);
router.post("/",verifyToken, createWorkflow);
router.put("/:id",verifyToken, updateWorkflow);
router.delete("/:id",verifyToken, deleteWorkflow);


export default router;
