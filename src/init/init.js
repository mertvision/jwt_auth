/**
 * Initialization function of the server.
 * Sets up the server to listen on a specified port and address.
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const init = async (server) => {
  try {
      // Retrieve server configuration from environment variables
      const SERVER_PROTOCOL = process?.env?.SERVER_PROTOCOL; // Protocol (e.g., http, https)
      const SERVER_HOST = process?.env?.SERVER_HOST;       // Hostname or IP address
      const SERVER_PORT = process?.env?.SERVER_PORT;         // Port number

      // Construct the server address using the protocol, host, and port
      const serverAddress = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
      const callbackMessage = `Server is running on ${serverAddress}`;

      // Start the server and listen on the specified port
      server.listen(SERVER_PORT, () => {
          console.log(callbackMessage); // Log a message indicating that the server is running
      });
  } catch (err) {
      // Log any errors that occur during the server initialization
      console.log("Server running error", err);
  }
};

// Export the initialization function for use in other modules
module.exports = init;
