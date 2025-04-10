// src/components/detailsModal/MovieDetailsModal.jsx
import React from 'react';
import './MovieDetailsModal.css';

// Import static assets (adjust paths/names as needed)
import closeIcon from '../../assets/exiticon.png';
import plusButtonIcon from '../../assets/PlusButton.png';
import muteButtonIcon from '../../assets/MuteButton.png';
import reviewButton from '../../assets/reviewButton.png';
import movieBackground from '../../assets/moviebackground.png';

// New icons for the details section
import smallerIcon from '../../assets/Smaller.png';
import videoQualityIcon from '../../assets/VideoQuality.png';
import adIcon from '../../assets/AD.png';
import labelIcon from '../../assets/Label.png';
import netflixNIcon from '../../assets/NetflixSmall.png'

const dummyMovie = {
  title: 'House of Ninjas',
  coverImage: movieBackground, // Using your static asset
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
          <img
            src={movie.coverImage}
            alt={movie.title}
            className="modal-cover-img"
          />
  
          {/* Close Icon: positioned 16px from top/right */}
          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
  
          {/* Series Information (logo + title) positioned 205px from top, 48px from left */}
          <div className="series-info">
            <div className="series-line1">
                <img
                src={netflixNIcon} /* The Netflix "N" icon - replace with your imported asset */
                alt="Netflix N"
                className="netflix-n-logo"
                />
                <span className="series-type-text">Series</span>
            </div>
            <h2 className="series-title">{movie.title}</h2>
          </div>
          {/* Buttons Row */}
          <div className="buttons-row">
            <div className="left-buttons">
              <button className="review-btn">
                <img src={reviewButton} alt="Review" />
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
  
        {/* Movie Info Section (Width: 754px, Height: 207px) */}
        <div className="movie-info-section">
        {/* Left column (lines 1–4) */}
        <div className="movie-info-left">
            {/* Line 1 */}
            <div className="info-line line-1">
            <span className="info-new">New</span>
            <span className="info-seasons">3 Seasons 2024</span>
            <img className="video-quality-icon" src={videoQualityIcon} alt="HD" />
            <img className="ad-icon" src={adIcon} alt="AD" />
            </div>

            {/* Line 2 (e.g. smaller icon + text) */}
            <div className="info-line line-2">
            <img className="smaller-icon" src={smallerIcon} alt="smaller" />
            <span className="info-warnings">smoking, violence</span>
            </div>

            {/* Line 3 (15px below line 2) */}
            <div className="info-line line-3">
            <img className="label-icon" src={labelIcon} alt="Label" />
            <span className="info-ranking">#2 in TV Shows Today</span>
            </div>

            {/* Line 4 (17px below line 3) */}
            <div className="info-line line-4">
            <p className="info-description">
                Years after retiring from their formidable ninja lives, 
                a dysfunctional family must return to shadowy missions 
                to counteract a string of looming threats.
            </p>
            </div>
        </div>

        {/* Right column (3 rows: cast, genre, this show is) */}
        <div className="movie-info-right">
            <div className="info-row">
            <span className="info-gray">Cast:</span>
            <span className="info-white">Kento Kaku, Yosuke Eguchi, Tae Kimura, more</span>
            </div>
            <div className="info-row">
            <span className="info-gray">Genre:</span>
            <span className="info-white">TV Dramas, Japanese, TV Thrillers</span>
            </div>
            <div className="info-row">
            <span className="info-gray">This show is:</span>
            <span className="info-white">Dark, Suspenseful, Exiting</span>
            </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetailsModal;
