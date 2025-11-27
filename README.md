# 🌟 SkillSwap Hub

**SkillSwap Hub** is a modern **skill sharing and learning platform** built with **Next.js (App Router)** and **NextAuth.js** for authentication. Users can browse, learn, and share skills seamlessly, with private pages for managing and adding skills.

🔗 **Live Demo:** [SkillSwap Hub](https://skillswap-hub-nine.vercel.app/)

---

## 📝 Project Overview

SkillSwap Hub allows users to:

- Browse latest skills and search by category or keyword.
- Add and manage their own skills (protected routes).
- View detailed skill info with description, price, level, and tags.
- Login/Register using Google or credentials (email/password).
- Enjoy a responsive, polished UI with Tailwind CSS and interactive components.

---

## 🏠 Pages Overview

### 1. Landing Page
- **Navbar:** Logo, 4 main routes, login/register or user dropdown, sticky & responsive.
- **Hero Section:** Headline, subtitle, CTA buttons.
- **Features Section:** Highlight main platform features.
- **Latest Skills:** Grid of latest added skills.
- **How It Works:** Step-by-step guide for using the platform.
- **Testimonials Section:** User feedback.
- **Footer:** Links, copyright, consistent spacing.

### 2. Authentication Pages
- **Login:** Google login + credentials form.
- **Register:** Name, email, photo URL, password validation.
- Redirects to `/` after successful login.

### 3. Skills Pages
- **All Skills Page:** Grid of skill cards with image/icon, title, short description, price/level, and “View Details” button.
- **Skill Details Page:** Large image/banner, full description, meta info (price, rating, tags), back button.

### 4. Protected Pages
- **Add Skill:** Only accessible to logged-in users.
  - Form fields: Title, Description, Price, Rating, Level, Tags, Requirements, Learning Outcomes, Icon.
  - Success message on submission.
- **Manage Skills:** View, Edit, Delete all skills added by the logged-in user.
- **Edit Skill:** Prefilled form to update a skill.

---

## ⚡ Features

- User authentication via NextAuth.js (Google + Credentials).
- Protected routes for managing and adding skills.
- Responsive and polished UI using Tailwind CSS.
- Dynamic skill listing with search/filter functionality.
- Toast/SweetAlert2 notifications for success/error.
- Interactive UI: hover/focus effects, consistent spacing, cards, and forms.

---

## 🛠️ Technologies & Packages

- **Frontend:** Next.js, React, Tailwind CSS, React Icons, SweetAlert2.
- **Backend:** MongoDB (with Node.js/Express for API if needed).
- **Authentication:** NextAuth.js (JWT strategy, Google + Credentials).
- **Deployment:** Vercel (frontend + backend combined).

**Dependencies (npm)**

```json
{
  "dependencies": {
    "axios": "^1.13.2",
    "bcrypt": "^6.0.0",
    "mongodb": "^7.0.0",
    "next": "16.0.3",
    "next-auth": "^4.24.13",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-icons": "^5.5.0",
    "sweetalert2": "^11.26.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.0.3",
    "tailwindcss": "^4"
  }
}
````

### 💻 Local Setup

1. **Clone the repository**  
 ```base
  git clone https://github.com/siam-khan-alt/skill-swap-hub.git
cd skillswap-hub
npm install
npm run dev
````


 2. **Setup Environment Variables**

#### Create a `.env` file in the root and add your Firebase config
```base
 GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
MONGODB_URI=your_mongodb_connection_string

