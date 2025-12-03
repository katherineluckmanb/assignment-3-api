# assignment-3-api

## Project Description

This is a simple CRUD project using node.js, express, prisma, and postgreSQL. This project provides CRUD operations of items through /api/items

## API endpoints

### Get All items

Returns all items that exist in the database

route: GET /api/items

Response:

```json
{
  "id": 2,
  "name": "katherine",
  "createdAt": "2025-11-14T13:47:34.853Z",
  "updatedAt": "2025-11-14T13:47:34.853Z"
}
```

### Get items by id

Return an item based on the id that is in the param

route: GET /api/items/:id

```json
Response:
{
    "id": 2,
    "name": "katherine",
    "createdAt": "2025-11-14T13:47:34.853Z",
    "updatedAt": "2025-11-14T13:47:34.853Z"
}
```

### Create item

Create item, it requires name

route: POST /api/items

Response:

```json
{
  "message": "Item created successfully",
  "item": {
    "id": 3,
    "name": "mochi",
    "createdAt": "2025-11-14T13:52:10.192Z",
    "updatedAt": "2025-11-14T13:52:10.192Z"
  }
}
```

if name is not included
Response:

```json
{
  "message": "Failed creating item"
}
```

### Update item

Update an item based on the id that is sent, requires name

route: PUT /api/items/:id

Response:

```json
{
  "message": "Item updated successfully",
  "item": {
    "id": 2,
    "name": "Sophia",
    "createdAt": "2025-11-14T13:47:34.853Z",
    "updatedAt": "2025-11-14T13:54:00.330Z"
  }
}
```

### Delete item

Delete an item based on the id that is send

route: DELETE /api/items/:id

Response:

```json
{
  "message": "Item deleted successfully",
  "item": {
    "id": 3,
    "name": "mochi",
    "createdAt": "2025-11-14T13:52:10.192Z",
    "updatedAt": "2025-11-14T13:52:10.192Z"
  }
}
```

## Setup Instructions

clone the repository

### install dependencies

```
npm install
```

### setup your .env

below is an example to setup your .env

```
DATABASE_URL="postgresql://postgres:your-user@localhost:5432/assignment3?schema=public"

PORT=3000
```

### initialize prisma

Below command is to generate table and make sure the db to have the same name assignment3

```
npx prisma migrate dev --name init

npx prisma generate
```

### run the server

```
npm run dev
```

server will start at localhost:3000
![screenshot of API](./screenshot/Screenshot%202025-11-14%20205936.png)
![screenshot of API](./screenshot/Screenshot%202025-11-14%20210016.png)
![screenshot of API](./screenshot/Screenshot%202025-11-14%20210042.png)
![screenshot of API](./screenshot/Screenshot%202025-11-14%20210100.png)
![screenshot of API](./screenshot/Screenshot%202025-11-14%20210126.png)

---

# Update for assignment 4

---

Added JWT for authentication and authorization of the system and also seeder for the database

to run the seeder run the following command below make sure to have the same database name: assignment3

```
npx prisma seed
```

after generating seeder your database should be filled with some data
![screenshot of API](./screenshot/screenshot-items-db.png)

![screenshot of API](./screenshot/screenshot-users-db.png)

# Updated API endpoints

### Register a user

Register a user to the system. Register user are only user roles which are non admin
body request should consist of the following json

```json
{
  "email": "test@example.com",
  "password": "your-password",
  "username": "your-username"
}
```

Route: POST /api/register
Successful response:

```json
{
  "message": "User registered successfully"
}
```

![screenshot of API](./screenshot/screenshot-of-register.png)

### Logging in a user

This api endpoint is to login to the user to obtain bearer token for their own authorization and authentication
in the seeder there is a role of an admin in and admin has the capability to change people roles and also access to get the whole user database

Route: POST /api/login

```json
{
  "email": "admin@example.com",
  "username": "admin123"
}
```

successful response would return the berear token:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDc2Mjg2NiwiZXhwIjoxNzY0ODQ5MjY2fQ.16kEIC-b_8gR_jBIShBXjwVxjXJl7_EBWdbtWgvWtZA"
}
```

![screenshot of API](./screenshot/screenshot-login-as-admin.png)

with the bearer token now we can access various endpoints for user

### Get user details

This api endpoint is to get the user's own details by using the bearer token provided

Route: GET /api/users/me

successful response:

```json
{
  "user": {
    "email": "admin@example.com",
    "username": "admin",
    "role": "admin"
  }
}
```

### Update user details

This endpoint is to change user details
it can be only email or username in the body request
for ex:

```json
{
  "username": "admin admin"
}
```

Route: PUT /api/users/me
successful response:

```json
{
  "message": "User profile updated successfully",
  "user": {
    "id": 3,
    "email": "admin@example.com",
    "username": "admin admin",
    "role": "admin"
  }
}
```

Other user would not be able to change other users own details as in the system the system decides who is who by attaching the decode token to the req.user which is shown in the authController.js and in the middleware which decodes the sign token. The token are sign with a secret key which is shown in the .env.example.

```
 const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

```

and

````
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
    ```
````

### Get all user details

This endpoint is to get all user detail and only an admin can do it

Route: GET /api/users/all

the result is the screenshot below:
![screenshot-of-API](./screenshot/screenshot-get-user-alll.png)

now if we try to login as a user instead of an admin

![screenshot-of-api](./screenshot/screenshot-get-user-detail-role-user.png)
![screenshot-of-api](./screenshot/screenshot-access-denied-for-role.png)

### Changing people role as an admin

This endpoint is only able for an admin to do it

Route: PUT /api/users/:id
:id is the id of the intended user that wants to be switch

![screenshot-of-api](./screenshot/screenshot-update-user-role.png)

### Change password

this endpoint is for user to change their own password
to change password user has to enter their current password and new password
expected request ex:

```json
{
  "currentPassword": "admin123",
  "newPassword": "IamADMIN"
}
```

Route: PUT /api/users/change-password
![screenshot-of-api](./screenshot/screenshot-change-password.png)
