# AirPass — Airline Backend System

## Overview

AirPass is a scalable, microservices-based backend system designed for airline management. The project is structured into independent services, each responsible for a specific domain, ensuring modularity, maintainability, and ease of scaling.

## Architecture

This project follows a microservices architecture, with each service running independently and communicating via APIs or message queues. The main services are:

- **API Gateway**: Central entry point for all client requests, responsible for routing, authentication, and aggregation.
- **AuthService**: Handles user authentication, authorization, and user management.
- **BookingService**: Manages flight bookings, cancellations, and related business logic.
- **FlightsAndSearch**: Manages flight schedules, airports, cities, and search functionalities.
- **ReminderService**: Handles reminders and notifications for users.

## Folder Structure

```
API_Gateway/
AuthService/
BookingService/
FlightsAndSearch/
ReminderService/
```

Each service contains its own source code, configuration, models, controllers, routes, and utilities.

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM (with migrations and seeders)
- JWT for authentication
- bcrypt for password hashing
- Message Queues (RabbitMQ for inter-service communication)
- Relational Database (e.g., PostgreSQL/MySQL)

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm
- Database (PostgreSQL/MySQL)
- RabbitMQ (for message queue communication)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Agarwalkeshav185/AirPass---Airline-Backend-System.git
   cd AirPass---Airline-Backend-System
   ```

2. Install dependencies for each service:
   ```sh
   cd AuthService && npm install
   cd ../BookingService && npm install
   cd ../FlightsAndSearch && npm install
   cd ../API_Gateway && npm install
   cd ../ReminderService && npm install
   ```

3. Set up environment variables and configuration files for each service (see respective `config/` folders).


4. Run database migrations and seeders for each service as needed. For services using Sequelize, complete the following steps for database setup:
   - Inside the `src/config` folder of every service (except Api_Gateway), create a new file `config.json` and add the following JSON:

     ```
     {
         "development": {
             "username": "<your_db_username>",
             "password": "<your_db_password>",
             "database": "database_development",
             "host": "127.0.0.1",
             "dialect": "mysql"
         }
     }
     ```

   - Once you've added your DB config as listed above, go to the `src` folder from your terminal and execute:

     ```sh
     npx sequelize db:create
     npx sequelize db:migrate
     ```

### Running the Services

Start each service individually (in separate terminals):

```sh
cd AuthService && npm start
cd ../BookingService && npm start
cd ../FlightsAndSearch && npm start
cd ../API_Gateway && npm start
cd ../ReminderService && npm start
```



## API Gateway Base URL

All client requests should be sent to the API Gateway, which acts as the single entry point for the system.

**Base URL:**

```
http://localhost:3000
```

Replace `3000` with your configured port if different.

## API Documentation

Each service exposes its own RESTful API endpoints. Refer to the `Routes/` and `controllers/` folders in each service for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

