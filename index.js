const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Get the current directory path.
const cwd = process.cwd();

// Set up the server port to use the PORT environment variable or the default port 3001.
const PORT = process.env.PORT || 3001;

// Create an instance of the Express application.
const app = express();

// Determine the activity name by checking if the current working directory includes the name "" and getting the relative path starting from it.
const activity = cwd.includes('01-Activities')
	? cwd.split('/01-Activities/')[1]
	: cwd;

// Set up middleware to handle URL-encoded and JSON-formatted data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Import the routes for the application
app.use(routes);

// Once the database connection is open, start the server on the specified port
db.once('open', () => {
	app.listen(PORT, () => {
		// Log a message indicating that the server is running, including the name of the activity and the port number
		console.log(`API server for ${activity} running on port ${PORT}!`);
	});
});
