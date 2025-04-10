// src/components/MovieDetailsModal.jsx
import React from 'react';
import './MovieDetailsModal.css';

// Import static assets (adjust the paths/names as needed)
import closeIcon from '../../assets/exiticon.png';
import seriesLogo from '../../assets/serieslogo.png';
import plusButtonIcon from '../../assets/PlusButton.png';
import muteButtonIcon from '../../assets/MuteButton.png';
import reviewButton from '../../assets/reviewButton.png';
import movieBackground from '../../assets/moviebackground.png';

const dummyMovie = {
  title: 'House of Ninjas',
  coverImage: movieBackground, 
  description: 'This is a sample description for House of Ninjas...',
  rating: 'TV-14',
  genre: 'Action/Adventure',
};

function MovieDetailsModal({ isOpen, onClose, movie = dummyMovie }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop propagation so clicks inside don’t close the modal */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Hero Section */}
        <div className="modal-hero">
          {/* Hero Image */}
          <img
            src={movie.coverImage}
            alt={movie.title}
            className="modal-cover-img"
          />

          {/* Close Icon, positioned 16px from the top and right */}
          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>

          {/* Series Information (logo + title) positioned 205px from top and 48px from left */}
          <div className="series-info">
            <img src={seriesLogo} alt="Series Logo" className="series-logo" />
            <div className="series-title">{movie.title}</div>
          </div>

          {/* Buttons Row positioned 32px below the series info */}
          <div className="buttons-row">
            <div className="left-buttons">
              <button className="review-btn">
             <img src={reviewButton} alt="review" />
              </button>
              <button className="plus-btn">
                <img src={plusButtonIcon} alt="Add to List" />
              </button>
            </div>
            <button className="mute-btn">
              <img src={muteButtonIcon} alt="Mute" />
            </button>
          </div>
        </div>
        
        {/* If more content is needed below the hero, add it here */}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
