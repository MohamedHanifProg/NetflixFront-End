import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import MovieRow from '../components/MovieRow/MovieRow';
import MovieDetailsModal from '../components/DetailsModal/MovieDetailsModal';
import '../styles/AccountHomePage.css';

import API_URL from '../config';
const BASE = `${API_URL}/homepage`;

const AccountHomePage = () => {
  const [rows, setRows] = useState({});
  const [coverImages, setCoverImages] = useState([]);
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const [coverMovie, setCoverMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRow = async (key, endpoint) => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      const res = await axios.get(`${BASE}/${endpoint}`, { headers });
      const results = res.data.results || res.data || [];
      setRows(prev => ({ ...prev, [key]: results }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };
  

  const fetchCover = async () => {
    try {
      const res = await axios.get(`${BASE}/cover`);
      const images = Array.isArray(res.data) ? res.data : [res.data]; // allow single or array
      setCoverImages(images.slice(0, 4)); // store max 4
      setCoverMovie(images[0]); // initial image
    } catch (err) {
      console.error('Failed to fetch cover movie:', err);
    }
  };

  useEffect(() => {
    fetchCover();
    fetchRow('matched', 'matched');
    fetchRow('netflix', 'netflix');
    fetchRow('top10', 'top10');
    fetchRow('love', 'love');
    fetchRow('animation', 'animation');
    fetchRow('inspiring', 'inspiring');
    fetchRow('watchlist', 'watchlist');
    fetchRow('weekend', 'weekend');
    fetchRow('critics', 'critics');
    fetchRow('fresh', 'fresh');
    fetchRow('adultAnimation', 'adultAnimation');
  }, []);

  // Rotate background every 5 seconds
  useEffect(() => {
    if (coverImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentCoverIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % coverImages.length;
        setCoverMovie(coverImages[nextIndex]);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [coverImages]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
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
              <p className="cover-description">{coverMovie?.overview}</p>
              <button className="more-info-btn" onClick={() => handleMoreInfo(coverMovie)}>
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
      <MovieDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        movie={selectedMovie}
      />
    </AppLayout>
  );
};

export default AccountHomePage;
