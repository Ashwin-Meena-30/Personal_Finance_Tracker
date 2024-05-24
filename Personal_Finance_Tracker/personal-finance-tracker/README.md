# Personal Finance Tracker - Backend

## Description

The backend of the Personal Finance Tracker handles all data management and server-side logic. It provides a RESTful API for creating, reading, updating, and deleting financial records, as well as user management and authentication. The purpose of this component is to offer secure and efficient data handling to support the frontend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Features](#features)

## Installation

Follow these steps to set up the backend environment:

##### 1. Navigate to the project directory

##### 2. **Install dependencies:** npm install

##### 3. Setup .env file with your creds.

## Usage

To start the server, run the following command:

**node server.js**

This will start the Node.js server on `localhost:3000`. The server must be running to handle requests from the frontend.

## Project Structure

```
personal-finance-tracker/
├── config/
│   └── config.json                    # Database configurations
├── controllers/
│   ├── authController.js              # Authentication related logic
│   └── financialRecordController.js   # CRUD operations for financial records
├── middlewares/
│   └── authMiddleware.js              # Middleware for authentication and authorization
├── models/
│   ├── index.js                       # Sequelize setup and model imports
│   ├── user.js                        # User model definition
│   └── financialRecord.js             # Financial record model definition
├── routes/
│   ├── authRoutes.js                  # Routes for user authentication
│   └── financialRecordRoutes.js       # Routes for managing financial records
├── services/
│   ├── authService.js                 # Services for user authentication
│   └── financialRecordService.js      # Services for financial record management
├── migrations/                        # Database migration files
├── seeders/                           # Seeders to populate the database with initial data
└── server.js                          # Entry point of the application

```

## Configuration

Set environment variables to configure the application:

- `DATABASE_URL` - Connection string for the PostgreSQL database.
- `JWT_SECRET` - Secret key for signing JSON Web Tokens.

Create a `.env` file in the root directory and populate it with your configurations:

## Features

- User authentication and authorization.
- CRUD operations for financial records.
- Secure handling of sensitive data with JWT.
