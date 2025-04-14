// src/config.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || '';

export { API_URL, TMDB_API_KEY };
