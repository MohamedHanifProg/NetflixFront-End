import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/Browse.css';
import API_BASE_URL from '../config';

const BASE = `${API_BASE_URL}/browse`; // ✅ Using RESTful endpoint

const Browse = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('en');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const fetchItems = async (pageNum, reset = false) => {
    try {
      const res = await axios.get(BASE, {
        params: {
          page: pageNum,
          sort_by: sortBy,
          with_genres: genre,
          with_original_language: language
        }
      });

      const newItems = res.data.results;
      setItems((prev) => (reset ? newItems : [...prev, ...newItems]));
      setHasMore(pageNum < res.data.total_pages);
    } catch (err) {
      console.error('Failed to fetch browse items:', err);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchItems(1, true); // reset items on filter change
  }, [genre, language, sortBy]);

  useEffect(() => {
    if (page > 1) {
      fetchItems(page);
    }
  }, [page]);

  return (
    <AppLayout>
      <Menu activePage="browse" />
      <main className="browse-container">
        {/* Filters */}
        <div className="browse-filters">
          <h1 className="browse-title">Browse</h1>
          <span className="filter-label">Select Your Preferences</span>

          <div className="filter-group">
            <label>Original Language</label>
            <select
              className="browse-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="he">Hebrew</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="ko">Korean</option>
              <option value="ja">Japanese</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Genre</label>
            <select
              className="browse-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="27">Horror</option>
              <option value="16">Animation</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by</label>
            <select
              className="browse-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity.desc">Suggestions For You</option>
              <option value="release_date.desc">Newest</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="vote_count.desc">Most Voted</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="browse-grid">
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${item.media_type || 'movie'}`}
              ref={idx === items.length - 1 ? lastItemRef : null}
              className="browse-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.backdrop_path}`}
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </div>
      </main>
      <AccountFooter />
    </AppLayout>
  );
};

export default Browse;
