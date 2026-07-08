# PulseFit Studio

A polished beginner-friendly gym management application built with Node.js, Express.js, SQLite, and vanilla HTML/CSS/JavaScript. It demonstrates MVC structure, REST API development, authentication, authorization ideas, password hashing, logging, and database modeling.

## Features
- User registration and login
- JWT-based authentication
- Class management
- Booking overview
- Dashboard stats
- Logging middleware

## Tech Stack
- Node.js
- Express.js
- SQLite with better-sqlite3
- JWT and bcryptjs
- Vanilla frontend

## Project Structure
- src/app.js - main Express application
- src/controllers - request handlers
- src/models - data access logic
- src/routes - route definitions
- src/config/database.js - database setup
- db/schema.sql - DDL script
- public/index.html - frontend UI

## Database Schema
The schema is stored in db/schema.sql.

## Run Locally
1. Install dependencies: npm install
2. Start the server: npm start
3. Open http://localhost:3000

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/classes
- POST /api/classes
- GET /api/bookings
- POST /api/bookings
- GET /api/dashboard

## Notes for Learning
This project is intentionally simple so you can understand each layer of an MVC app.
