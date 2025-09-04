import { inngest } from '../inngest/client.js';
import { Workflow } from '../models/workflow.model.js';
import { Activity } from "../models/activity.model.js";


export const createWorkflow = async (req, res) => {
  const { description } = req.body;
  const userId = req.userId;
  try {
    if (!description) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    const newWorkflow = new Workflow({
      description,
      userId
    });

    const savedWorkflow = await newWorkflow.save();
    const workflowId = savedWorkflow._id;
    await inngest.send({
      name: "workflow/create",
      data: {
        workflowId,
      },
    });
    return res.status(201).json({ success: true, data: savedWorkflow, message: "Workflow created successfully" });


  } catch (error) {
    console.error("Error creating workflow:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ userId: req.userId }).sort({ createdAt: -1 }).populate('userId', 'name');
    res.status(200).json({ sucess: true, data: workflows });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorkflowById = async (req, res) => {
  try {
    const { id } = req.params;
    const workflow = await Workflow.findById(id).populate('userId', 'name');

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found." });
    }

    res.status(200).json({ workflow });
  } catch (error) {
    console.error("Error fetching workflow:", error);
    res.status(500).json({ message: "Server error" });
  }

};

export const updateWorkflow = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const workflow = await Workflow.findById(id).populate('userId', 'name');
    if (!workflow) {
      return res.status(404).json({ success: false, message: "Workflow not found" });
    }

    if (workflow.userId._id.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (description) {
      workflow.description = description;
      workflow.updatedAt = Date.now();
    }

    const updatedWorkflow = await workflow.save();
     await inngest.send({
      name: "workflow/create",
      data: {
        workflowId: id,
      },
    });
    return res.status(200).json({ success: true, data: updatedWorkflow, message: "Workflow updated successfully" });

  } catch (error) {
    console.error("Error updating workflow:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteWorkflow = async (req, res) => {

  const { id } = req.params;

  try {
    const workflow = await Workflow.findById(id);

    if (!workflow) {
      return res.status(404).json({ success: false, message: "Workflow not found" });
    }

    console.log(req.userRole)
    if (workflow.userId.toString() !== req.userId && req.userRole !== 'admin') {
  return res.status(403).json({ success: false, message: "Unauthorized" });
}


    await Workflow.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Workflow deleted successfully" });

  } catch (error) {
    console.error("Error deleting workflow:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const totalWorkflows = await Workflow.countDocuments({ userId });
    const activeWorkflows = await Workflow.countDocuments({ userId, status: "idle" });

    const workflows = await Workflow.find({ userId });
    const totalExecutions = workflows.reduce((sum, wf) => sum + wf.executionCount, 0);

    // Calculate weighted success rate
    const successLogs = await Activity.countDocuments({ userId, status: "success" });
    const totalLogs = await Activity.countDocuments({ userId });

    let successRate = 0;
    if (totalLogs > 0) {
      successRate = (successLogs / totalWorkflows) * 100;
    }

    const data = {
      totalWorkflows,
      activeWorkflows,
      totalExecutions,
      successRate: successRate.toFixed(1),
    }

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

export const getUserActivity = async (req, res) => {
  try {
    const userId = req.userId;
    const logs = await Activity.find({ userId }).sort({ timestamp: -1 }).limit(20).populate('workflowId');

    const formatted = logs.map((log) => ({
      id: log._id,
      workflowName: log.workflowId.name,
      workflowdescription: log.workflowId.description,
      type: log.type,
      status: log.status,
      timestamp: log.timestamp,
      details: log.details,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activity logs", error: err.message });
  }
};

export const getAllWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find().sort({ createdAt: -1 }).populate('userId', 'name');
    res.status(200).json({ sucess: true, data: workflows });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTotalProfile = async (req, res) => {
  try {

    const totalWorkflows = await Workflow.countDocuments();
    const activeWorkflows = await Workflow.countDocuments({ status: "idle" });

    const workflows = await Workflow.find();
    const totalExecutions = workflows.reduce((sum, wf) => sum + wf.executionCount, 0);

    // Calculate weighted success rate
    const successLogs = await Activity.countDocuments({  status: "success" });
    const totalLogs = await Activity.countDocuments();

    let successRate = 0;
    if (totalLogs > 0) {
      successRate = (successLogs / totalWorkflows) * 100;
    }

    const data = {
      totalWorkflows,
      activeWorkflows,
      totalExecutions,
      successRate: successRate.toFixed(1),
    }

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};