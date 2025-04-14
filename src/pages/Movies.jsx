import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import MovieDetailsModal from '../components/DetailsModal/MovieDetailsModal';
import '../styles/AccountHomePage.css';
import API_URL from '../config';

const BASE = `${API_URL}/movies`; // ✅ RESTful base

const Movies = () => {
  const [rows, setRows] = useState({});
  const [coverMovie, setCoverMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRow = async (key, endpoint) => {
    try {
      const res = await axios.get(`${BASE}/${endpoint}`);
      const results = res.data.results || res.data || [];
      setRows(prev => ({ ...prev, [key]: results }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };

  const fetchCover = async () => {
    try {
      const res = await axios.get(`${BASE}/cover`);
      setCoverMovie(res.data);
    } catch (err) {
      console.error('Failed to fetch cover movie:', err);
    }
  };

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchCover();
    fetchRow('matched', 'matched');     // 10 items
    fetchRow('top10', 'top10');         // 10 items
    fetchRow('love', 'love');           // all
    fetchRow('animation', 'animation'); // all
    fetchRow('inspiring', 'inspiring'); // all
    fetchRow('watchlist', 'watchlist'); // all
    fetchRow('weekend', 'weekend');     // all
    fetchRow('critics', 'critics');     // all
    fetchRow('fresh', 'fresh');         // all
  }, []);

  return (
    <AppLayout>
      <Menu activePage="movies" />
      <main className="homepage-container">
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
                <span className="n-letter">N</span> M O V I E S
              </p>
              <h1 className="cover-title">{coverMovie?.title}</h1>
              <p className="cover-description">{coverMovie?.overview}</p>
              <button className="more-info-btn" onClick={() => handleMoreInfo(coverMovie)}>
                More Info
              </button>
            </div>
          </div>
        </section>

        <MovieRow title="Matched for You" movies={rows.matched} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Top 10 Movies in the U.S. Today" movies={rows.top10} showRanking={true} onMoreInfo={handleMoreInfo} />
        <MovieRow title="We Think You'll Love These" movies={rows.love} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Animation" movies={rows.animation} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Inspiring Movies" movies={rows.inspiring} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Continue Watching for You" movies={rows.watchlist} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Watch in One Weekend" movies={rows.weekend} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Critically Acclaimed" movies={rows.critics} onMoreInfo={handleMoreInfo} />
        <MovieRow title="Today's Fresh Picks for You" movies={rows.fresh} onMoreInfo={handleMoreInfo} />
      </main>
      <AccountFooter />
      <MovieDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        movie={selectedMovie}
      />
    </AppLayout>
  );
};

export default Movies;
