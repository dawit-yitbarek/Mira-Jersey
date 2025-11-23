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
  season VARCHAR(20) NOT NULL,
  price INTEGER NOT NULL,
  available INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.orders
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  chapa_tx_ref VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.order_items
(
  id SERIAL PRIMARY KEY,
  order_id UUID,
  jersey_id INTEGER,
  quantity INTEGER NOT NULL,
  CONSTRAINT order_items_jersey_id_fkey FOREIGN KEY (jersey_id)
    REFERENCES public.jerseys (id) ON DELETE NO ACTION,
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id)
    REFERENCES public.orders (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.feedback
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  rating INTEGER NOT NULL,
  quote TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


⚙️ Installation & Setup

Clone the repository and install dependencies for both backend and frontend:

git https://github.com/dawit-yitbarek/Mira-Jersey.git
cd Mira-Jersey


📦 Backend Setup
cd backend
npm install


Create a .env file inside /backend:

DATABASE_URL=your_postgres_url
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CHAPA_API_SECRET=your_chapa_secret
PORT=port_number


Start the backend:
node server.js

💻 Frontend Setup
cd frontend
npm install


Create a .env file inside /frontend:

VITE_BACKEND_URL=your_backend_url
VITE_FRONTEND_URL=your_frontend_url
VITE_ADMIN_PASSWORD=your_admin_passkey


Start the frontend:
npm run dev

🌐 Deployment

Frontend deployed at:
https://mirajersey.netlify.app/