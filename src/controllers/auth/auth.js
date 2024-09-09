/**
 * This file contains the functions needed for authentication, or you can also refer to it as a controller
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Our Libraries
const CustomError = require("../../lib/error/CustomError");
const CryptoUtils = require("../../lib/crypto/crypto");
const JWTUtils = require("../../lib/jwt/jwt");
// Import Statement of UserSchema for MongoDB
const User = require("../../database/models/UserSchema");

// Asynchronous function to handle user registration
const register = async (req, res, next) => {
    try {
        // Extracting user details from the request body
        const { first_name, last_name, email, password } = req.body;

        // Creating an instance of CryptoUtils to handle password encryption
        const cryptoUtils = new CryptoUtils();

        // Hashing the user's password
        const hashedPassword = await cryptoUtils.hashUserPassword(password, next);

        // Creating a new user record in the database with the provided details
        const user = await User.create({
            first_name: first_name,  // User's first name
            last_name: last_name,    // User's last name
            email: email,            // User's email address
            password: hashedPassword // Hashed user password
        });

        // Generating and sending a JSON Web Token (JWT) to the client
        JWTUtils._sendJsonWebTokenToClient(user, res);

    } catch (err) {
        // Passing any errors to the next middleware or error handler
        return next(err);
    }
};

// Asynchronous function to handle user login
const login = async (req, res, next) => {
    try {
        // Extracting email and password from the request body
        const email = req.body.email;
        const password = req.body.password;

        // Check if both email and password are provided
        if (!email || !password) {
            return next(new CustomError("Please provide login inputs"));
        };

        // Find the user by email and include the password field in the query
        const user = await User.findOne({ email: email }).select("+password");

        // If the user is not found, return an error
        if (!user) {
            return next(new CustomError("User couldn't be found"));
        };

        // Compare the provided password with the stored hashed password
        if (!CryptoUtils._comparePasswords(password, user.password)) {
            return next(new CustomError("Password is incorrect"));
        };

        // Generate and send a JSON Web Token (JWT) to the client
        JWTUtils._sendJsonWebTokenToClient(user, res);
    } catch (err) {
        // Pass any errors to the next middleware or error handler
        return next(err);
    };
};


// Asynchronous function to handle retrieving the current user's information
const getMe = async (req, res, next) => {
    try {
        // Respond with a status code of 200 and the user's information
        return res.status(200).json({
            success: true, // Indicates the request was successful
            data: {
                id: req.user.id,       // User's unique identifier
                name: req.user.name    // User's name
            }
        });
    } catch (err) {
        // Pass any errors to the next middleware or error handler
        return next(err);
    };
};

// Asynchronous function to handle user logout
const logout = async (req, res, next) => {
    try {
        // Clear the access_token cookie and respond with a success message
        return res.status(200) // Set HTTP status code to 200 (OK)
                  .clearCookie("access_token") // Clear the cookie named "access_token"
                  .json({
                      success: true, // Indicates the logout request was successful
                      message: "You have been logged out." // Informative message for the user
                  });
    } catch (err) {
        // Pass any errors to the next middleware or error handler
        return next(err);
    };
};


// Exporting functions for user authentication and management
module.exports = {
    register,  // Function to handle user registration
    login,     // Function to handle user login
    getMe,     // Function to retrieve the current user's information
    logout     // Function to handle user logout
};
