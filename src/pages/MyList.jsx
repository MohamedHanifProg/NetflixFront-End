import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '../Layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import AccountFooter from '../components/Footer/AccountFooter';
import '../styles/ExplorePage.css';
import API_BASE_URL from '../config'; // Your backend base URL

const MyList = () => {
  const [myListItems, setMyListItems] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.warn('No token found');
          return;
        }

        // Get saved items for this user
        const listResponse = await axios.get(`${API_BASE_URL}/mylist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const listItems = listResponse.data;

        // Get detailed data from TMDB using your backend proxy
        const detailedItems = await Promise.all(
          listItems.map((item) =>
            axios
              .get(`${API_BASE_URL}/homepage/proxy`, {
                params: { url: `/${item.media_type}/${item.tmdb_id}` },
              })
              .then((res) => ({
                ...res.data,
                media_type: item.media_type,
              }))
          )
        );

        setMyListItems(detailedItems);
      } catch (err) {
        console.error('Error fetching user list:', err);
      }
    };

    fetchMyList();
  }, []);

  const renderSection = (title, items) =>
    items.length > 0 && (
      <section className="explore-section">
        
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
    );

  return (
    <AppLayout>
      <Menu activePage="mylist" />
      <main className="explore-page">
        <h1 className="explore-title">My List</h1>
        {renderSection('My List', myListItems)}
        {myListItems.length === 0 && (
          <p style={{ color: '#999', marginTop: '20px' }}>Your list is empty.</p>
        )}
        <AccountFooter />
      </main>
    </AppLayout>
  );
};

export default MyList;
