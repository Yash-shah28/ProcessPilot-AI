import { Group } from "../models/group.model.js";
import { google } from "googleapis";
import { User } from "../models/user.model.js";

// Create Google Group under client's Workspace
export const createGroup = async (req, res) => {
  try {
    const { name, description, emails } = req.body;
    const user = await User.findById(req.userId);

    if (!user || !user.accessToken) {
      return res.status(401).json({ message: "Google not connected." });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.accessToken });

    const admin = google.admin({ version: "directory_v1", auth: oauth2Client });

    // The group's email MUST be under the client's Workspace domain
    const groupEmail = `${name.toLowerCase().replace(/\s+/g, "-")}@${user.email.split("@")[1]}`;

    // 1. Create Group
    const googleGroup = await admin.groups.insert({
      requestBody: {
        email: groupEmail,
        name,
        description,
      },
    });

    // 2. Add Members
    for (const email of emails) {
      await admin.members.insert({
        groupKey: groupEmail,
        requestBody: { email, role: "MEMBER" },
      });
    }

    // 3. Store in MongoDB
    const group = new Group({
      name,
      description,
      emails,
      createdBy: user._id,
      googleGroupId: googleGroup.data.id,
    });

    await group.save();

    res.status(201).json({ success: true, group });
  } catch (err) {
    console.error("Google Group creation error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to create group", error: err.message });
  }
};


// ✅ Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json({ success: true, groups });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single group by ID
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update group details
export const updateGroup = async (req, res) => {
  try {
    const { name, description, emails } = req.body;

    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { name, description, emails },
      { new: true, runValidators: true }
    );

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete group
export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json({ success: true, message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add member to group
export const addMember = async (req, res) => {
  try {
    const { email } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.emails.includes(email)) {
      return res.status(400).json({ message: "Email already exists in group" });
    }

    group.emails.push(email);
    await group.save();

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Remove member from group
export const removeMember = async (req, res) => {
  try {
    const { email } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) return res.status(404).json({ message: "Group not found" });

    group.emails = group.emails.filter((e) => e !== email);
    await group.save();

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
