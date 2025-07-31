# API Documentation

This document provides documentation for the API endpoints in the project.

## Base URL

`http://localhost:3000`

## Authentication

All endpoints that require authentication expect a JWT token to be passed in the `Authorization` header.

`Authorization: Bearer <token>`

---

## Products

### `GET /products`

Retrieves a list of all products.

**Responses:**

*   `200 OK`: A list of products.

### `GET /products/{productId}`

Retrieves a specific product by its ID.

**Parameters:**

*   `productId` (string): The ID of the product to retrieve.

**Responses:**

*   `200 OK`: The product object.
*   `404 Not Found`: The product with the specified ID was not found.

### `POST /products`

Creates a new product.

**Request Body:**

```json
{
  "name": "string",
  "price": "number"
}
```

**Responses:**

*   `201 Created`: The new product object.
*   `400 Bad Request`: The request body is invalid.

### `PUT /products/{productId}`

Updates a product.

**Parameters:**

*   `productId` (string): The ID of the product to update.

**Request Body:**

```json
{
  "name": "string",
  "price": "number"
}
```

**Responses:**

*   `200 OK`: The updated product object.
*   `400 Bad Request`: The request body is invalid.
*   `404 Not Found`: The product with the specified ID was not found.

### `DELETE /products/{productId}`

Deletes a product.

**Parameters:**

*   `productId` (string): The ID of the product to delete.

**Responses:**

*   `200 OK`: A success message.
*   `404 Not Found`: The product with the specified ID was not found.

---

## Orders

### `GET /orders`

Retrieves a list of all orders.

**Responses:**

*   `200 OK`: A list of orders.

### `GET /orders/{orderId}`

Retrieves a specific order by its ID.

**Parameters:**

*   `orderId` (string): The ID of the order to retrieve.

**Responses:**

*   `200 OK`: The order object.
*   `404 Not Found`: The order with the specified ID was not found.

### `POST /orders`

Creates a new order.

**Request Body:**

```json
{
  "productId": "string",
  "quantity": "number"
}
```

**Responses:**

*   `201 Created`: The new order object.
*   `400 Bad Request`: The request body is invalid.

### `DELETE /orders/{orderId}`

Deletes an order.

**Parameters:**

*   `orderId` (string): The ID of the order to delete.

**Responses:**

*   `200 OK`: A success message.
*   `404 Not Found`: The order with the specified ID was not found.

---

## Users

### `POST /users/signup`

Creates a new user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**

*   `201 Created`: The new user object.
*   `400 Bad Request`: The request body is invalid.
*   `409 Conflict`: A user with the specified email already exists.

### `POST /users/login`

Logs in a user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**

*   `200 OK`: A JWT token.
*   `401 Unauthorized`: Invalid credentials.

### `DELETE /users/{userId}`

Deletes a user.

**Parameters:**

*   `userId` (string): The ID of the user to delete.

**Responses:**

*   `200 OK`: A success message.
*   `404 Not Found`: The user with the specified ID was not found.
