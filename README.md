# Modern Portfolio & Digital Agency Platform

A comprehensive full-stack web application designed for digital agencies. It features a stunning, high-performance landing page and a robust admin panel for managing content dynamically. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Technologies Used

### Frontend
- **React (Vite)**: Fast and modern UI library.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive design.
- **Axios**: HTTP client for API communication.
- **React Router DOM**: Client-side routing.
- **Heroicons**: Beautiful hand-crafted SVG icons.

### Backend
- **Node.js & Express.js**: Scalable server-side runtime and framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **Multer & Sharp**: Professional image upload handling with automatic resizing and optimization.
- **Cors & Dotenv**: Security and configuration management.

---

## 📂 Project Structure

```
/
├─ frontend/                # React Frontend
│  ├─ src/
│  │  ├─ pages/             # Page Components (Landing, Admin)
│  │  ├─ components/        # Reusable UI Components
│  │  ├─ services/          # API Configuration
│  │  ├─ App.jsx            # Routing & Layout
│  │  └─ main.jsx           # Entry Point
│  └─ tailwind.config.js    # Tailwind Setup
├─ backend/                 # Express Backend
│  ├─ src/
│  │  ├─ controllers/       # Business Logic
│  │  ├─ models/            # Database Schemas
│  │  ├─ routes/            # API Endpoints
│  │  ├─ middlewares/       # Auth & File Uploads
│  │  ├─ uploads/           # Image Storage
│  │  └─ server.js          # App Initializer
│  ├─ .env                  # Environment Variables
│  └─ package.json
├─ seed/                    # Database Seeder
│  └─ seed.js
└─ README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

**Environment Variables**: Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/modern_portfolio
ADMIN_TOKEN=secret_admin_token_123
FRONTEND_URL=http://localhost:5173
```

**Run Server**:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Run Client**:
```bash
npm run dev
# App will open at http://localhost:5173
```

---

## 💾 Seed Database
Populate your database with sample projects and clients:

```bash
cd backend
npm run seed
```

---

## 🔐 Admin Access
1. Go to `http://localhost:5173/admin/login`
2. Enter the **Admin Token** defined in your `.env` (default: `secret_admin_token_123`).
3. You will be redirected to the Dashboard.

---

## 📡 API Endpoints

| Method | Endpoint         | Description           | Access |
|--------|------------------|-----------------------|--------|
| GET    | /api/projects    | List all projects     | Public |
| POST   | /api/projects    | Create project        | Admin  |
| PUT    | /api/projects/:id| Update project        | Admin  |
| DELETE | /api/projects/:id| Delete project        | Admin  |
| GET    | /api/clients     | List all clients      | Public |
| POST   | /api/clients     | Add client review     | Admin  |
| POST   | /api/contact     | Submit contact form   | Public |
| GET    | /api/contact     | View messages         | Admin  |
| POST   | /api/newsletter  | Subscribe             | Public |

---

## ✨ Features
- **Responsive Design**: Looks great on Mobile, Tablet, and Desktop.
- **Image Processing**: Uploaded images are automatically cropped and resized to 450x350px.
- **Secure Admin Panel**: Protected routes with token-based authentication.
- **Dynamic Content**: All sections of the landing page (Projects, Clients) are fetched from the database.

---

## 📦 Deployment

### Backend (Render/Heroku)
1. Push code to GitHub.
2. Link repository to Render/Heroku.
3. Set Environment Variables in the dashboard.
4. Deploy `backend` folder as root if possible, or adjust build settings.

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Import project in Vercel.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add `VITE_API_URL` environment variable pointing to your deployed backend.

---
**Enjoy building! 🚀**
