/**
 * Main routes file
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const express = require("express"); // Import the Express library
const router = express.Router(); // Create an Express Router instance
const auth = require("./auth/auth"); // Import authentication routes

// Use the authentication routes under the '/auth' path
router.use('/auth', auth);

// Export the router to be used in other parts of the application
module.exports = router;
