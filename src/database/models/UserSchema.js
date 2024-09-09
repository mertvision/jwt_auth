const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema with various fields and validation
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Please provide a first name"] // Field is required with a custom error message
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name"] // Field is required with a custom error message
    },
    email: {
        type: String,
        required: true, // Field is required
        unique: true,   // Value must be unique across the collection
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Regular expression for email validation
            "Please provide a valid e-mail" // Custom error message for invalid email
        ]
    },
    role: {
        type: String,
        default: "user", // Default value is "user"
        enum: ["user", "admin"], // Allowed values are "user" or "admin"
    },
    password: {
        type: String,
        required: [true, "Please provide a password"], // Field is required with a custom error message
        minlength: [6, "Please provide a password longer than 6 characters"], // Minimum length validation
        select: false, // Password will not be included in query results by default
    },
    createdAt: {
        type: Date,
        default: Date.now // Default value is the current date and time
    },
    title: {
        type: String // Optional field for user's title
    },
    about: {
        type: String // Optional field for additional information about the user
    },
    place: {
        type: String // Optional field for user's place or location
    },
    website: {
        type: String // Optional field for user's website URL
    },
    profile_image: {
        type: String,
        default: "default.jpg" // Default value is "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false // Default value is false (user is not blocked)
    }
});

// Create and export the User model based on the UserSchema
module.exports = mongoose.model("User", UserSchema);
