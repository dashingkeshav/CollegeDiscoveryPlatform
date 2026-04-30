<<<<<<< HEAD
# EduNexus - College Discovery Platform MVP

A full-stack College Discovery and Decision platform designed to be beautiful, fast, and highly functional. 
This project was built to showcase a premium user experience and robust architecture, utilizing the latest web technologies.

## 🌟 Implemented Features

1. **College Listing + Search**: Infinite scroll, fast UI with dynamic search and filtering by location/fees.
2. **College Detail Page**: Dynamic page featuring college overview, courses, rating, and fee breakdowns.
3. **Compare Colleges (High Priority)**: A dedicated tool to select up to 3 colleges and compare their core metrics side-by-side.
4. **Simple Predictor Tool**: AI-driven mock rank predictor that suggests top colleges based on user's competitive exam rank.
5. **Auth + Saved Items**: Users can save their favorite colleges to a personalized shortlist (Mock Auth flow integrated for MVP).

## 🚀 Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4 (Custom Oceanic Blue Glassmorphism Theme)
- **Backend**: Node.js, Express.js, TypeScript, REST APIs
- **Database**: Prisma ORM, SQLite (Pre-configured for zero-setup execution), supports PostgreSQL.

---

## 💻 How to Run Locally

### 1. Start the Backend

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. The database is pre-seeded via Prisma (SQLite). To start the server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`*

### 2. Start the Frontend

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The app will start on `http://localhost:3000`*

---

## 🌍 Deployment Guide (MANDATORY)

### Frontend Deployment (Vercel)
1. Push the `frontend` folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Set the Root Directory to `frontend`.
5. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api`
6. Click **Deploy**.

### Backend Deployment (Railway / Render)
1. Push the `backend` folder to a GitHub repository.
2. **Switch to PostgreSQL**: Open `backend/prisma/schema.prisma` and change `provider = "sqlite"` to `provider = "postgresql"`. Remove `url = "file:./dev.db"` and add `url = env("DATABASE_URL")`.
3. Go to [Railway](https://railway.app/) and create a new project.
4. Add a PostgreSQL database to your project.
5. Connect your GitHub repository and deploy the `backend` folder.
6. Railway will automatically inject the `DATABASE_URL` environment variable.
7. Set your Start Command to `npm run build && npm start`.
8. Ensure you run `npx prisma db push && npm run seed` in your deployment process to seed the remote database.

## 🎨 Design Philosophy
The platform utilizes a highly vibrant "Indigo & Pink Light Theme" with glassmorphism overlays to ensure the recruiter gets a premium "Wow" factor immediately upon load. The UI is built entirely as a light-mode layout with stunning gradients, large drop-shadows, and smooth micro-animations. It uses realistic advanced datasets with real high-resolution images to feel fully production-ready.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> origin/master
