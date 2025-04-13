import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/ExplorePage.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
;
const BASE = 'https://api.themoviedb.org/3';

const NewAndPopular = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();

  const fetchData = async () => {
    if (!hasMore) return;
    try {
      const res = await axios.get(`${BASE}/trending/all/week?api_key=${API_KEY}&page=${page}`);
      if (res.data.results.length > 0) {
        setItems(prev => [...prev, ...res.data.results]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch new & popular items:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          fetchData();
        }
      },
      { rootMargin: '200px' }
    );
    const target = containerRef.current;
    if (target) observer.observe(target);
    return () => target && observer.unobserve(target);
  }, [items, hasMore]);

  return (
    <AppLayout>
      <Menu activePage="newpopular" />
      <main className="explore-page">
        <h1 className="explore-title">New & Popular</h1>
        <div className="explore-grid">
          {items.map(item => (
            <div className="explore-card" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.backdrop_path}`}
                alt={item.title || item.name}
              />
            </div>
          ))}
        </div>
        <div ref={containerRef}></div>
        {!hasMore && <AccountFooter />}
      </main>
    </AppLayout>
  );
};

export default NewAndPopular;
