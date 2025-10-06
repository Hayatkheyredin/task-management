import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToDatabase } from "./lib/db.js";
import { registerSocketServer } from "./lib/socket.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
	res.json({ ok: true, timestamp: Date.now() });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
	await connectToDatabase();
	registerSocketServer(server);
	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

start().catch((err) => {
	console.error("Failed to start server", err);
	process.exit(1);
});


