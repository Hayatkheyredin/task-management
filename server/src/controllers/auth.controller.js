import { User } from "../models/User.model.js";
import { signJwt } from "../middleware/auth.js";
import { validationResult } from "express-validator";

export async function signup(req, res) {
	try {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				message: "Validation failed", 
				errors: errors.array() 
			});
		}

		const { name, email, password } = req.body;
		
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ 
				message: "Email already in use",
				field: "email"
			});
		}
		
		// Create new user
		const user = new User({ name, email, password });
		await user.save();
		
		// Generate JWT token
		const token = signJwt(user._id);
		
		return res.status(201).json({ 
			message: "User created successfully",
			user: { 
				id: user._id, 
				name: user.name, 
				email: user.email,
				avatarUrl: user.avatarUrl,
				settings: user.settings
			}, 
			token 
		});
	} catch (error) {
		console.error("Signup error:", error);
		
		// Handle Mongoose validation errors
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => ({
				field: err.path,
				message: err.message
			}));
			return res.status(400).json({ 
				message: "Validation failed", 
				errors 
			});
		}
		
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function login(req, res) {
	try {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				message: "Validation failed", 
				errors: errors.array() 
			});
		}

		const { email, password } = req.body;
		
		// Find user and include password for comparison
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return res.status(401).json({ 
				message: "Invalid credentials",
				field: "email"
			});
		}
		
		// Compare password
		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ 
				message: "Invalid credentials",
				field: "password"
			});
		}
		
		// Generate JWT token
		const token = signJwt(user._id);
		
		return res.json({ 
			message: "Login successful",
			user: { 
				id: user._id, 
				name: user.name, 
				email: user.email,
				avatarUrl: user.avatarUrl,
				settings: user.settings
			}, 
			token 
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function logout(req, res) {
	try {
		// Since we're using JWT, logout is handled client-side by removing the token
		// We could implement a token blacklist here if needed for enhanced security
		return res.json({ message: "Logout successful" });
	} catch (error) {
		console.error("Logout error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function me(req, res) {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		
		return res.json({ 
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
				settings: user.settings,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		});
	} catch (error) {
		console.error("Me error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateProfile(req, res) {
	try {
		const { name, avatarUrl, settings } = req.body;
		
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		
		// Update user fields
		if (name !== undefined) user.name = name;
		if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
		if (settings !== undefined) user.settings = { ...user.settings, ...settings };
		
		await user.save();
		
		return res.json({ 
			message: "Profile updated successfully",
			user: { 
				id: user._id, 
				name: user.name, 
				email: user.email, 
				avatarUrl: user.avatarUrl, 
				settings: user.settings 
			} 
		});
	} catch (error) {
		console.error("Update profile error:", error);
		
		// Handle Mongoose validation errors
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => ({
				field: err.path,
				message: err.message
			}));
			return res.status(400).json({ 
				message: "Validation failed", 
				errors 
			});
		}
		
		return res.status(500).json({ message: "Internal server error" });
	}
}


