import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { signJwt } from "../middleware/auth.js";

export async function signup(req, res) {
	const { name, email, password } = req.body;
	if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
	const existing = await User.findOne({ email });
	if (existing) return res.status(409).json({ message: "Email already in use" });
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ name, email, passwordHash });
	const token = signJwt(user._id);
	return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
}

export async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ message: "Missing fields" });
	const user = await User.findOne({ email });
	if (!user) return res.status(401).json({ message: "Invalid credentials" });
	const ok = await user.comparePassword(password);
	if (!ok) return res.status(401).json({ message: "Invalid credentials" });
	const token = signJwt(user._id);
	return res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
}

export async function me(req, res) {
	const user = await User.findById(req.user.id).select("name email avatarUrl settings");
	return res.json({ user });
}

export async function updateProfile(req, res) {
	const { name, avatarUrl, settings } = req.body;
	const user = await User.findByIdAndUpdate(
		req.user.id,
		{ $set: { name, avatarUrl, settings } },
		{ new: true }
	).select("name email avatarUrl settings");
	return res.json({ user });
}


