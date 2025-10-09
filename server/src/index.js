import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { registerSocketServer } from "./lib/socket.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ 
	origin: [
		"http://localhost:5173",
		"http://localhost:5174", 
		"http://127.0.0.1:5173",
		"http://127.0.0.1:5174"
	],
	credentials: true 
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Health check endpoint
app.get("/api/health", (_req, res) => {
	res.json({ 
		ok: true, 
		timestamp: Date.now(),
		environment: process.env.NODE_ENV || 'development',
		database: 'connected'
	});
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
	console.error("Global error handler:", err);
	res.status(500).json({ 
		message: "Internal server error",
		...(process.env.NODE_ENV === 'development' && { error: err.message })
	});
});

// 404 handler - catch all routes
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		// Connect to MongoDB
		await connectDB();
		
		// Initialize Socket.IO
		registerSocketServer(server);
		
		server.listen(PORT, () => {
			console.log(`🚀 Server listening on port ${PORT}`);
			console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
			console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
}

start();
