/**
 * Authentication routes
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const express = require("express"); // Import the Express library
const router = express.Router(); // Create an Express Router instance

// Import controller functions for authentication-related routes
const { register, login, getMe, logout } = require("../../controllers/auth/auth");

// Import middleware for JWT token verification
const { getAccessToRoute } = require("../../middlewares/jwt/jwt_middlewares");

// Define routes and associate them with controller functions
// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for retrieving user information. Requires JWT token verification.
router.post('/getMe', getAccessToRoute, getMe);

// Route for user logout. Requires JWT token verification.
router.get('/logout', getAccessToRoute, logout);

// Export the router to be used in other parts of the application
module.exports = router;
