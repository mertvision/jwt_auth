/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const express = require("express");
// Import optional middlewares
let helmet, morgan;

try {
    // Attempt to require helmet and morgan packages
    helmet = require("helmet");
    morgan = require("morgan");
} catch (err) {
    // If there's an error loading the packages, handle it (e.g., log it)
    console.error("Error loading optional middlewares:", err);
}

const customErrorHandler = require("../error/handler"); // Import custom error handler middleware
const routes = require("../../routes/routes.js"); // Import application routes

// Function to initialize server middlewares
const initServerMiddlewares = (server) => {
    // Parse incoming JSON requests
    server.use(express.json());

    // Use the routes defined in the routes file for API endpoints
    server.use("/api", routes);

    // Use the custom error handler for handling errors
    server.use(customErrorHandler);

    // Use helmet for security-related HTTP headers if available
    if (helmet) {
        server.use(helmet());
    }

    // Use morgan for HTTP request logging if available
    if (morgan) {
        server.use(morgan('dev'));
    }
};

// Export the middleware initialization function
module.exports = initServerMiddlewares;
