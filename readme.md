# 🌿 Vruddha Mitra – Organisation Dashboard

**Vruddha Mitra (वृद्ध मित्र)** is an initiative to bridge the gap between elderly individuals (Vruddhas) and compassionate volunteers (Mitras). This repository contains the **Organisation-side Dashboard** used by NGOs/admins to manage elderly data, volunteers, visit bookings, and analytics.

---

## 🔧 Built With

- ⚡ [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- 🎨 Tailwind CSS
- 🛢️ Supabase (PostgreSQL + Auth + Storage)
- 🔐 Supabase Auth + Role-based Access
- 📊 Recharts (for visual analytics)
- 📁 Modular Folder Structure

---

## 🚀 Features

- ✅ **Admin Authentication**
- 👵 **Manage Vruddha Profiles** (Create, Update, View, Delete)
- 🤝 **Manage Mitra Details** (Volunteers)
- 📅 **Booking System** (Schedule visits between Mitras and Vruddhas)
- 📈 **Dashboard Analytics** (Visits, engagement, activity)
- 🗣️ **Feedback & Advisory System**
- 📷 **Profile Images via Supabase Storage**
- 🌐 **Responsive UI**

---

## 📂 Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Main route-based pages (using react-router)
├── services/ # Supabase integration & API calls
├── lib/ # Utility functions
├── hooks/ # Custom hooks
├── assets/ # Images, icons, etc.
└── App.jsx # Root app component

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/vruddha-mitra-org.git
cd vruddha-mitra-org
```

npm install

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

npm run dev

App will run at: http://localhost:5173

🗃️ Database Schema (Supabase)
vruddhas: id, firstName, lastName, age, gender, description, likes, dislikes, visits, currentStatus, image, advise

mitras: id, name, email, contact, skills, availability, assignedVruddhas

bookings: id, vruddha_id, mitra_id, date, status, review

🔐 Auth & Access Control
Admins only (via Supabase Auth)

Role-based routing using client-side guards

🌍 Deployment
Easily deployable via:

Vercel

Netlify

Firebase Hosting

Just add your environment variables on the platform’s dashboard.

🤝 Contribution Guidelines
We welcome contributions from developers and volunteers who want to make a difference.

Fork the repo

Create a feature branch (feat/your-feature)

Push your changes

Open a PR

📄 License
MIT License
© 2025 Vruddha Mitra Team

❤️ A project for empathy, dignity, and care
python
Copy
Edit

---

Let me know if you'd like to add:

- Screenshots or logos
- API route structure
- Volunteer-side README
- Deployment script section

I'm happy to help tailor this further for your project.
