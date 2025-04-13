// src/pages/AccountHomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import MovieDetailsModal from '../components/DetailsModal/MovieDetailsModal';
import '../styles/AccountHomePage.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
;
const BASE = 'https://api.themoviedb.org/3';

const AccountHomePage = () => {
  const [rows, setRows] = useState({});
  const [coverMovie, setCoverMovie] = useState(null);
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Reusable fetcher for movie rows
  const fetchRow = async (key, url, limit = 20) => {
    try {
      const connector = url.includes('?') ? '&' : '?';
      const res = await axios.get(`${BASE}${url}${connector}api_key=${API_KEY}`);
      const limited = res.data.results.slice(0, limit);
      setRows((prev) => ({ ...prev, [key]: limited }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };

  // Fetch a popular cover movie or TV show
  const fetchCover = async () => {
    try {
      const [moviesRes, tvRes] = await Promise.all([
        axios.get(`${BASE}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`),
        axios.get(`${BASE}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`)
      ]);

      const movies = moviesRes.data.results.map(m => ({ ...m, media_type: 'movie' }));
      const tvShows = tvRes.data.results.map(t => ({ ...t, media_type: 'tv' }));

      const combined = [...movies.slice(0, 2), ...tvShows.slice(0, 2)];
      const random = combined[Math.floor(Math.random() * combined.length)];
      setCoverMovie(random);
    } catch (err) {
      console.error('Failed to fetch cover movie:', err);
    }
  };

  useEffect(() => {
    fetchCover();
    fetchRow('matched', '/discover/movie?sort_by=popularity.desc', 10);
    fetchRow('netflix', '/discover/tv?with_networks=213', 10);
    fetchRow('top10', '/movie/top_rated?region=US', 10);
    fetchRow('love', '/discover/movie?sort_by=popularity.desc');
    fetchRow('animation', '/discover/movie?with_genres=16');
    fetchRow('inspiring', '/search/movie?query=inspiring');
    fetchRow('watchlist', '/discover/movie?sort_by=popularity.desc');
    fetchRow('weekend', '/discover/movie?with_runtime.lte=90');
    fetchRow('critics', '/movie/top_rated');
    fetchRow('fresh', '/discover/movie?sort_by=vote_average.desc');
    fetchRow('adultAnimation', '/discover/tv?with_genres=16&include_adult=true');
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <Menu />

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
                <span className="n-letter">N</span>{' '}
                {coverMovie?.media_type === 'tv' ? 'S E R I E S' : 'M O V I E S'}
              </p>
              <h1 className="cover-title">
                {coverMovie?.title || coverMovie?.name}
              </h1>
              <p className="cover-description">
                {coverMovie?.overview}
              </p>
              <button
                className="more-info-btn"
                onClick={() => handleMoreInfo(coverMovie)}
              >
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
        <MovieRow title="Matched for You" movies={rows.matched} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Now on Netflix" movies={rows.netflix} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Top 10 movies in the U.S. Today" movies={rows.top10} showRanking={true} onMoreInfo={handleMoreInfo} />
        <MovieRow title="We Think You'll Love These" movies={rows.love} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Animation" movies={rows.animation} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Inspiring Movies" movies={rows.inspiring} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Continue Watching for You" movies={rows.watchlist} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Watch in One Weekend" movies={rows.weekend} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Critically Acclaimed" movies={rows.critics} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Today's Fresh Picks for You" movies={rows.fresh} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Adult Animation" movies={rows.adultAnimation} onMoreInfo={handleMoreInfo} />
      </main>

      <AccountFooter />

      {/* Modal with selected movie */}
      <MovieDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        movie={selectedMovie}
      />
    </AppLayout>
  );
};

export default AccountHomePage;
