import { connectToDatabase, disconnectFromDatabase } from "./src/lib/db.js";
import { User } from "./src/models/User.model.js";
import { Task } from "./src/models/Task.model.js";

async function testConnection() {
	console.log("🧪 Testing MongoDB Atlas connection...\n");
	
	try {
		// Connect to database
		await connectToDatabase();
		console.log("✅ Database connection successful!\n");
		
		// Test basic operations
		console.log("🔍 Testing database operations...");
		
		// Test User model
		const userCount = await User.countDocuments();
		console.log(`📊 Users in database: ${userCount}`);
		
		// Test Task model
		const taskCount = await Task.countDocuments();
		console.log(`📊 Tasks in database: ${taskCount}`);
		
		// Test creating a test user (optional - comment out if you don't want test data)
		/*
		const testUser = await User.create({
			name: "Test User",
			email: "test@example.com",
			passwordHash: "test_hash"
		});
		console.log(`✅ Test user created with ID: ${testUser._id}`);
		*/
		
		console.log("\n🎉 All tests passed! MongoDB Atlas connection is working properly.");
		
	} catch (error) {
		console.error("❌ Connection test failed:", error.message);
		console.error("\n💡 Make sure to:");
		console.error("1. Update your .env file with the correct MongoDB Atlas connection string");
		console.error("2. Check your MongoDB Atlas cluster is running");
		console.error("3. Verify your IP address is whitelisted in MongoDB Atlas");
		console.error("4. Ensure your database user has proper permissions");
	} finally {
		// Disconnect
		await disconnectFromDatabase();
		console.log("\n👋 Disconnected from database");
	}
}

// Run the test
testConnection();
