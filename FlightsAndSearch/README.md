## FlightsAndSearch Service

The **FlightsAndSearch** service is a core component of the AirPass Airline Backend System. It manages flight schedules, airports, cities, and provides search functionalities for users and other services.

## Features

- Manage flights, airports, and cities
- Search for available flights
- CRUD operations for flight-related entities
- Integrates with other microservices via API Gateway and message queues

## Folder Structure

```
FlightsAndSearch/
  src/
    config/
    controllers/
    middlewares/
    migrations/
    models/
    respository/
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

For setup, configuration, database design, and usage instructions, refer to the rest of this README below.

## Configuration

- The default port and other settings can be configured using environment variables (see `.env.example`).
- Database and RabbitMQ connection details must be set in your `.env` file.

## Running the Service

Start the FlightsAndSearch service with:

```sh
npm start
```

The server will start on the configured port (default: `http://localhost:3003`).

## How It Works

- Exposes RESTful API endpoints for managing and searching flights, airports, and cities.
- Communicates with other services through the API Gateway and RabbitMQ.
- Handles business logic related to flight search and management.

## API Endpoints

Refer to the `Routes/` and `controllers/` folders for detailed API documentation and available endpoints.


## DB Design

The following tables and relationships are used in the FlightsAndSearch service:

- **City**: Represents a city.
  - Fields: `id`, `name`, `createdAt`, `updatedAt`
  - Relationships: One city has many airports.

- **Airport**: Represents an airport.
  - Fields: `id`, `name`, `address`, `cityId`, `createdAt`, `updatedAt`
  - Relationships: Each airport belongs to a city.

- **Airplane**: Represents an airplane.
  - Fields: `id`, `modelNumber`, `capacity`, `createdAt`, `updatedAt`

- **Flights**: Represents a flight.
  - Fields: `id`, `flightNumber`, `airplaneId`, `departureAirportId`, `arrivalAirportId`, `departureTime`, `arrivalTime`, `createdAt`, `updatedAt`
  - Relationships: Each flight is associated with an airplane, a departure airport, and an arrival airport.

### Example Sequelize Model Generation

To generate the Airport model using Sequelize CLI:

```sh
npx sequelize model:generate --name Airport --attributes name:String,address:String,cityId:integer
```

Refer to the models in `src/models/` for more details on schema and associations.

---

**Note:** Ensure your database is set up and migrated before running the service.

## Troubleshooting

- **Database connection errors:** Ensure your database credentials in `.env` are correct and the database server is running.
- **RabbitMQ connection errors:** Make sure RabbitMQ is running and the URL in `.env` is correct.
- **Port conflicts:** Change the `PORT` variable in your `.env` file if the default port is in use.

