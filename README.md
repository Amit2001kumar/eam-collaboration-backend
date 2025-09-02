Team Collaboration Backend
This project serves as the robust backend for a real-time team collaboration platform. It provides a comprehensive set of RESTful APIs and real-time functionalities to manage users, teams, projects, and tasks. The architecture is designed to be scalable and secure, supporting features from user authentication to AI-powered assistant interactions.

Key Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Team Management: Create and manage teams, including adding and removing members.

Project & Task Tracking: Organize work by creating projects within teams and assigning tasks to individual team members.

Real-time Messaging: Integrated chat functionality for instant communication within teams.

AI Assistant: An API endpoint to interact with a conversational assistant for various queries.

Role-Based Access Control: Differentiated permissions for users with ADMIN, MANAGER, and MEMBER roles.

Technologies Used
Backend: Node.js, Express.js

Language: TypeScript

Database: MySQL

ORM/Driver: mysql2

Real-time Communication: Socket.IO

Authentication: bcryptjs and jsonwebtoken

Validation: joi

Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Make sure you have the following software installed on your system:

Node.js (LTS version recommended)

MySQL Server

Installation
Clone the repository to your local machine:
git clone (https://github.com/Amit2001kumar/eam-collaboration-backend.git)

Navigate to the project directory:
cd team-collaboration-backend

Install the required dependencies:
npm install

Database Setup
Ensure your MySQL server is running.

Create a new database for the project (e.g., team_db).

Update the database configuration in your .env file.

Configuration
Create a file named .env in the root of the project and add the following environment variables:

PORT=3000
JWT_SECRET=your_super_secret_jwt_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=team_db

Running the Project
You can run the project in two different modes:

Production Mode (Build and Run):
First, compile the TypeScript code into JavaScript. This creates the dist folder.
npm run build
Then, start the server.
npm start

Development Mode (Recommended):
This command compiles the code and starts the server simultaneously. It also automatically restarts the server whenever you make changes to a file.
npm run dev

API Documentation
API endpoints can be tested using the provided Postman collection. Import the team_collaboration_backend.json file into Postman to see all available requests, including authentication, team management, and more. The collection is organized to guide you through the correct sequence of calls.