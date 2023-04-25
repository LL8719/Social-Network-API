// Import the necessary modules from Mongoose package
const { connect, connection } = require('mongoose');

// Set up the connection string to the MongoDB database using the MONGODB_URI environment variable or the local database URL.
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

// Connect to the MongoDB database using the provided connection string.
connect(connectionString);

// Export the Mongoose connection object for use in other parts of the application
module.exports = connection;
