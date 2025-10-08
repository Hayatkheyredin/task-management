import mongoose from "mongoose";

export async function connectToDatabase() {
<<<<<<< Updated upstream
	const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_management";
	if (!mongoUri) throw new Error("MONGO_URI is not set");
	mongoose.set("strictQuery", true);
	await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || undefined });
	console.log("Connected to MongoDB");
=======
	const mongoUri = process.env.MONGO_URI || "";
	if (!mongoUri) throw new Error("MONGO_URI is not set");

	mongoose.set("strictQuery", true);
	await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB || undefined });
	console.log("✅ Connected to MongoDB");
}

export async function disconnectFromDatabase() {
	await mongoose.disconnect();
	console.log("✅ Disconnected from MongoDB");
>>>>>>> Stashed changes
}


