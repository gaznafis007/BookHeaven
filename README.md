# 📚 **BookHeaven — Referral-Based Digital Bookstore** 🚀

Welcome to **BookHeaven**, a modern, minimal full-stack web app where users can **buy books using credits**, **earn rewards through referrals**, and **manage purchases** — all through a sleek and responsive UI.

## 🌐 Live URLs
- **Frontend:** [bookheavenn.vercel.app](https://bookheavenn.vercel.app)
- **Backend API:** [bookshop-backend-api.vercel.app/api](https://bookshop-backend-api.vercel.app/api)  

## 🔑 **Core Features**
- 👤 **User Authentication** – Secure signup and login.
- 🎁 **Referral System** – Earn 2 credits each for referrer & referred on first purchase.
- 💰 **Credit-Based Purchases** – Buy books using credits.
- 📚 **Book Store** – Browse and explore books.
- 🧾 **User Dashboard** – Track credits, referred users, and purchases.
- 🧠 **Core Logic** – Automatic credit deduction and referral bonuses.

## 🧩 **Tech Stack**
| Area               | Technology                                          |
| ------------------ | --------------------------------------------------- |
| **Frontend**       | Next.js · TypeScript · Tailwind CSS · Shadcn/UI     |
| **Backend**        | Node.js · TypeScript · Express · MongoDB (Mongoose) |
| **Authentication** | Custom auth system                                  |
| **Deployment**     | Vercel                                              |

## 🚀 **Getting Started**
### Frontend
```bash
cd frontend
pnpm install
pnpm run dev
````

* Local URL: [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
cp .env.example .env
pnpm install
pnpm run dev
```

* Local URL: [http://localhost:5000](http://localhost:5000)

---

## 🔗 **API Endpoints**

### 👤 `/api/users`

| Method    | Endpoint              | Description                         |
| --------- | --------------------- | ----------------------------------- |
| **GET**   | `/users`              | Get all users                       |
| **GET**   | `/users/:id`          | Get a user by ID                    |
| **POST**  | `/users`              | Register a new user                 |
| **POST**  | `/users/login`        | Log in a user                       |
| **PATCH** | `/users/:id/purchase` | Handle purchases & referral rewards |

### 📘 `/api/products`

| Method  | Endpoint        | Description              |
| ------- | --------------- | ------------------------ |
| **GET** | `/products`     | Fetch all books          |
| **GET** | `/products/:id` | Fetch book details by ID |

---

```mermaid
sequenceDiagram
    participant Client
    participant UsersRoute as "Users Route"
    participant ProductsRoute as "Products Route"
    participant Core as "Users Core"
    participant UserModel as "User Model"
    participant ProductModel as "Product Model"
    participant UsersDB as "Users Collection"
    participant ProductsDB as "Products Collection"

    %% Users: Fetch Users
    Client->>UsersRoute: GET /users or /users/:id
    UsersRoute->>Core: getAllUsers / getUserById
    Core->>UserModel: query user(s)
    UserModel->>UsersDB: read from DB
    UsersDB-->>UserModel: return user(s)
    UserModel-->>Core: user data
    Core-->>UsersRoute: user data
    UsersRoute-->>Client: JSON response

    %% Users: Create & Login
    Client->>UsersRoute: POST /users
    UsersRoute->>Core: createUser(data)
    Core->>UserModel: validate, hash password, create user
    UserModel->>UsersDB: insert user
    UsersDB-->>UserModel: new user
    Core-->>UsersRoute: return user (no password)
    UsersRoute-->>Client: JSON response

    Client->>UsersRoute: POST /users/login
    UsersRoute->>Core: loginUser(email, password)
    Core->>UserModel: find by email
    UserModel->>UsersDB: query
    UsersDB-->>UserModel: user
    Core->>Core: verify password
    Core-->>UsersRoute: return user (no password)
    UsersRoute-->>Client: JSON response

    %% Users: Purchase Flow
    Client->>UsersRoute: PATCH /users/:id/purchase
    UsersRoute->>Core: handlePurchase(userId, productData)
    Core->>UserModel: check credits, add product, apply referral
    note right of Core: Referral logic:\n+2 credits to referrer & user if first purchase
    Core->>ProductModel: update purchasedBy
    UserModel->>UsersDB: save user
    ProductModel->>ProductsDB: save product
    UsersDB-->>Core: confirmation
    ProductsDB-->>Core: confirmation
    Core-->>UsersRoute: updated user & referrer info
    UsersRoute-->>Client: JSON response

    %% Products endpoints
    Client->>ProductsRoute: GET /products or /products/:id
    ProductsRoute->>ProductModel: fetch product(s)
    ProductModel->>ProductsDB: query
    ProductsDB-->>ProductModel: return product(s)
    ProductModel-->>ProductsRoute: product data
    ProductsRoute-->>Client: JSON response
```
