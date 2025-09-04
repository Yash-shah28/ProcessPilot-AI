import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { inngest } from '../inngest/client.js'

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		if (!email || !password || !name) {
			throw new Error("All Fields are required")
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		await inngest.send({
			name: "user/signup",
			data: {
				email,
			},
		});

		// jwt
		generateTokenAndSetCookie(res, user._id, user.role);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id, user.role);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email createdAt lastLogin role");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    console.log("Error in getProfile", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ success: false, message: "Nothing to update" });
    }

    // Check if email is being updated and already exists
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: { ...(name && { name }), ...(email && { email }) } },
      { new: true, runValidators: true }
    ).select("name email createdAt lastLogin role");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateProfile", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Check role
    if (req.userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    // Fetch all users
    const users = await User.find({role: "user"}).select("-password"); // remove password field

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
	  try {
	const { id } = req.params;
	// Check role
	console.log(id)
	if (req.userRole !== "admin") {
	  return res.status(403).json({ success: false, message: "Access denied. Admins only." });
	}

	// Prevent admin from deleting themselves
	if (req.userId === id) {
	  return res.status(400).json({ success: false, message: "Admins cannot delete themselves." });
	}

	const user = await User.findById(id);
	if (!user) {
	  return res.status(404).json({ success: false, message: "User not found" });
	}

	await User.findByIdAndDelete(id);
	res.status(200).json({ success: true, message: "User deleted successfully" });
	  } catch (error) {
	console.error("Error deleting user:", error);
	res.status(500).json({ success: false, message: "Failed to delete user" });
	  }
}