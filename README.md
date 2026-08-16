# Client Acquisition Platform

Premium lead-generation website + mini CRM for a senior AI full-stack developer.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Nodemailer
- Tailwind CSS
- Framer Motion
- Axios

## Run

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173.

The contact form works in development without MongoDB by returning a clear configuration error; configure MongoDB/SMTP in `.env` for persistence and email notifications.

See `server/.env.example`.
