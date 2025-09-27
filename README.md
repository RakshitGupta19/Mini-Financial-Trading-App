## Mini Financial Trading App

A full-stack mini trading platform built with **React, Node.js, Express, and MongoDB**.  
This app simulates a financial trading environment with **authentication, KYC, product listing, buying transactions, portfolio tracking, and a watchlist**.

## Features

- **User Authentication (JWT)** — Secure login & signup with password hashing.  
- **KYC Verification** — Collects user info (name, email, PAN) and uploads an ID proof.  
- **Wallet Balance** — Each user gets ₹100,000 virtual wallet to invest.  
- **Product Listing & Details** — View stocks & mutual funds with details & price chart.  
- **Buy Transactions** — Purchase products, deduct wallet balance, and track history.  
- **Portfolio Dashboard** — View invested amount, current value, and returns in real time.  
- **Watchlist** — Add or remove products to a personal watchlist.  
- **Responsive UI** — Mobile-friendly design with Tailwind CSS.  

---

## Tech Stack

**Frontend**: React, React Router, Axios, Tailwind CSS, Recharts (charts)  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Multer (file uploads)  

---

## Quick Start
##Backend

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-financial-trading-app.git
cd mini-financial-trading-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```
## Create a .env file inside the backend/ folder:
```bash
PORT=port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start the backend server:
```bash
npm start
```

## Frontend
1. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Project will start working

## API Documentation

## API Documentation

Base URL (local development):

http://localhost:5000/api

## Authentication
**POST /auth/signup**
Function: Create a new user account and return JWT token & wallet.

**POST /auth/login**
Function: Log in existing user and return JWT token & wallet.

**GET /auth/me (Protected)**
Function: Get current user’s profile and wallet.

## KYC
**POST /kyc (Protected)**
Function: Submit or update KYC details (name, email, PAN, upload ID proof).

**GET /kyc (Protected)**
Function: Retrieve current user’s KYC details.

## Products

**GET /products**
Function: Get all products (stocks & mutual funds).

**GET /products/:id**
Function: Get product details and dummy price history for charts.

## Transactions

**POST /tx/buy (Protected)**
Function: Buy units of a product. Deducts wallet and stores transaction.

**GET /tx/me (Protected)**
Function: Get current user’s all transactions.

## Portfolio

**GET /portfolio/me (Protected)**
Function: Get summary of user’s investments.

## Watchlist

**GET /products/me/watchlist (Protected)**
Function: Get user’s watchlist products.

**POST /products/:id/watch (Protected)**
Function: Add product to watchlist.

**DELETE /products/:id/watch (Protected)**
Function: Remove product from watchlist.
