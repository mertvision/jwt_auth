/**
 * JWTUtils Class
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const jwt = require("jsonwebtoken");

// Utility class for handling JSON Web Token (JWT) operations
class JWTUtils {
    constructor() {}

    // Static method to send a JSON Web Token to the client
    static _sendJsonWebTokenToClient(user, res) {
        // Retrieve configuration values from environment variables
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Secret key for signing the JWT
        const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE; // Expiration time for the JWT cookie
        const JWT_EXPIRE = process.env.JWT_EXPIRE; // Expiration time for the JWT
        const NODE_ENV = process.env.NODE_ENV; // Current environment (e.g., development or production)

        // Create the payload for the JWT
        const payload = {
            id: user.id, // User ID
            first_name: user.first_name // User's first name
        };

        // Sign the JWT with the payload and secret key
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRE // Set the expiration time for the JWT
        });

        // Send the JWT to the client in a cookie and as part of the response JSON
        return res.status(200) // Set HTTP status code to 200 (OK)
            .cookie("access_token", token, {
                httpOnly: true, // Cookie is not accessible via JavaScript (client-side)
                expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE)), // Set cookie expiration time
                secure: NODE_ENV === 'development' ? false : true // Use secure flag based on environment
            })
            .json({
                success: true, // Indicates the request was successful
                access_token: token, // Return the JWT as part of the response
                data: {
                    user: user.name, // User's name
                    email: user.email // User's email
                }
            });
    }

    // Static method to check if the token is included in the request headers
    static async _checkTokenIclude(req) {
        // Check if the authorization header is present and starts with "Bearer:"
        return (
            req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
        );
    }

    // Static method to extract the access token from the request headers
    static async _getAccessTokenFromHeader(req) {
        const authorization = req.headers.authorization; // Get the authorization header
        const access_token = authorization.split(" ")[1]; // Extract the token from "Bearer <token>"
        return access_token;
    }
}

// Export the JWTUtils class for use in other modules
module.exports = JWTUtils;
