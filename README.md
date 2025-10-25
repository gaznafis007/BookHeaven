# 📚 **BookHeaven — Referral-Based Digital Bookstore** 🚀

Welcome to **BookHeaven**, a modern, minimal full-stack web app where users can **buy books using credits**, **earn rewards through referrals**, and **manage purchases** — all through a sleek and responsive UI.

## 🔑 **Core Features**

- 👤 **User Authentication**

  - Secure signup and login powered by a custom authentication system.

- 🎁 **Referral System**

  - Every user receives a **unique referral code**.
  - When someone signs up using your referral link, **both users earn 2 credits**.
  - Credits are only awarded on the **first purchase** made by a referred user.

- 💰 **Credit-Based Purchases**

  - Use earned credits to purchase books directly within the app.

- 📚 **Book Store**

  - Browse, explore, and purchase books through a simple and elegant UI.

- 🧾 **User Dashboard**

  - Track total credits, referred users, and past purchases with ease.

- 🧠 **Core Logic Overview**

  - Referral bonuses: **2 credits each** (referrer + referred user)
  - Prevents duplicate crediting and fraudulent bonuses
  - Credits are automatically deducted upon purchase
  - Clean, responsive UI for a seamless experience

## 🧩 **Tech Stack**

| Area               | Technology                                          |
| ------------------ | --------------------------------------------------- |
| **Frontend**       | Next.js · TypeScript · Tailwind CSS · Shadcn/UI     |
| **Backend**        | Node.js · TypeScript · Express · MongoDB (Mongoose) |
| **Authentication** | Custom auth system                                  |
| **Deployment**     | Vercel                                              |

## 🚀 **Getting Started (Local Setup)**

Follow these steps to run **BookHeaven** locally.

### 🖥️ **Clone the Repository**

```bash
git clone https://github.com/Gazi2050/BookHeaven.git

cd BookHeaven
```

---

### 🌐 **Frontend Setup**

```bash
cd frontend

pnpm install

pnpm run dev
```

- Access frontend at: [http://localhost:3000](http://localhost:3000)

---

### ⚙️ **Backend Setup**

```bash
cd ../backend

cp .env.example .env

pnpm install

pnpm run dev
```

- Access backend at: [http://localhost:5000](http://localhost:5000)

---

## 📂 **Project Structure**

### 🖥️ Frontend (`frontend`)

```
frontend/
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── src/
│   ├── app/
│   │   ├── books/
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── custom/
│   │   │   ├── AuthForm.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Services.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── sonner.tsx
│   ├── context/AuthContext.tsx
│   ├── lib/utils.ts
│   └── types/types.ts
└── tsconfig.json
```

### ⚙️ Backend (`backend`)

```
backend/
├── .env.example
├── package.json
├── tsconfig.json
├── src/
│   ├── server.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── users.route.ts
│   │   └── products.route.ts
│   ├── core/
│   │   └── users.core.ts
│   ├── db/
│   │   ├── db.ts
│   │   └── schema/
│   │       ├── users.schema.ts
│   │       └── products.schema.ts
│   ├── utils/logger.ts
│   └── validator/users.validator.ts
```

### 🔗 **API Endpoints**

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
