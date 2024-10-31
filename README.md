# Moderate Jokes Microservice

The **Moderate Jokes Microservice** is a REST API built with Node.js and Express to allow moderators to review and manage jokes submitted by users. The moderator can edit jokes, change their types,
approve or reject jokes, and interact with the **Submit Jokes** and **Deliver Jokes** microservices. This microservice requires authentication and is part of a larger joke management architecture.

## Features

- Requires authentication for moderation access.
- Retrieves submitted jokes from the **Submit Jokes Microservice**.
- Allows updating, approving, or rejecting jokes.
- Communicates with the **Deliver Jokes Microservice** for joke delivery.

## Getting Started

## Prerequisites

- **Docker** (for containerized deployment)
- **Node.js** (for local development, optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RuzbihanZaleek/moderate-jokes-microservice.git
2. Navigate to the project directory:
   ```bash
   cd moderate-jokes-microservice
   ```
3. Configure environment variables:
   - Create a .env file and set the .env.example file variable
4. Build the Docker Image:
   ```bash
   docker build -t moderate-jokes-service .
   ```
5. Run the Docker Container:
   ```bash
   docker run -p 3001:3001 --env-file .env --name moderate-jokes-service moderate-jokes-service
   ```

### Local Development (Without Docker: Optional)

1. Install Dependencies:
   ```bash
   npm install
   ```
2. Start the Application:
   ```bash
   npm start
   ```

## API Documentation

This service includes interactive API documentation powered by **Swagger**. You can view and test all available endpoints through the Swagger UI.

- **Swagger UI**: [http://localhost:3001/api](http://localhost:3001/api)

> Make sure the service is running locally on port 3001 to access the documentation.
