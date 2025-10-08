import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function connectToDatabase() {
	const mongoUri = process.env.MONGO_URI;
	
	if (!mongoUri) {
		throw new Error("MONGO_URI environment variable is not set. Please check your .env file.");
	}

	try {
		// Configure mongoose options for MongoDB Atlas
		mongoose.set("strictQuery", false);
		
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
			family: 4 // Use IPv4, skip trying IPv6
		};

		await mongoose.connect(mongoUri, options);
		console.log("✅ Successfully connected to MongoDB Atlas");
		
		// Handle connection events
		mongoose.connection.on('error', (err) => {
			console.error('❌ MongoDB connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('⚠️ MongoDB disconnected');
		});

		mongoose.connection.on('reconnected', () => {
			console.log('🔄 MongoDB reconnected');
		});

	} catch (error) {
		console.error("❌ Failed to connect to MongoDB Atlas:", error.message);
		throw error;
	}
}

export async function disconnectFromDatabase() {
	try {
		await mongoose.disconnect();
		console.log("✅ Disconnected from MongoDB Atlas");
	} catch (error) {
		console.error("❌ Error disconnecting from MongoDB:", error.message);
		throw error;
	}
}


