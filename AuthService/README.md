
## Welcome to AuthService

The **AuthService** is a core microservice in the AirPass Airline Backend System. It manages user authentication, authorization, and user management, ensuring secure access to all other services.

## Features

- User registration and login
- JWT-based authentication and authorization
- Password hashing with bcrypt
- Role-based access control
- Integrates with other microservices via API Gateway and RabbitMQ

## Folder Structure

```
AuthService/
  src/
    config/
    controllers/
    middlewares/
    migrations/
    models/
    repository/
    Routes/
    seeders/
    services/
    utils/
  package.json
  README.md
  .env.example
  ...
```

Each folder contains code and resources for a specific concern (e.g., controllers for request handling, models for database schema, etc.).

---

For setup, configuration, and usage instructions, refer to the rest of this README below.

## Configuration

- The default port and other settings can be configured using environment variables (see `.env.example`).
- Database, JWT secret, and RabbitMQ connection details must be set in your `.env` file.

## Running the Service

Start the AuthService with:

```sh
npm start
```

The server will start on the configured port (default: `http://localhost:3001`).

## How It Works

- Exposes RESTful API endpoints for user registration, login, and authentication.
- Issues and verifies JWT tokens for secure access to other services.
- Handles password encryption and user role management.
- Communicates with other services through the API Gateway and RabbitMQ.

## API Endpoints

Refer to the `Routes/` and `controllers/` folders for detailed API documentation and available endpoints.


## DB Design

The following tables and relationships are used in the AuthService:

- **User**: Represents a user in the system.
  - Fields: `id`, `email`, `password`, `createdAt`, `updatedAt`
  - Relationships: Each user can have multiple roles (many-to-many via `User_Roles`).

- **Role**: Represents a role (e.g., admin, user).
  - Fields: `id`, `name`, `createdAt`, `updatedAt`
  - Relationships: Each role can be assigned to multiple users (many-to-many via `User_Roles`).

- **User_Roles**: Join table for the many-to-many relationship between users and roles.
  - Fields: `userId`, `roleId`

### Example Sequelize Model Generation

To generate the User model using Sequelize CLI:

```sh
npx sequelize model:generate --name User --attributes email:String,password:String
```

Refer to the models in `src/models/` for more details on schema and associations.

---

**Note:** Ensure your database is set up and migrated before running the service.

## Troubleshooting

- **Database connection errors:** Ensure your database credentials in `.env` are correct and the database server is running.
- **JWT errors:** Make sure your JWT secret is set correctly in `.env` and matches across services.
- **RabbitMQ connection errors:** Make sure RabbitMQ is running and the URL in `.env` is correct.
- **Port conflicts:** Change the `PORT` variable in your `.env` file if the default port is in use.

