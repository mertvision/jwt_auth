/**
 * JWT Middleware to check access token
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const CustomError = require("../../lib/error/CustomError.js");
const JWTUtils = require("../../lib/jwt/jwt.js");
const jwt = require("jsonwebtoken");

// Middleware function to ensure the user has access to the route
const getAccessToRoute = (req, res, next) => {
    // Retrieve the secret key for verifying JWT from environment variables
    const { JWT_SECRET_KEY } = process.env;

    // Check if the token is included in the request
    if (!JWTUtils._checkTokenIclude(req)) {
        // If not, return a 401 Unauthorized error
        return next(new CustomError("You are not authorized", 401));
    }

    // Extract the access token from the request headers
    const access_token = JWTUtils._getAccessTokenFromHeader(req);

    // Verify the JWT using the secret key
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            // If verification fails, return a 401 Unauthorized error
            return next(new CustomError("You are not authorized", 401));
        }

        // If verification is successful, attach the decoded user information to the request object
        req.user = {
            id: decoded.id, // User ID from the token
            first_Name: decoded.first_name // User name from the token
        };

        // Log the decoded token for debugging purposes
        console.log(decoded);

        // Pass control to the next middleware function
        next();
    });
};

// Export the middleware function for use in other modules
module.exports = { getAccessToRoute };
