import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import '../styles/AccountHomePage.css'; // or your movie page style

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

const Movies = () => {
  const [rows, setRows] = useState({});
  const [coverMovie, setCoverMovie] = useState(null);

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

  // Random cover from popular movies
  const fetchCover = async () => {
    try {
      const res = await axios.get(`${BASE}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);
      const picks = res.data.results.slice(0, 4);
      const random = picks[Math.floor(Math.random() * picks.length)];
      setCoverMovie(random);
    } catch (err) {
      console.error('Failed to fetch cover movie:', err);
    }
  };

  useEffect(() => {
    fetchCover();

    // Example rows for Movies:
    fetchRow('matched', '/discover/movie?sort_by=popularity.desc', 10);
    fetchRow('top10', '/movie/top_rated?region=US', 10);
    fetchRow('love', '/discover/movie?sort_by=popularity.desc');
    fetchRow('animation', '/discover/movie?with_genres=16');
    fetchRow('inspiring', '/search/movie?query=inspiring');
    fetchRow('watchlist', '/discover/movie?sort_by=popularity.desc'); // or use your custom watchlist logic
    fetchRow('weekend', '/discover/movie?with_runtime.lte=90');
    fetchRow('critics', '/movie/top_rated');
    fetchRow('fresh', '/discover/movie?sort_by=vote_average.desc');
    // Add more if you like
  }, []);

  return (
    <AppLayout>
      {/* Pass an "activePage" prop or similar to highlight Movies in your menu */}
      <Menu activePage="movies" />

      <main className="homepage-container">
        {/* Cover Section */}
        <section
          className="cover-section"
          style={{
            backgroundImage: coverMovie
              ? `url(https://image.tmdb.org/t/p/original${coverMovie.backdrop_path})`
              : undefined,
          }}
        >
          <div className="cover-overlay">
            <div className="cover-content">
              <p className="cover-subtitle">
                <span className="n-letter">N</span> S E R I E S
              </p>
              <h1 className="cover-title">
                {coverMovie?.title || coverMovie?.name}
              </h1>
              <p className="cover-description">
                {coverMovie?.overview}
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

        {/* Movie Rows */}
        <MovieRow title="Matched for You" movies={rows.matched} />
        <MovieRow title="Top 10 Movies in the U.S. Today" movies={rows.top10} showRanking={true} />
        <MovieRow title="We Think You'll Love These" movies={rows.love} />
        <MovieRow title="Animation" movies={rows.animation} />
        <MovieRow title="Inspiring Movies" movies={rows.inspiring} />
        <MovieRow title="Continue Watching for You" movies={rows.watchlist} />
        <MovieRow title="Watch in One Weekend" movies={rows.weekend} />
        <MovieRow title="Critically Acclaimed" movies={rows.critics} />
        <MovieRow title="Today's Fresh Picks for You" movies={rows.fresh} />
      </main>

      <AccountFooter />
    </AppLayout>
  );
};

export default Movies;
