/**
 * Main file to run server
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Modules
const express = require("express"); // Import Express.js library for server handling

// Import Statement of Our Modules
const initServerConfigurations = require("./config/config"); // Import server configurations module
const initServerMiddlewares = require("./middlewares/server/middlewares"); // Import server middlewares module
const init = require("./init/init"); // Import the server starting function

// Import Statement of Database Connections
const MongodbUtils = require("./database/connections/mongodb"); // Import MongoDB utility functions

// Server variable declaration and value assignment
const server = express(); // Create an Express application instance

// Initialization of Server Configurations and Middlewares
initServerConfigurations(); // Set up server configurations (e.g., environment variables)
initServerMiddlewares(server); // Set up middlewares for the server

// Start Database Connections
MongodbUtils._connectMongoDb(); // Connect to MongoDB

// Initialization of Server
init(server); // Start the server and listen for incoming requests


