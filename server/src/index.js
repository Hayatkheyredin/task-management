import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToDatabase, disconnectFromDatabase } from "./lib/db.js";
import { registerSocketServer } from "./lib/socket.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
	res.json({ 
		ok: true, 
		timestamp: Date.now(),
		environment: process.env.NODE_ENV || 'development',
		database: 'connected'
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await connectToDatabase();
		registerSocketServer(server);
		
		server.listen(PORT, () => {
			console.log(`🚀 Server listening on port ${PORT}`);
			console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
}

// Graceful shutdown
process.on('SIGINT', async () => {
	console.log('\n🛑 Received SIGINT. Graceful shutdown...');
	try {
		await disconnectFromDatabase();
		server.close(() => {
			console.log('✅ Server closed');
			process.exit(0);
		});
	} catch (error) {
		console.error('❌ Error during shutdown:', error);
		process.exit(1);
	}
});

process.on('SIGTERM', async () => {
	console.log('\n🛑 Received SIGTERM. Graceful shutdown...');
	try {
		await disconnectFromDatabase();
		server.close(() => {
			console.log('✅ Server closed');
			process.exit(0);
		});
	} catch (error) {
		console.error('❌ Error during shutdown:', error);
		process.exit(1);
	}
});

start();


