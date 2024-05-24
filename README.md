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
git clone https://your-repository-url/personal-finance-tracker.git
```

#### 2.Navigate to the project directory:

```
cd personal-finance-tracker
```

#### Backend

#### 3. Set up the backend:

```
cd backend
npm install
npm start
```

#### Frontend

#### 4. Set up the frontend:

```
cd ../frontend
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
