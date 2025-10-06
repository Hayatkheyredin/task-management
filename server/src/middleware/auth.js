import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
	const header = req.headers.authorization || "";
	const token = header.startsWith("Bearer ") ? header.slice(7) : null;
	if (!token) return res.status(401).json({ message: "Unauthorized" });
	try {
		const secret = process.env.JWT_SECRET || "dev_secret_change_me";
		const payload = jwt.verify(token, secret);
		req.user = { id: payload.sub };
		return next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
}

export function signJwt(userId, extra = {}) {
	const secret = process.env.JWT_SECRET || "dev_secret_change_me";
	return jwt.sign({ ...extra }, secret, { subject: String(userId), expiresIn: "7d" });
}


