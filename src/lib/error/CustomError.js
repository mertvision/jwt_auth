/**
 * Custom error class to extend the built-in Error class
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */
class CustomError extends Error {
    // Constructor method to initialize the CustomError instance
    constructor(message, status) {
        super(message); // Call the parent class constructor with the error message
        this.status = status; // Custom property to store the HTTP status code or other status
    }
}

// Export the CustomError class for use in other modules
module.exports = CustomError;
