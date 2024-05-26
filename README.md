# Personal Finance Tracker

# Description

Personal Finance Tracker is a comprehensive application designed to help users manage their income and expenses effectively. This repository contains both the backend and frontend components, along with Docker configurations for easy deployment and development setups.

# Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)

# Project Structure

This project is organized into several main directories:

```
/
├── backend/ # Contains all backend code (Node.js/Express)
├── frontend/ # Contains all frontend code (React)
└── docker-compose.yml # Docker Compose configuration for running the entire application
```

# Getting Started

## Prerequisites

- Node.js and npm
- Docker and Docker Compose (for Docker setup)

## Installation

#### 1. Clone the repository:

```
git clone https://github.com/Ashwin-Meena-30/Personal_Finance_Tracker.git
```

#### 2.Navigate to the project directory:

```
cd Personal_Finance_Tracker
```

#### Backend

#### 3. Set up the backend:

```
cd personal-finance-tracker
npm install
Add .env file as shown in personal-finance-tracker README.md
npm install sequelize sequelize-cli pg pg-hstore
when successfully created the env file run command  ` npx sequelize-cli db:migrate` for create migration.
node server.js
```

#### Frontend

#### 4. Set up the frontend:

```
cd ../personal-finance-tracker-frontend
npm install
npm start
```

# Usage

- Start the backend and frontend separately as described above.
- Access the frontend via http://localhost:3001 and the backend via http://localhost:3000.

# Docker Setup

To run the entire application using Docker:

```
docker-compose up --build
```

This command will start both the backend and frontend services as specified in the `docker-compose.yml` file.
