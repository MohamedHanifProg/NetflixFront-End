import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/ExplorePage.css';
import API_BASE_URL from '../config'; // ✅ Backend URL for proxy

const MyList = () => {
  const [comingSoon, setComingSoon] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList')) || [];

    const fetchItems = async () => {
      try {
        const responses = await Promise.all(
          storedList.map(item =>
            axios
              .get(`${API_BASE_URL}/homepage/proxy`, {
                params: { url: `/${item.media_type}/${item.id}` }
              })
              .then(res => ({ ...res.data, media_type: item.media_type }))
          )
        );

        // Categorize items (just a demo categorization by index)
        const soon = responses.filter((_, idx) => idx % 3 === 0);
        const trend = responses.filter((_, idx) => idx % 3 === 1);
        const picks = responses.filter((_, idx) => idx % 3 === 2);

        setComingSoon(soon);
        setTrending(trend);
        setTopPicks(picks);
      } catch (err) {
        console.error('Error fetching my list items:', err);
      }
    };

    if (storedList.length > 0) {
      fetchItems();
    }
  }, []);

  const renderSection = (title, items) => (
    items.length > 0 && (
      <section className="explore-section">
        <h2 className="explore-subtitle">{title}</h2>
        <div className="explore-grid">
          {items.map((item) => (
            <div className="explore-card" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.backdrop_path}`}
                alt={item.title || item.name}
              />
            </div>
          ))}
        </div>
      </section>
    )
  );

  return (
    <AppLayout>
      <Menu activePage="mylist" />
      <main className="explore-page">
        <h1 className="explore-title">My List</h1>
        {renderSection('Coming Soon', comingSoon)}
        {renderSection('Trending', trending)}
        {renderSection('Top Picks', topPicks)}
        {comingSoon.length + trending.length + topPicks.length === 0 && (
          <p style={{ color: '#999', marginTop: '20px' }}>Your list is empty.</p>
        )}
        <AccountFooter />
      </main>
    </AppLayout>
  );
};

export default MyList
