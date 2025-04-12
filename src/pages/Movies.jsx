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

const Movies = () => {
  const [rows, setRows] = useState({});
  const [coverMovie, setCoverMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ FIX: Proper API key injection regardless of query string presence
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

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchCover();
    fetchRow('matched', '/discover/movie?sort_by=popularity.desc', 10);
    fetchRow('top10', '/movie/top_rated?region=US', 10);
    fetchRow('love', '/discover/movie?sort_by=popularity.desc');
    fetchRow('animation', '/discover/movie?with_genres=16');
    fetchRow('inspiring', '/search/movie?query=inspiring');
    fetchRow('watchlist', '/discover/movie?sort_by=popularity.desc');
    fetchRow('weekend', '/discover/movie?with_runtime.lte=90');
    fetchRow('critics', '/movie/top_rated');
    fetchRow('fresh', '/discover/movie?sort_by=vote_average.desc');
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
              <h1 className="cover-title">
                {coverMovie?.title || coverMovie?.name}
              </h1>
              <p className="cover-description">
                {coverMovie?.overview}
              </p>
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
      <MovieDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movie={selectedMovie} />
    </AppLayout>
  );
};

export default Movies;
