const mongoose = require("mongoose");

// Utility class for MongoDB operations
class MongodbUtils {
    // Constructor method for initializing MongodbUtils instances
    constructor() {}

    // Static method to connect to MongoDB
    static async _connectMongoDb() {
        try {
            // Connect to MongoDB using the connection URI from environment variables
            await mongoose.connect(process?.env?.MONGODB_URI, {
                dbName: "jwt" // Specify the database name
            });
            
            // Log success message if connection is successful
            console.log("MongoDB connection is successful.");
        } catch (err) {
            // Log error message if connection fails
            console.error("MongoDB connection error:", err);
        }
    }
}

// Export the MongodbUtils class for use in other modules
module.exports = MongodbUtils;
