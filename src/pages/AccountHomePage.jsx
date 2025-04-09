import React from 'react';
import AppLayout from '../layouts/App/AppLayout';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import '../styles/AccountHomePage.css';

const AccountHomePage = () => {
  const renderSection = (title, prefix = 'Item') => (
    <section className="category-row">
      <h3>{title}</h3>
      <div className="row-items">
        {[...Array(10)].map((_, idx) => (
          <div className="program-card" key={idx}>
            <img
              src={`https://via.placeholder.com/200x120?text=${prefix}+${idx + 1}`}
              alt={`${prefix} ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <AppLayout>
      <Menu />

      <main className="homepage-container">
        {/* Hero / Cover */}
        <section className="cover-section">
          <div className="cover-overlay">
            <div className="cover-content">
              <p className="cover-subtitle">N SERIES</p>
              <h1 className="cover-title">HOUSE OF NINJAS</h1>
              <p className="cover-description">
                Years after retiring from their formidable ninja lives, a dysfunctional family must return to
                shadowy missions to counteract a string of looming threats.
              </p>
              <button className="more-info-btn">More Info</button>
            </div>
          </div>
        </section>

        {/* Scrollable Content Rows */}
        {renderSection('Matched to You', 'Recommended')}
        {renderSection('Newest Releases', 'New')}
        {renderSection('Most Watched in Israel', 'Israel')}
        {renderSection('Your Reviewed Titles', 'Reviewed')}
        {renderSection('Top Rated Globally', 'Top')}
        {renderSection('Animation', 'Animation')}
        {renderSection('Action & Adventure', 'Action')}
        {renderSection('Your Watch List', 'Saved')}
      </main>

      <Footer />
    </AppLayout>
  );
};

export default AccountHomePage;
