
## API Gateway

The **API Gateway** is the single entry point for all client requests in the AirPass microservices architecture. It handles routing, authentication, request validation, and aggregation for backend services.

## Features

- Centralized routing to backend microservices
- Authentication and authorization middleware
- Rate limiting to prevent abuse and DDoS attacks
- Request/response logging with Morgan
- Proxying requests to appropriate services

## Configuration

- The default port is set to PORT with the help of environment variable (see `index.js`).
- Ensure the base URLs for AuthService and BookingService are set correctly in your `.env` file, and that your code loads them from environment variables.
- Set up any required environment variables in a `.env` file or in your configuration files.

## Running the API Gateway

Start the API Gateway server with:

```sh
npm start
```

The server will start on the configured port (default: `http://localhost:3005`).

## How It Works

- All requests to `/bookingservice` are authenticated by forwarding the token to the AuthService.
- If authentication succeeds, the request is proxied to the BookingService.
- Rate limiting is applied (max 50 requests per 2 minutes per IP).
- All requests and responses are logged.

## Example Request Flow

1. **Client** sends a request to `http://localhost:3005/bookingservice/...` with a valid `x-access-token` header.
2. **API Gateway** validates the token by calling the AuthService.
3. If valid, the request is forwarded to the BookingService.
4. The response from the BookingService is returned to the client.

## Troubleshooting

- **401 Unauthorized:** Ensure you are sending a valid `x-access-token` header.
- **Connection errors:** Make sure AuthService and BookingService are running and accessible at the URLs specified in `index.js`.
- **Port conflicts:** Change the `PORT` variable in '.env' if the default port is in use.
