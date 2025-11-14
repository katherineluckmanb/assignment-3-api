# assignment-3-api

## Project Description

This is a simple CRUD project using node.js, express, prisma, and postgreSQL. This project provides CRUD operations of items through /api/items

## API endpoints

### Get All items

Returns all items that exist in the database

route: GET /api/items

Response:
{
"id": 2,
"name": "katherine",
"createdAt": "2025-11-14T13:47:34.853Z",
"updatedAt": "2025-11-14T13:47:34.853Z"
}

### Get items by id

Return an item based on the id that is in the param

route: GET /api/items/:id

Response:
{
"id": 2,
"name": "katherine",
"createdAt": "2025-11-14T13:47:34.853Z",
"updatedAt": "2025-11-14T13:47:34.853Z"
}

### Create item

Create item, it requires name

route: POST /api/items

Response:
{
"message": "Item created successfully",
"item": {
"id": 3,
"name": "mochi",
"createdAt": "2025-11-14T13:52:10.192Z",
"updatedAt": "2025-11-14T13:52:10.192Z"
}
}

if name is not included
Response:
{
"message": "Failed creating item"
}

### Update item

Update an item based on the id that is sent, requires name

route: PUT /api/items/:id

Response:
{
"message": "Item updated successfully",
"item": {
"id": 2,
"name": "Sophia",
"createdAt": "2025-11-14T13:47:34.853Z",
"updatedAt": "2025-11-14T13:54:00.330Z"
}
}

### Delete item

Delete an item based on the id that is send

route: DELETE /api/items/:id

Response:
{
"message": "Item deleted successfully",
"item": {
"id": 3,
"name": "mochi",
"createdAt": "2025-11-14T13:52:10.192Z",
"updatedAt": "2025-11-14T13:52:10.192Z"
}
}

## Setup Instructions

clone the repository

### install dependencies

npm install

### setup your .env

DATABASE_URL="postgresql://postgres:your-user@localhost:5432/your-db?schema=public"

PORT=3000

### initialize prisma

npx prisma migrate dev --name init

npx prisma generate

### run the server

npm run dev

server will start at localhost:3000
![screenshot of API](./Screenshot%202025-11-14%20205936.png)
![screenshot of API](./Screenshot%202025-11-14%20210016.png)
![screenshot of API](./Screenshot%202025-11-14%20210042.png)
![screenshot of API](./Screenshot%202025-11-14%20210100.png)
![screenshot of API](./Screenshot%202025-11-14%20210126.png)
