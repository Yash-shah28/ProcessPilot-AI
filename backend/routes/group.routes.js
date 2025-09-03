import express from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMember,
  removeMember,
} from "../controllers/group.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

// Groups CRUD
router.post("/",verifyToken, createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

// Manage members
router.post("/:id/add-member", addMember);
router.post("/:id/remove-member", removeMember);

export default router;
