import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
		},
		refreshToken: {
			type: String,
		},
		tokenExpiry: {
			type: Date,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		}
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
