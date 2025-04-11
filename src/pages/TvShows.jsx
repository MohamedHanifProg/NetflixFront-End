
// ✅ TvShows.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import MovieDetailsModal from '../components/DetailsModal/MovieDetailsModal';
import '../styles/AccountHomePage.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

const TvShows = () => {
  const [rows, setRows] = useState({});
  const [coverShow, setCoverShow] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRow = async (key, url, limit = 20) => {
    try {
      const res = await axios.get(`${BASE}${url}&api_key=${API_KEY}`);
      const limited = res.data.results.slice(0, limit);
      setRows((prev) => ({ ...prev, [key]: limited }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };

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

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchCover();
    fetchRow('matched', '/discover/tv?sort_by=popularity.desc', 10);
    fetchRow('netflix', '/discover/tv?with_networks=213', 10);
    fetchRow('top10', '/tv/top_rated?region=US', 10);
    fetchRow('animation', '/discover/tv?with_genres=16');
    fetchRow('adultAnimation', '/discover/tv?with_genres=16&include_adult=true');
  }, []);

  return (
    <AppLayout>
      <Menu activePage="tvshows" />
      <main className="homepage-container">
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
              <button className="more-info-btn" onClick={() => handleMoreInfo(coverShow)}>
                More Info
              </button>
            </div>
          </div>
        </section>

        <MovieRow title="Matched for You" movies={rows.matched} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Now on Netflix" movies={rows.netflix} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Top 10 TV Shows in the U.S. Today" movies={rows.top10} showRanking={true} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Animation" movies={rows.animation} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Adult Animation" movies={rows.adultAnimation} onMoreInfo={handleMoreInfo} />
      </main>
      <AccountFooter />
      <MovieDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movie={selectedMovie} />
    </AppLayout>
  );
};

export default TvShows;
