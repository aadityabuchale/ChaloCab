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
