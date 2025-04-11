import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import '../styles/AccountHomePage.css'; // or your tv show page style

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

const TvShows = () => {
  const [rows, setRows] = useState({});
  const [coverShow, setCoverShow] = useState(null);

  // Reusable fetcher with optional limit
  const fetchRow = async (key, url, limit = 20) => {
    try {
      const res = await axios.get(`${BASE}${url}&api_key=${API_KEY}`);
      const limited = res.data.results.slice(0, limit);
      setRows((prev) => ({ ...prev, [key]: limited }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };

  // Random cover from popular TV shows
  const fetchCover = async () => {
    try {
      const res = await axios.get(`${BASE}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`);
      const picks = res.data.results.slice(0, 4);
      const random = picks[Math.floor(Math.random() * picks.length)];
      setCoverShow(random);
    } catch (err) {
      console.error('Failed to fetch cover show:', err);
    }
  };

  useEffect(() => {
    fetchCover();

    // Example rows for TV shows:
    fetchRow('matched', '/discover/tv?sort_by=popularity.desc', 10);
    fetchRow('netflix', '/discover/tv?with_networks=213', 10); // Netflix shows
    fetchRow('top10', '/tv/top_rated?region=US', 10);
    fetchRow('animation', '/discover/tv?with_genres=16');
    fetchRow('adultAnimation', '/discover/tv?with_genres=16&include_adult=true');
    // Add more categories if you like
  }, []);

  return (
    <AppLayout>
      {/* Pass an "activePage" prop or similar to highlight TV in your menu */}
      <Menu activePage="tvshows" />

      <main className="homepage-container">
        {/* Cover Section */}
        <section
          className="cover-section"
          style={{
            backgroundImage: coverShow
              ? `url(https://image.tmdb.org/t/p/original${coverShow.backdrop_path})`
              : undefined,
          }}
        >
          <div className="cover-overlay">
            <div className="cover-content">
              <p className="cover-subtitle">
                <span className="n-letter">N</span> S E R I E S
              </p>
              <h1 className="cover-title">
                {coverShow?.name || coverShow?.title}
              </h1>
              <p className="cover-description">
                {coverShow?.overview}
              </p>
              <button className="more-info-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                           10-4.48 10-10S17.52 2 12 2zm0 
                           3c.83 0 1.5.67 1.5 1.5S12.83 
                           8 12 8s-1.5-.67-1.5-1.5S11.17 
                           5 12 5zm1 13h-2v-6h2v6z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </section>

        {/* TV Show Rows */}
        <MovieRow title="Matched for You" movies={rows.matched} />
        <MovieRow title="Now on Netflix" movies={rows.netflix} />
        <MovieRow title="Top 10 TV Shows in the U.S. Today" movies={rows.top10} showRanking={true} />
        <MovieRow title="Animation" movies={rows.animation} />
        <MovieRow title="Adult Animation" movies={rows.adultAnimation} />
      </main>

      <AccountFooter />
    </AppLayout>
  );
};

export default TvShows;


