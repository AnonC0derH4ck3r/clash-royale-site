# 🏆 Clash Royale Stats Viewer

A sleek and modern web application to view Clash Royale player stats, battle logs, current deck, upcoming chests, and more — powered by the official Clash Royale API.

---

## 📦 Tech Stack

- ⚛️ React (Vite)
- 🎨 Custom CSS (no Tailwind)
- 🔧 Node.js + Express backend (API proxy)
- ☁️ Netlify (Frontend Hosting)
- ☁️ Render (Backend Hosting)
- 🔐 Clash Royale Developer API

---

## 🚀 Features

- 🔍 Enter any player tag to view stats
- 🃏 See player’s current deck and full card collection
- 👑 View battle logs with opponent info and team cards
- 📅 Upcoming chest cycle viewer
- 🧠 Automatically formats card levels and 2v2 matches
- 🇮🇳 Displays battle time in Indian Standard Time (IST)

---

## 🛠 Setup Locally

### 1. Clone the project
```bash
git clone https://github.com/your-username/clash-royale-site
cd clash-royale-site
```

### 2. Install frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Install backend
```bash
cd ../backend
npm install
```

Create a `.env` file:
```
API_KEY=your_supercell_api_key_here
```

Then run the server:
```bash
node proxy.js
```

By default:
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5001`

---

## 🌐 Deployment

### Frontend:
- Push frontend code to GitHub
- Deploy to **Netlify**
- Set build command: `npm run build`
- Set publish directory: `dist`

### Backend:
- Push backend to GitHub
- Deploy to **Render.com**
- Set build command: `npm install`
- Set start command: `node proxy.js`
- Add environment variable:
  ```
  API_KEY = your_clash_api_key
  ```

---

## 🔒 API Key Notice

Your Clash Royale Developer API Key must **never be exposed on the frontend**.  
This app safely proxies all requests through your backend so the key stays private.

---

## 👑 Credits

Created with 💙 by Huzefa Khalil Dayanji

Data provided by [Clash Royale Developer API](https://developer.clashroyale.com/)
