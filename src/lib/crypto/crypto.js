/**
 * CryptoUtils Class
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const bcrypt = require("bcrypt");

// Utility class for handling password encryption and comparison
class CryptoUtils {

    // Constructor method for initializing the CryptoUtils instance
    constructor(password) {
        this.password = password; // Optional: stores a password if provided
    };

    // Asynchronous method to hash a user password
    async hashUserPassword(password, next) {
        try {
            // Generate a salt with 10 rounds of processing
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            // Return the hashed password
            return hashedPassword;
        } catch (err) {
            // Pass any errors to the next middleware or error handler
            return next(err);
        }
    };

    // Static method to compare a plain password with a hashed password
    static _comparePasswords(password, hashedPassword) {
        // Compare the plain password with the hashed password
        return bcrypt.compareSync(password, hashedPassword);
    };
}

// Export the CryptoUtils class for use in other modules
module.exports = CryptoUtils;
