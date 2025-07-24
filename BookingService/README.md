## Welcome to BookingService

The **BookingService** is a core microservice in the AirPass Airline Backend System. It manages flight bookings, cancellations, and related business logic, integrating with other services for a seamless airline experience.

## Features

- Create, update, and cancel flight bookings
- Calculate total cost and manage seat availability
- Integrates with Flight, User, and Reminder services via API Gateway and RabbitMQ
- Handles booking status and business rules

## Folder Structure

```
BookingService/
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
- Service base URLs, database, and RabbitMQ connection details must be set in your `.env` file.

## Running the Service

Start the BookingService with:

```sh
npm start
```

The server will start on the configured port (default: `http://localhost:3002`).

## How It Works

- Exposes RESTful API endpoints for creating, updating, and cancelling bookings.
- Calculates total cost and manages seat availability for each booking.
- Communicates with other services through the API Gateway and RabbitMQ.
- Handles business logic for booking status and notifications.

## API Endpoints

Refer to the `Routes/` and `controllers/` folders for detailed API documentation and available endpoints.

## DB Design

The following table is used in the BookingService:

- **Booking**: Represents a flight booking.
  - Fields: `id`, `flightId`, `userId`, `status` (InProcess, Booked, Cancelled), `noOfSeats`, `totalCost`, `createdAt`, `updatedAt`
  - Relationships: Each booking is associated with a flight and a user.

### Example Sequelize Model Generation

To generate the Booking model using Sequelize CLI:

```sh
npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:string,noOfSeats:integer,totalCost:integer
```

Refer to the model in `src/models/booking.js` for more details on schema and associations.

---

**Note:** Ensure your database is set up and migrated before running the service.

## Troubleshooting

- **Database connection errors:** Ensure your database credentials in `.env` are correct and the database server is running.
- **RabbitMQ connection errors:** Make sure RabbitMQ is running and the URL in `.env` is correct.
- **Port conflicts:** Change the `PORT` variable in your `.env` file if the default port is in use.
