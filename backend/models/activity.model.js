// models/activity.model.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    workflowId: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" },
    type: { type: String, enum: ["execution", "created", "updated", "paused"] },
    status: { type: String, enum: ["success", "failed", "pending"] },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
