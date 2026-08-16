# Premium Web Development Client Acquisition Platform & Lead CRM

A modern, high-conversion full-stack web application designed for professional developers and tech leads to attract clients, capture project ideas, and manage lead pipelines.

Built with **React 18, Node.js, Express.js, MongoDB, Mongoose, Tailwind CSS, Framer Motion, and Nodemailer**.

---

## 🚀 Key Features

1. **Conversion-Focused Public Site**:
   - **Hero Section**: Strong headline *"Turn Your Ideas Into High-Performance Digital Products."* with CTAs.
   - **Services Page**: 8 specialized service cards (Web App, React, Node.js API, MERN, AI Applications, SaaS, API Integration, Business Websites).
   - **Filterable Portfolio Catalog**: Dynamic category filtering (React, MERN, Node.js, AI, SaaS, Business Websites) with detailed case study drawers.
   - **Interactive 7-Step Development Roadmap**: Discovery -> Requirements -> UI/UX -> Development -> Testing -> Launch -> Support.
   - **About Developer**: Career timeline, MCA background, enterprise achievements, and configurable stats.
   - **FAQs & Testimonials**: Interactive accordions and client quote cards.

2. **Lead Intake & Anti-Spam System**:
   - **Interactive Modal & Dedicated Contact Page**: Project Type options, Budget Range pills, Timeline selector, detailed idea message, and referral source.
   - **Honeypot Protection**: Invisible field defense against automated bot spam.
   - **Express Rate Limiting**: IP submission throttle defense.

3. **Automated Nodemailer Engine**:
   - **Developer Email Alert**: Sends complete lead details (Name, Email, Phone, Company, Type, Budget, Timeline, Message) to developer's inbox.
   - **Client Confirmation Email**: Instant auto-acknowledgement email to the client confirming receipt and expected next steps.

4. **Secure Admin Lead CRM Dashboard (`/admin`)**:
   - **JWT Auth**: Password hashing with `bcryptjs`.
   - **Lead Management Table**: Real-time status updates (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`), lead deletion, and internal admin notes logger.
   - **Portfolio Projects Manager**: Add/Edit/Delete portfolio projects in MongoDB with live URLs, GitHub repos, and technology tags.

---

## 🛠️ Project Structure

```
client-acquisition-platform/
├── client/                      # React 18 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, LeadIntakeModal, ProjectCard, ProjectModal, ProcessTimeline
│   │   ├── pages/              # HomePage, ServicesPage, ProjectsPage, AboutPage, ContactPage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/           # Axios API services (leadsApi, projectsApi, authApi, statsApi)
│   │   ├── App.jsx             # React Router v6 setup & modal state
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                      # Node.js + Express + MongoDB Backend
    ├── src/
    │   ├── config/             # MongoDB Mongoose connection
    │   ├── controllers/        # Lead, Project, Auth, Testimonial, FAQ, Stats controllers
    │   ├── middleware/         # JWT protect, rateLimiter, errorHandler
    │   ├── models/             # Lead, Project, Testimonial, FAQ, User models
    │   ├── routes/             # REST API routes
    │   ├── seeders/            # Database seeder (seed.js)
    │   ├── services/           # Nodemailer email notification engine
    │   ├── app.js              # Express app setup
    │   └── server.js           # Server listener
    ├── .env                    # Environment variables
    └── package.json
```

---

## 🚦 Quick Start Instructions

### 1. Database Seeding & Setup
Navigate to `server/` and run the seeder script to populate default data and create the default admin user:
```bash
cd server
npm run seed
```

Default Admin Credentials created by seeder:
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@sunvix.com`
- **Password**: `AdminSecret123!`

### 2. Run Backend API Server
```bash
cd server
npm run dev
# Server running at http://localhost:5000
```

### 3. Run Frontend React App
```bash
cd client
npm run dev
# Frontend running at http://localhost:5173
```

---

## ⚙️ Environment Variables Configuration (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/client_acquisition_db
JWT_SECRET=super_secret_jwt_key_client_acquisition_2026_8912
JWT_EXPIRES_IN=7d

# Nodemailer Settings (Default dummy values fallback to console logger in dev)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=surajkumarmca1993@gmail.com
CLIENT_EMAIL_FROM="Suraj Kumar - Lead Tech <no-reply@devagency.com>"

CLIENT_URL=http://localhost:5173
```
