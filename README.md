# Bidding System Backend

The Bidding System Backend is built using [NestJS](https://nestjs.com/) and provides the APIs required for the bidding system application. It uses PostgreSQL as its database and supports Docker-based deployment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [API Usage](#api-usage)
- [Seeding Data](#seeding-data)
- [License](#license)

---

## Features

- User authentication and authorization.
- Seamless PostgreSQL integration.
- Dockerized for easy deployment.
- Automated database seeding on startup.

---

## Technologies Used

- **Framework**: NestJS
- **Database**: PostgreSQL
- **Authentication**: bcryptjs for hashing passwords
- **Containerization**: Docker, Docker Compose

---

## Directory Structure

```plaintext
bidding-system-backend/
├── src/
│   ├── app.module.ts        # Main application module
│   ├── main.ts              # Entry point for the application
│   ├── config/
│   │   ├── database.config.ts # Database configuration
│   │   └── app.config.ts      # Application-level configuration
│   ├── modules/
│   │   ├── users/           # User module
│   │   │   ├── user.entity.ts  # User entity definition
│   │   │   ├── user.service.ts # Business logic for user operations
│   │   │   └── user.controller.ts # Routes for user operations
│   │   └── seed/            # Data seeding module
│   │       ├── seed.service.ts # Logic to seed database
│   │       └── seed.module.ts # Module for seeding
├── dist/                    # Compiled code (generated on build)
├── node_modules/            # Dependencies
├── .env                     # Environment variables
├── Dockerfile               # Docker configuration for backend
├── docker-compose.yml       # Docker Compose configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```

---

## Environment Variables

```bash
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres
DB_TIMEZONE=UTC
PORT=3001
FRONTEND_APP_URL=http://localhost:3000
```

---

## Getting Started

### Prerequisites

- Node.js (v18.x or above)
- PostgreSQL
- Docker and Docker Compose

### Running Locally

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:muak4/paynest-bidding-system-backend.git
   cd bidding-system-backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:

   Create a .env file in the root directory and add the required environment variables.

4. **Run the Application**:
   ```bash
   npm run start:dev
   ```

### Running with Docker

1. **Build and Start Services**:
   ```bash
   docker-compose up --build
   ```
2. **Access API**:

   The backend runs on `http://localhost:3001`

3. **Stop Services**:
   ```bash
   docker compose down
   ```

---

## API Usage

To create item call Post API `localhost:3001/item`

```bash
{
  "name": "Lenovo Thinkpad",
  "description": "Slickest & Powerful",
  "startingPrice": 2000,
  "duration": 3600
}
```

---

## Seeding Data

The backend automatically seeds data if the database is empty. The seeding logic is defined in the SeedService. Upon application startup, if no users exist in the database, 100 users are seeded with default credentials.

The seeding logic is located in src/seed.service.ts and runs automatically during application initialization.

---

## License

This project is licensed under the MIT License.

---
