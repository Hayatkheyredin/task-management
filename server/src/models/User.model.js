import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, index: true },
		passwordHash: { type: String, required: true },
		avatarUrl: { type: String },
		settings: {
			notificationsEnabled: { type: Boolean, default: true },
			theme: { type: String, default: "light" },
		},
	},
	{ timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model("User", UserSchema);


