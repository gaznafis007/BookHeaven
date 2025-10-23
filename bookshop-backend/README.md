# Bookshop API

A simple digital product platform API with **referral & credit system**. Users can register, refer others, and earn credits when referrals make their first purchase.

---

## 🚀 Features

- **User Management**: register, fetch users, track referrals.
- **Products**: view products available for purchase.
- **Purchases**: simulate purchases with referral credit logic.
- **Referral System**: both referrer and referred earn 2 credits on first purchase.
- **Health Check**: simple `/api` endpoint to check server status.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Deployment**: Vercel or any Node-compatible host

---

## 🔗 API Endpoints

### Users

| Method | Path                      | Description                                            |
| ------ | ------------------------- | ------------------------------------------------------ |
| GET    | `/api/users`              | Get all users                                          |
| GET    | `/api/users/:id`          | Get a user by ID                                       |
| POST   | `/api/users`              | Create a new user                                      |
| PATCH  | `/api/users/:id/purchase` | Simulate a purchase (updates user credits & referrals) |

**POST body example**:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "referredBy": "REFCODE123" // optional
}
```

**PATCH body example**:

```json
{
  "productId": "1234567890abcdef",
  "title": "Learn TypeScript",
  "description": "Comprehensive TS guide",
  "author": "John Doe",
  "price": 25
}
```

---

### Products

| Method | Path                | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Get all products    |
| GET    | `/api/products/:id` | Get a product by ID |

---

### Health Check

| Method | Path   | Description                                      |
| ------ | ------ | ------------------------------------------------ |
| GET    | `/api` | Check server status (uptime, timestamp, version) |

---

## ⚙️ Setup

1. Clone repository

```bash
git clone <repo-url>
cd bookshop-backend
```

2. Install dependencies

```bash
pnpm install
```

3. Create `.env` file (example)

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bookshop
```

4. Run the server

```bash
pnpm dev
```

Server will run at: `http://localhost:5000/api`

---

## 🛠️ Notes

- Purchases are **simulated** via API PATCH request, no payment integration.
- Credits are awarded **only once per referred user**.
- Sensitive info like passwords are **never returned** in API responses.
- MongoDB schemas ensure data integrity and prevent double-crediting.
