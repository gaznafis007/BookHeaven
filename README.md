# Bookshop

A full-stack web application for buying and managing books with referral and credit system.

---

## Features

- User authentication: Signup and Login
- Referral system with credits
- Purchase books using credits
- View purchased books
- Copy referral code
- Responsive UI built with Next.js and Tailwind CSS

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Sonner (for toast notifications)
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** Password hashing with bcrypt
- **State Management:** React Context API
- **Deployment:** Vercel (frontend & backend)

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/bookshop.git
cd bookshop
```

2. **Install dependencies for frontend and backend:**

```bash
# Frontend
cd bookshop-frontend
npm install

# Backend
cd ../bookshop-backend
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. **Run the app:**

```bash
# Start backend
cd bookshop-backend
npm run dev

# Start frontend
cd ../bookshop-frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure
