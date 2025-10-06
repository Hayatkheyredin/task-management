import { Server } from "socket.io";

let ioInstance = null;

export function registerSocketServer(httpServer) {
	ioInstance = new Server(httpServer, {
		cors: { origin: true, credentials: true },
	});

	ioInstance.on("connection", (socket) => {
		// Broadcast presence or other events
		socket.on("task:update", (payload) => {
			socket.broadcast.emit("task:updated", payload);
		});

		socket.on("disconnect", () => {
			// cleanup if needed
		});
	});

	return ioInstance;
}

export function getIo() {
	if (!ioInstance) throw new Error("Socket.io has not been initialized");
	return ioInstance;
}


