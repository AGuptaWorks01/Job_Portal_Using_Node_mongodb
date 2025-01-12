# Job Portal Application

A Job Portal built with Node.js, Express, MongoDB, and additional packages like Swagger for API documentation, Helmet, and MongoSanitize for security, etc.

---

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Run the Application](#run-the-application)
4. [Project Structure](#project-structure)
5. [API Documentation](#api-documentation)
6. [License](#license)
7. [Docker Setup](#docker-setup)

---

## Installation

Follow these steps to set up the application locally:

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd job-portal
    ```

2. **Install dependencies:**

    Make sure you have Node.js and npm installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

    Run the following command to install all required dependencies:

    ```bash
    npm install
    ```

3. **Install MongoDB:**

    - You can either install MongoDB locally by following the instructions on the [MongoDB official website](https://www.mongodb.com/try/download/community).
    - Alternatively, use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud-based service) for a free-tier database. Create a database on MongoDB Atlas.

---

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
MONGO_URI=<Your-MongoDB-URI>
JWT_SECRET=<Your-Secret-Key-for-JWT>
PORT=8000

Run the Application
To start the application, you can use the following command:

bash
npm start
This will start the application in development mode using nodemon. The server will listen on port 8000 or the port defined in .env file.

# Project Structure
Here is a brief overview of the project structure:

.
├── config/
│   └── db.js                # MongoDB connection configuration
├── controllers/              # Controller functions for business logic
│   ├── authController.js     # Auth-related logic (register/login)
│   ├── jobController.js      # Job-related logic (create, update, delete, etc.)
│   └── userController.js     # User-related logic (profile update)
├── middleware/               # Middlewares for error handling, auth, etc.
│   ├── authMiddleware.js     # JWT authentication middleware
│   └── errorMiddleware.js    # Error handling middleware
├── models/                   # Mongoose models
│   ├── jobsModel.js          # Job model
│   └── userModel.js          # User model
├── routes/                   # Route definitions
│   ├── authRoutes.js         # Auth routes (login, register)
│   ├── jobsRoutes.js         # Job routes (create, update, delete)
│   └── userRoutes.js         # User profile update routes
├── swagger/                  # API documentation setup
│   └── swagger.json          # Swagger API documentation
├── server.js                 # Main server entry point
└── .env                      # Environment variables

API Documentation
This application provides a RESTful API for managing users, jobs, and authentication. The API documentation is generated using 
Swagger and can be accessed at:

plaintext
http://localhost:8000/api-doc
Swagger provides an interactive interface to explore and test all the endpoints.

Endpoints
User Authentication

POST /api/v1/auth/register - Register a new user
POST /api/v1/auth/login - Log in an existing user
Job Management

POST /api/v1/job/create-job - Create a new job listing
GET /api/v1/job/get-job - Get all job listings
PATCH /api/v1/job/update-job/:id - Update a job listing
DELETE /api/v1/job/delete-job/:id - Delete a job listing
GET /api/v1/job/job-stats - Get job statistics (pending, interview, reject)
User Profile Management

PUT /api/v1/user/update-user - Update user profile
Example API Requests
Register a User
bash
POST /api/v1/auth/register
Content-Type: application/json
{
  "name": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "location": "Mumbai"
}
Login a User
bash
POST /api/v1/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
Create a Job
bash
POST /api/v1/job/create-job
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
{
  "company": "ABC Corp",
  "position": "Software Engineer",
  "status": "Pending",
  "workType": "Full-time",
  "workLocation": "Mumbai"
}




















--------------------------
# Docker

Here is the complete and correct sequence of Docker commands to build and run your application:

Step 1: Build the Docker Image
Navigate to the directory where your Dockerfile is located, then run the following command to build the Docker image:

bash
Copy code
docker build -t job-portal .
This command will build the Docker image and tag it as job-portal.

Step 2: Run the Docker Container
Once the image is built, you can run the container with the following command:

bash
Copy code
docker run -p 8000:8000 --env-file .env job-portal
This command does the following:

-p 8000:8000: Maps port 8000 on your host machine to port 8000 inside the container (adjust if needed).
--env-file .env: Loads environment variables from the .env file in your project directory.
job-portal: Specifies the image to run (the one you built in Step 1).
If Port 8000 is Already in Use
If you face the issue where port 8000 is already in use, you can choose a different host port (like 8080):

bash
Copy code
docker run -p 8080:8000 --env-file .env job-portal
This will map port 8000 inside the container to port 8080 on your host machine. You can then access your application via http://localhost:8080.