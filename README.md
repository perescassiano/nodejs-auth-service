# User Authentication API

This API provides endpoints for user authentication, registration, and password reset.

## Getting Started

To get started with the User Authentication API, follow the steps below:

1. Clone the repository: https://github.com/perescassiano/nodejs-auth-service.git

2. Install the dependencies:

- ```cd nodejs-auth-service ```
- ``` npm install ```

3. Set up the environment variables:

- Create a `.env` file in the root directory.
- Define the following environment variables in the `.env` file:
  - `DB_HOST`: Database host
  - `DB_PORT`: Database port
  - `DB_NAME`: Database name
  - `JWT_SECRET`: Secret key for JWT authentication

5. The API will be available at `http://localhost:3000`.

4. Start the server:

- ``` npm start ```

## Endpoints

### Sign Up

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  - `email` (`string`): User's email address.
  - `password` (`string`): User's password.
  - `name` (`string`): User's name.
- **Response:**
  - Success: `200 OK`
  - Error: `400 Bad Request`

### Sign In

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and generates an access token.
- **Request Body:**
  - `email` (`string`): User's email address.
  - `password` (`string`): User's password.
- **Response:**
  - Success: `200 OK` with access token in response body.
  - Error: `401 Unauthorized`

### Request Reset Password

- **URL:** `/auth/requestResetPassword`
- **Method:** `POST`
- **Description:** Sends a password reset email to the user.
- **Request Body:**
  - `email` (`string`): User's email address.
- **Response:**
  - Success: `200 OK`
  - Error: `400 Bad Request`

### Reset Password

- **URL:** `/auth/resetPassword`
- **Method:** `POST`
- **Description:** Resets the user's password.
- **Request Body:**
  - `email` (`string`): User's email address.
  - `password` (`string`): User's new password.
  - `token` (`string`): Reset password token received via email.
- **Response:**
  - Success: `200 OK`
  - Error: `400 Bad Request`

## Todo 

- **Unit tests:** Create unit tests for the authentication endpoints
- **Integration tests:** Create integration tests for the authentication flow
- **Field validation:** Implement field validation for user input
- **Email validation:** Validate email field for correct format
- **Password validation:** Validate password field for minimum length and complexity requirements
- **Name validation:** Validate name field for presence and length constraints
- **Refactor:** Refactor and upgrade the code
