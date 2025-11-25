# Mira Jersey

Mira Jersey is a modern e-commerce platform for selling football jerseys, featuring secure Chapa payment integration, a product catalog, product detail pages, a cart system, and a fully responsive UI. The platform supports searching by club and season, sorting by price, and includes an admin panel for product and order management.

---

## 🏆 Features

### 🛒 User Features
- Browse all jerseys with a clean, modern UI  
- Product detail pages with pricing, season, club, and availability  
- Add jerseys to cart and adjust quantities  
- Checkout with secure **Chapa online payment**  
- Search by **club name**  
- Search by **season**  
- Sort products by **price**  
- Responsive UI optimized for all devices  

### 🔧 Admin Features
- Password-protected admin panel  
- Add / update / delete jerseys  
- Upload jersey images via Cloudinary  
- Manage orders and track payment status  
- View purchased items per order  
- Store Chapa transaction references  

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Tailwind CSS  
- Axios  
- React Router  

### **Backend**
- Node.js  
- Express  
- PostgreSQL  
- Cloudinary  
- Chapa Payment API  
- CORS  


---

## 🗄️ Database Schema

Mira Jersey uses PostgreSQL with four main tables:

```sql
CREATE TABLE IF NOT EXISTS public.jerseys
(
  id SERIAL PRIMARY KEY,
  club VARCHAR(100) NOT NULL,
  # Mira Jersey

  Mira Jersey is a lightweight e-commerce demo for selling football jerseys. It includes a React + Vite frontend and an Express backend with Cloudinary image uploads and Chapa payment integration.

  ## Key Features

  - Browse and search jerseys by club and season
  - Product detail pages with images and pricing
  - Cart and checkout flow with Chapa payment integration
  - Admin features to add/edit/delete products and manage orders
  - Image uploads via Cloudinary
  - Responsive UI built with Tailwind CSS

  ## Tech Stack

  - Frontend: React, Vite, Tailwind CSS, Axios
  - Backend: Node.js, Express
  - Storage: PostgreSQL (expected), Cloudinary for images
  - Payments: Chapa (payment gateway)

  ## Repository Layout

  - `backend/` — Express server, routes, controllers, models
  - `frontend/` — React + Vite application
  - `public/`, `src/` — frontend assets and components

  ## Prerequisites

  - Node.js 16+ and npm
  - PostgreSQL database (or other compatible connection string)
  - Cloudinary account (for image uploads)
  - Chapa account/secret (for payments)

  ## Quick Start (Windows PowerShell)

  Clone the repo and install dependencies for both backend and frontend:

  ```powershell
  git clone https://github.com/dawit-yitbarek/Mira-Jersey.git
  cd Mira-Jersey
  ```

  ### Backend

  ```powershell
  cd backend
  npm install
  # Create .env in backend/ (example below)
  # Start backend
  node server.js
  ```

  Recommended backend `.env` variables (create `backend/.env`):

  - `DATABASE_URL` — PostgreSQL connection string
  - `FRONTEND_URL` — URL of your frontend (e.g. http://localhost:5173)
  - `BACKEND_URL` — URL of this backend (e.g. http://localhost:4000)
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CHAPA_API_SECRET`
  - `PORT` — port to run backend (default in code if not set)

  If the project defines an `npm` start script, you can use `npm start` instead of `node server.js`.

  ### Frontend

  ```powershell
  cd frontend
  npm install
  # Create .env in frontend/ (example below)
  npm run dev
  ```

  Recommended frontend `.env` variables (create `frontend/.env`):

  - `VITE_BACKEND_URL` — API base URL (e.g. http://localhost:4000)
  - `VITE_FRONTEND_URL` — frontend URL (e.g. http://localhost:5173)
  - `VITE_ADMIN_PASSWORD` — admin password used by the app

  ## API (Overview)

  The backend exposes several route groups. Exact routes are defined under `backend/routes/`.

  - `GET /api/products` — list products
  - `GET /api/products/:id` — product details
  - `POST /api/products` — create a product (admin)
  - `PUT /api/products/:id` — update product (admin)
  - `DELETE /api/products/:id` — delete product (admin)

  - `POST /api/orders` — create an order
  - `GET /api/orders` — list orders (admin)

  - `POST /api/payments` — payment webhook/checkout (Chapa integration)

  - `POST /api/upload` — upload image to Cloudinary

  - `POST /api/feedback` — submit feedback

  Use `curl` or Postman to call endpoints. Example (PowerShell):

  ```powershell
  curl -Method GET "http://localhost:4000/api/products"
  ```

  ## Environment & Secrets

  Keep secrets out of version control. Add them to `.env` files or your deployment secret manager.

  ## Deployment

  - Backend: any Node.js host (Heroku, Vercel Serverless functions, DigitalOcean App Platform, etc.)
  - Frontend: static hosting (Netlify, Vercel, GitHub Pages) or served via Vite build

  When deploying, set the same environment variables (DB, Cloudinary, Chapa) in the host's secret manager.