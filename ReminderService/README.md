# ReminderService

The **ReminderService** is a core microservice in the AirPass Airline Backend System. It handles scheduling and sending reminders and notifications to users, integrating with other services for a seamless airline experience.

## Features

- Schedule and send email reminders for bookings
- Integrates with BookingService via RabbitMQ for event-driven notifications
- Uses secure email credentials and message broker configuration

## Folder Structure

```
ReminderService/
  src/
    config/
    controllers/
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

Each folder contains code and resources for a specific concern (e.g., controllers for request handling, services for business logic, etc.).

---

For setup, configuration, and usage instructions, refer to the rest of this README below.

## Configuration

- The default port and other settings can be configured using environment variables (see `.env.example`).
- Email credentials, message broker, and binding keys must be set in your `.env` file.

## Running the Service

Start the ReminderService with:

```sh
npm start
```

The server will start on the configured port (default: `http://localhost:3004`).

## How It Works

- Listens for booking events from BookingService via RabbitMQ
- Schedules and sends email reminders to users based on booking status and timing
- Handles business logic for notifications and error handling

## API Endpoints

Refer to the `Routes/` and `controllers/` folders for detailed API documentation and available endpoints.


## DB Design

The following table is used in the ReminderService:

- **NotificationTicket**: Represents a scheduled notification or reminder.
  - Fields: `id`, `subject`, `content`, `recepientEmail`, `status` (PENDING, SUCCESS, FAILED), `notificationTime`, `createdAt`, `updatedAt`

### Example Sequelize Model Generation

To generate the NotificationTicket model using Sequelize CLI:

```sh
npx sequelize model:generate --name NotificationTicket --attributes subject:String,content:String,recepientEmail:String,status:String,notificationTime:Date
```

Refer to the model in `src/models/notificationticket.js` for more details on schema and associations.

---

**Note:** Ensure your database is set up and migrated before running the service.

## Troubleshooting

- **Email errors:** Ensure your email credentials in `.env` are correct and the email provider allows SMTP access.
- **RabbitMQ connection errors:** Make sure RabbitMQ is running and the URL in `.env` is correct.
- **Port conflicts:** Change the `PORT` variable in your `.env` file if the default port is in use.