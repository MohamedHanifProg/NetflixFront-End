import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import MovieRow from '../components/MovieRow/MovieRow';
import '../styles/AccountHomePage.css';

const API_KEY = 'd106e624423e4ff54c95bbf11b358dc7';
const BASE = 'https://api.themoviedb.org/3';

const AccountHomePage = () => {
  const [rows, setRows] = useState({});

  const fetchRow = async (key, url) => {
    try {
      const res = await axios.get(`${BASE}${url}&api_key=${API_KEY}`);
      setRows((prev) => ({ ...prev, [key]: res.data.results }));
    } catch (err) {
      console.error(`Failed to load ${key}:`, err);
    }
  };

  useEffect(() => {
    fetchRow('matched', '/discover/movie?sort_by=popularity.desc');

    fetchRow('netflix', '/discover/tv?with_networks=213');
    fetchRow('top10', '/movie/top_rated?region=US');
    fetchRow('love', '/discover/movie?sort_by=popularity.desc');
    fetchRow('animation', '/discover/movie?with_genres=16');
    fetchRow('inspiring', '/search/movie?query=inspiring');
    fetchRow('watchlist', '/trending/all/day');
    fetchRow('weekend', '/discover/movie?with_runtime.lte=90');
    fetchRow('critics', '/movie/top_rated');
    fetchRow('fresh', '/discover/movie?sort_by=vote_average.desc');
    fetchRow('adultAnimation', '/discover/tv?with_genres=16&include_adult=true');
  }, []);

  return (
    <AppLayout>
      <Menu />

      <main className="homepage-container">
        {/* Cover Section */}
        <section className="cover-section">
          <div className="cover-overlay">
            <div className="cover-content">
              <p className="cover-subtitle">N SERIES</p>
              <div className="cover-title">
                <div className="title-top"><div>HOUSE</div><div>OF</div></div>
                <div className="title-bottom">NINJAS</div>
              </div>
              <p className="cover-description">
                Years after retiring from their ninja lives, a dysfunctional family must return to secret missions...
              </p>
              <button className="more-info-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48..."></path>
                </svg>
                More Info
              </button>
            </div>
          </div>
        </section>

        {/* Rows */}
        <MovieRow title="Matched for You" movies={rows.matched} />
        <MovieRow title="Now on Netflix" movies={rows.netflix} />
        <MovieRow
  title="Top 10 movies in the U.S. Today"
  movies={rows.top10}
  showRanking={true}
/>



        <MovieRow title="We Think You'll Love These" movies={rows.love} />
        <MovieRow title="Animation" movies={rows.animation} />
        <MovieRow title="Inspiring Movies" movies={rows.inspiring} />
        <MovieRow title="Continue Watching for You" movies={rows.watchlist} />
        <MovieRow title="Watch in One Weekend" movies={rows.weekend} />
        <MovieRow title="Critically Acclaimed" movies={rows.critics} />
        <MovieRow title="Today's Fresh Picks for You" movies={rows.fresh} />
        <MovieRow title="Adult Animation" movies={rows.adultAnimation} />
      </main>

      <Footer />
    </AppLayout>
  );
};

export default AccountHomePage;
