# 💰 Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a backend system for a finance dashboard that manages financial records and enforces role-based access control.

It allows users to create, manage, and analyze financial transactions based on their roles. The system is designed with a focus on clean architecture, proper API design, and secure data handling.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login and registration
* Role-based access control:

  * **Viewer** → Can view dashboard only
  * **Analyst** → Can view transactions & analytics
  * **Admin** → Full access (CRUD operations)

---

### 💰 Financial Records Management

* Create transactions (income/expense)
* View transactions
* Update transactions
* Delete transactions
* Filter by:

  * Type (income/expense)
  * Category

---

### 📊 Dashboard & Analytics

* Total Income
* Total Expense
* Net Balance
* Category-wise breakdown
* Monthly trends

---

### ⚙️ Optional Enhancements Implemented

* Pagination for transaction listing
* Filtering using query parameters
* Input validation for data integrity
* Proper error handling with status codes

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Token (JWT)

---

## 📁 Project Structure

```
finance-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── transactionController.js
│   └── dashboardController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Transaction.js
│
├── routes/
│   ├── authRoutes.js
│   ├── transactionRoutes.js
│   └── dashboardRoutes.js
│
├── server.js
├── .env
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/YOUR_USERNAME/finance-backend.git
cd finance-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Auth

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

---

### 👤 Protected Routes

* `GET /api/auth/profile` → Get user profile
* `GET /api/auth/admin` → Admin-only route

---

### 💰 Transactions

* `POST /api/transactions` → Create transaction (Admin only)
* `GET /api/transactions` → Get transactions (Admin, Analyst)
* `PUT /api/transactions/:id` → Update transaction (Admin only)
* `DELETE /api/transactions/:id` → Delete transaction (Admin only)

---

### 📊 Dashboard

* `GET /api/dashboard` → Summary
* `GET /api/dashboard/categories` → Category-wise stats
* `GET /api/dashboard/monthly` → Monthly trends

---

## 🔐 Access Control Logic

Access control is implemented using middleware:

* **Viewer:** Cannot create or modify records
* **Analyst:** Can view transactions and analytics
* **Admin:** Full access to all operations

---

## ⚠️ Validation & Error Handling

* Required fields are validated
* Invalid inputs are rejected with proper messages
* HTTP status codes are used correctly:

  * `400` → Bad Request
  * `401` → Unauthorized
  * `403` → Forbidden
  * `404` → Not Found
  * `500` → Server Error

---

## 💾 Data Persistence

* MongoDB is used as the database
* Mongoose is used for schema design and data modeling
* Data is stored persistently and structured efficiently

---

## 📌 Assumptions

* Each user manages their own transactions
* Role permissions are predefined
* Authentication is handled using JWT tokens

---

## 📈 Future Improvements

* API documentation (Swagger)
* Unit and integration testing
* Rate limiting
* Soft delete functionality

---


