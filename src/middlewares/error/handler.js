/**
 * Custom error handler middleware
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const CustomError = require("../../lib/error/CustomError");

// Middleware function to handle custom errors
const customErrorHandler = (err, req, res, next) => {
    // Initialize the customError variable with the original error
    let customError = err;

    // Check the type of error and create a CustomError instance accordingly
    if (err.name === "SyntaxError") {
        // Handle syntax errors with a specific message and status code
        customError = new CustomError("Unexpected Syntax", 400);
    }
    if (err.name === "ValidationError") {
        // Handle validation errors with the error's message and a status code of 400
        customError = new CustomError(err.message, 400);
    }
    if (err.code === 11000) {
        // Handle MongoDB duplicate key errors with a specific message and status code
        customError = new CustomError("Duplicate Key Found: Check Your Input", 400);
    }

    // Send the error response with the appropriate status code and message
    res.status(customError.status || 500).json({
        success: false, // Indicates that the request was not successful
        message: customError.message // Error message to be sent in the response
    });
};

// Export the custom error handler middleware function
module.exports = customErrorHandler;
