// src/config.js
// Picks localhost when you run `npm start` (hostname === 'localhost'),
// otherwise falls back to your Render URL in production.
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'            // ⬅️ local Express server
    : 'https://netlfixback-end-n2ry.onrender.com/api'; // ⬅️ Render deployment

export default API_URL;
