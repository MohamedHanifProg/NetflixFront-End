import React, { useEffect, useState } from 'react';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/ExplorePage.css';

const MyList = () => {
  const [comingSoon, setComingSoon] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  // Simulate fetching from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList')) || [];

    // Dummy categorization based on index
    const soon = storedList.filter((_, idx) => idx % 3 === 0);
    const trend = storedList.filter((_, idx) => idx % 3 === 1);
    const picks = storedList.filter((_, idx) => idx % 3 === 2);

    setComingSoon(soon);
    setTrending(trend);
    setTopPicks(picks);
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

export default MyList;
