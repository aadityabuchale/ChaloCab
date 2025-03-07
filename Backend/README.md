# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description

This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user, generates a JWT token, and returns the token along with the user data.

### Request Body

The request body should be a JSON object with the following fields:

-   `fullname`: An object containing:
    -   `firstname` (string): The first name of the user (minimum 3 characters).
    -   `lastname` (string): The last name of the user (minimum 3 characters).
-   `email` (string): The email address of the user (must be a valid email).
-   `password` (string): The password for the user account (minimum 3 characters).

Example:

```json
{
	"fullname": {
		"firstname": "John",
		"lastname": "Doe"
	},
	"email": "john.doe@example.com",
	"password": "password123"
}
```

### Response

The response should be a JSON object with the following fields:

-   `user` :
    -   `fullname`: An object containing:
        -   `firstname`: The first name of the user (minimum 3 characters).
        -   `lastname`: The last name of the user (minimum 3 characters).
    -   `email`: The email address of the user (must be a valid email).
    -   `password`: The password for the user account (minimum 3 characters).
-   `token` : JWT token

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description

This endpoint authenticates a user, generates a JWT token, and sets it in cookies.

### Request Body

The request body should be a JSON object with the following fields:

-   `email` (string): The email address of the user (must be a valid email).
-   `password` (string): The password for the user account (minimum 6 characters).

Example:

```json
{
	"email": "john.doe@example.com",
	"password": "password123"
}
```

### Response

The response will be a JSON object with the following fields:

-   `ok` (boolean): Indicates if the login was successful.
-   `message` (string): Success or error message.
-   `token` (string): JWT token for authentication.

# User Profile Endpoint Documentation

## Endpoint: `/users/user-profile`

### Method: GET

### Description

This endpoint retrieves the profile information of the authenticated user. Requires a valid JWT token.

### Headers

-   `Authorization`: Bearer token (JWT token received after login)

### Response

The response will be a JSON object with the following fields:

-   `ok` (boolean): Indicates if the request was successful.
-   `message` (string): Success or error message.
-   `user`: Object containing user details:
    -   `fullname`: Object containing first and last name
    -   `email`: User's email address

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: POST

### Description

This endpoint logs out the user by blacklisting their JWT token and clearing the cookie.

### Headers

-   `Authorization`: Bearer token (JWT token to be invalidated)

### Response

The response will be a JSON object with the following fields:

-   `ok` (boolean): Indicates if the logout was successful.
-   `message` (string): Success or error message.
