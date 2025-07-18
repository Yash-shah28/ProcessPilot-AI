import {Workflow} from '../models/workflow.model.js';

export const createWorkflow = async (req, res) => {
    const { name, description, steps } = req.body;
    const userId = req.userId;
    try {
        if (!name || !steps) {
            return res.status(400).json({ success: false, message: "Name and steps are required" });
        }

        const preparedSteps = steps.map((step, index) => ({
            name: step.name,
            type: step.type,
            parameters: step.parameters
        }));

        const newWorkflow = new Workflow({
            userId: userId,
            name,
            description,
            steps: preparedSteps
        });

        const savedWorkflow = await newWorkflow.save();
        return res.status(201).json({ success: true, data: savedWorkflow });


    } catch (error) {
        console.error("Error creating workflow:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }

}

export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ workflows });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorkflowById = async (req, res) => {
    try {
    const { id } = req.params;
    const workflow = await Workflow.findOne({ _id: id, userId: req.userId });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found." });
    }

    res.status(200).json({ workflow });
  } catch (error) {
    console.error("Error fetching workflow:", error);
    res.status(500).json({ message: "Server error" });
  }

}


export const updateWorkflow = async (req, res) => { }

export const deleteWorkflow = async (req, res) => { }
