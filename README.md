# AI-Powered Task Assigner API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/Framework-NestJS-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)

A smart project management API that automates task delegation by analyzing task requirements and team member skills to suggest the most suitable person for the job.

## 📖 Table of Contents

- [🌟 About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [🔧 Configuration](#-configuration)
- [📁 Project Structure](#-project-structure)
- [⚙️ API Endpoints](#️-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## 🌟 About the Project

The AI Task Assigner is a backend service designed to power a smart project management tool. It provides the core API for creating users, managing projects, handling tasks, and interacting with an asynchronous event-driven system for background processing. The key innovation lies in its ability to intelligently assign tasks, streamlining workflows and optimizing team productivity.

## ✨ Key Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Role-Based Access Control (RBAC)**: Guards and decorators to protect endpoints based on user roles.
- **Task Management**: Full CRUD functionality for managing tasks/tickets.
- **Asynchronous Job Processing**: Utilizes **Inngest** for handling background tasks like sending welcome emails, ensuring a non-blocking user experience.
- **Email Notifications**: Integrated with **Nodemailer** to send transactional emails.
- **Scalable Architecture**: Built with NestJS, providing a modular and maintainable codebase.

## 🛠️ Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [JWT](https://jwt.io/) (`@nestjs/jwt`)
- **Event-Driven Jobs**: [Inngest](https://www.inngest.com/)
- **Validation**: `class-validator`
- **Emailing**: [Nodemailer](https://nodemailer.com/)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)

## 🚀 Getting Started

Follow these instructions to get a local copy of the server up and running for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or higher recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
- [Inngest Dev Server](https://www.inngest.com/docs/getting-started/dev-server)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abdul-muyeed/AI-task-assigner.git
    ```

2.  **Navigate to the server directory:**
    ```sh
    cd AI-task-assigner/server
    ```

3.  **Install dependencies:**
    ```sh
    pnpm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `server` directory by copying the example:
    ```sh
    cp .env.example .env
    ```
    Then, fill in the required values in the `.env` file. See the [Configuration](#-configuration) section for details.

### Running the Application

You need to run the Inngest development server and the NestJS application in separate terminals.

1.  **Start the Inngest Dev Server:**
    This provides a dashboard to view and debug background jobs.
    ```sh
    npx inngest-cli dev
    ```
    The Inngest dashboard will be available at `http://localhost:8288`.

2.  **Start the NestJS Application:**
    ```sh
    # Development mode with hot-reloading
    pnpm run start:dev
    ```
    The API server will be running at `http://localhost:3000`.

## 🔧 Configuration

The application is configured using environment variables. Create a `.env` file in the `server/` directory with the following variables:

```env
# Application
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/ai_task_assigner

# JWT Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1d

# Inngest
INNGEST_EVENT_KEY=your-inngest-event-key
INNGEST_SIGNING_KEY=your-inngest-signing-key

# Nodemailer (Example for Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

## 📁 Project Structure

The codebase is organized into modules for clear separation of concerns.

```
server/
├── src/
│   ├── app.module.ts       # Root application module
│   ├── main.ts             # Application entry point
│   ├── common/             # Shared utilities and interfaces
│   ├── configs/            # Application configuration files
│   ├── decorators/         # Custom decorators (e.g., @Roles)
│   ├── guards/             # Custom guards (e.g., AuthGuard)
│   ├── inngest/            # Inngest client and background functions
│   ├── mail/               # Email sending service
│   ├── tickets/            # Module for managing tickets/tasks
│   └── users/              # Module for user management and authentication
└── test/                   # End-to-end tests
```

## ⚙️ API Endpoints

The API is prefixed with `/api`.

| Method | Endpoint              | Description                               | Protected |
| :----- | :-------------------- | :---------------------------------------- | :-------- |
| `POST` | `/users/signup`       | Register a new user.                      | No        |
| `POST` | `/users/login`        | Log in a user and receive a JWT.          | No        |
| `GET`  | `/tickets`            | Get a list of all tickets.                | Yes       |
| `POST` | `/tickets`            | Create a new ticket.                      | Yes       |
| `GET`  | `/tickets/:id`        | Get a single ticket by its ID.            | Yes       |
| `PATCH`| `/tickets/:id`        | Update a ticket by its ID.                | Yes       |
| `DELETE`| `/tickets/:id`       | Delete a ticket by its ID.                | Yes       |
| `ALL`  | `/inngest`            | Endpoint for Inngest to communicate with. | N/A       |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.