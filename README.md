🎵 Simple Music Playlist App

A full-stack web application for creating and managing your own music playlist — including user authentication, song uploads (file or URL), and playback using React, Node.js, MongoDB, and JWT.

🚀 Features

🔐 User Authentication (Login/Register)

🎷 Add Songs via:

File upload (MP3)

YouTube URL

📜 View Playlist with:

Title & Artist

Embedded audio or YouTube player

❌ Delete Songs

🔍 Search & Filter by title or artist

📂 MongoDB Database

🌐 REST API with token-based authentication

📱 Fully responsive (Mobile, Tablet, Desktop)

🛠️ Tech Stack

🔹 Frontend

React + Vite

Tailwind CSS

Axios

React Router

🔸 Backend

Node.js

Express

MongoDB (Mongoose)

Multer (for file uploads)

JSON Web Token (JWT)

dotenv

📁 Project Structure

Simple Music App/
├── Client/           # React Frontend
├── backend/          # Express + MongoDB Backend
└── README.md

🔧 Setup Instructions

🔹 Backend (Node.js)

cd backend
npm install
npm start

Ensure .env contains:

MONGO_URI=mongodb://127.0.0.1:27017/simple_music_app
JWT_SECRET=c1730bec5a2d30ecacab1a19dc34a6f403eb18b39e53ef274d0ada2e5ee265f32d6fe383d5c7fdec3e2ff37cf07b64ec81013ee66e1022b1a7f32a156303142e
PORT=5000

🔹 Frontend (React)

cd Client
npm install
npm run dev

App will run on: http://localhost:5173

🙇‍♂️ Author

👤 Ankit Mandaliya

