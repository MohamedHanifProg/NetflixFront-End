import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/ExplorePage.css';
import API_BASE_URL from '../config';

const BASE = `${API_BASE_URL}/trending`; // ✅ matches backend


const NewAndPopular = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();

  const fetchData = async () => {
    if (!hasMore) return;
    try {
      const res = await axios.get(`${BASE}?page=${page}`);
      const newItems = res.data.map(item => ({
        ...item,
        media_type: item.media_type || 'movie'
      }));
  
      // Deduplicate by unique key
      setItems(prev => {
        const existingKeys = new Set(prev.map(i => `${i.media_type}-${i.id}`));
        const filtered = newItems.filter(i => !existingKeys.has(`${i.media_type}-${i.id}`));
        return [...prev, ...filtered];
      });
  
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to fetch new & popular items:', err);
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
