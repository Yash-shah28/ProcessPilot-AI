import express from "express";

import { getWorkflows, createWorkflow, updateWorkflow, deleteWorkflow,getWorkflowById } from "../controllers/workflow.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken, getWorkflows);
router.get("/:id",verifyToken, getWorkflowById);
router.post("/",verifyToken, createWorkflow);
router.put("/:id",verifyToken, updateWorkflow);
router.delete("/:id",verifyToken, deleteWorkflow);


export default router;
