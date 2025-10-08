import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { signJwt } from "../middleware/auth.js";

export async function signup(req, res) {
	const { name, email, password } = req.body;
	if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
	
	try {
		const existing = await User.findOne({ where: { email } });
		if (existing) return res.status(409).json({ message: "Email already in use" });
		
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, passwordHash });
		const token = signJwt(user.id);
		
		return res.status(201).json({ 
			user: { id: user.id, name: user.name, email: user.email }, 
			token 
		});
	} catch (error) {
		console.error("Signup error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ message: "Missing fields" });
	
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) return res.status(401).json({ message: "Invalid credentials" });
		
		const ok = await user.comparePassword(password);
		if (!ok) return res.status(401).json({ message: "Invalid credentials" });
		
		const token = signJwt(user.id);
		return res.json({ 
			user: { id: user.id, name: user.name, email: user.email }, 
			token 
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function me(req, res) {
	try {
		const user = await User.findByPk(req.user.id, {
			attributes: ['id', 'name', 'email', 'avatarUrl', 'settings']
		});
		if (!user) return res.status(404).json({ message: "User not found" });
		return res.json({ user });
	} catch (error) {
		console.error("Me error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateProfile(req, res) {
	const { name, avatarUrl, settings } = req.body;
	
	try {
		const user = await User.findByPk(req.user.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		
		await user.update({ name, avatarUrl, settings });
		
		return res.json({ 
			user: { 
				id: user.id, 
				name: user.name, 
				email: user.email, 
				avatarUrl: user.avatarUrl, 
				settings: user.settings 
			} 
		});
	} catch (error) {
		console.error("Update profile error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}


