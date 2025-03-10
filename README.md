# Currency-Exchange-Rate-Hub

## 📌 Overview

Currency Exchange Rate Hub is a Node.js and PostgreSQL-based application that fetches, caches, and serves exchange rates. It supports real-time and historical exchange rates, leverages Redis caching for efficiency, and periodically updates data using a cron job.

## ⚡ Tech Stack

- Node.js - Backend framework

- Express.js - API framework

- PostgreSQL - Relational database

- Redis - Caching layer

- Sequelize - ORM for PostgreSQL

- node-cron - Scheduled tasks

- Jest - Testing framework

## ⚙️ Features

✅ Fetch latest exchange rates from OpenExchangeRates API

✅ Fallback to secondary API if the primary one fails

✅ Historical exchange rates for a specific date range

✅ In-memory caching (Redis) to reduce database load

✅ Auto-updates exchange rates every 5 minutes using node-cron

✅ Fast and scalable API with Express.js

✅ Jest tests to ensure functionality

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

`git clone https://github.com/yourusername/currency-exchange-rate-hub.git
cd currency-exchange-rate-hub`

### 2️⃣ Install dependencies

`npm install`

### 3️⃣ Set up environment variables

Create a .env file and add your API keys:

```PORT=3000
DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/yourdb
REDIS_URL=redis://localhost:6379
FETCH_RATE_INTERVAL=*/5 * * * * # Fetch every 5 minutes

OPENEXCHANGE_API_KEY=your_openexchange_api_key
OPENEXCHANGE_BASE_URL=https://openexchangerates.org/api

EXCHANGERATES_API_KEY=your_exchangerates_api_key
EXCHANGERATES_BASE_URL=http://api.exchangeratesapi.io/v1/
```

### 4️⃣ Start PostgreSQL & Redis

Ensure PostgreSQL and Redis are running:

`sudo service postgresql start`

`redis-server`

### 5️⃣ Start the application

`npm start`

***The server runs at http://localhost:3000 🚀***

------
## 🔥 API Endpoints

### 📍 1. Get Latest Exchange Rates
```
GET /api/rates/latest

Response:

{
  "USD": 1.0,
  "EUR": 0.925,
  "GBP": 0.78,
  "JPY": 110.05
}
```
### 📍 2. Convert Currency
```
GET /api/convert?from=USD&to=EUR&amount=100

Response:

{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "convertedAmount": 92.5,
  "rate": 0.925
}
```
###📍 3. Get Historical Rates for a Date
```
GET /api/rates/historical?date=2024-03-01

Response:

{
  "EUR": 0.925,
  "GBP": 0.78,
  "JPY": 110.05
}
```
### 📍 4. Get Historical Rates for a Date Range
```
GET /api/rates/history?pair=USD-EUR&start=2024-03-01&end=2024-03-05

Response:

{
  "2024-03-01": 0.925,
  "2024-03-02": 0.926,
  "2024-03-03": 0.927
}
```
## 🔄 Scheduled Auto-Updates

The system fetches latest exchange rates every 5 minutes.

Uses **node-cron** to automatically update exchange rates from APIs.

## ✅ Running Tests

The project includes Jest tests for API endpoints.

Run all tests:

```npm test```

