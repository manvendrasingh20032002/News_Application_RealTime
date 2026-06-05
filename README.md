# 📰 Real-Time News Application

A modern, responsive, and feature-rich full-stack news aggregator built using React, Vite, Bootstrap, and Vercel Serverless Functions.

🚀 **[View Live Demo](https://news-application-real-time.vercel.app/)**

---

## ✨ Features

- **Real-Time News Aggregation:** Fetches the latest global news stories dynamically via the NewsAPI integration.
- **Multilingual Support:** Supports viewing articles in multiple languages including Hindi, English, French, Spanish, and German.
- **Dynamic Search:** Seamlessly search for any keyword or topic instantly using the real-time search bar.
- **Infinite Scrolling:** Enjoy smooth article loading while browsing, built with `react-infinite-scroll-component` for a premium user experience.
- **CORS Bypass via Serverless Backend:** Utilizes **Vercel Serverless Functions (`api/news.js`)** as a secure backend proxy to solve browser CORS domain blocks, keeping API keys hidden and requests fast.
- **Responsive Layout:** Beautiful, sleek, and fully mobile-friendly design utilizing Bootstrap cards.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router (Search Params), Vite, Bootstrap 5
- **Backend (Serverless):** Node.js / Vercel Serverless API Router
- **News Provider:** NewsAPI.org

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/manvendrasingh20032002/News_Application_RealTime.git
cd News_Application_RealTime
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

---

## 📦 Deployment

This application is configured for automatic deployment on Vercel. 
The `/api/news.js` file is executed server-side on Vercel Node.js runtime, routing API requests dynamically and avoiding CORS errors on production domains.

---

*Created for educational purposes and portfolio showcase.*
