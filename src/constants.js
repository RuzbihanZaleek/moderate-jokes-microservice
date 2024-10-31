const SWAGGER_CONFIG = {
  TITLE: "Moderate Jokes Microservice",
  VERSION: "1.0.0",
  DESCRIPTION: "API documentation for the Moderate Jokes microservice",
  SERVER_URL: "http://localhost:3001",
};

const JOKE_SERVICE_MESSAGES = {
  FETCH_ERROR: "Error retrieving jokes.",
  UPDATE_SUCCESS: "Joke updated successfully.",
  APPROVE_SUCCESS: "Joke approved successfully",
  APPROVE_ERROR: "Unexpected response from delivery service",
  INVALID_CREDENTIALS: "Invalid credentials",
};

const ERROR_MESSAGES = {
  ERROR_OCCURRED: "An error occurred",
  NO_RESPONSE: "No response from the server",
};

module.exports = { SWAGGER_CONFIG, JOKE_SERVICE_MESSAGES, ERROR_MESSAGES };
