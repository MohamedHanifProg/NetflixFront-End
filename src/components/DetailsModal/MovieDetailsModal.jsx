import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieDetailsModal.css';

import closeIcon from '../../assets/exiticon.png';
import plusButtonIcon from '../../assets/PlusButton.png';
import muteButtonIcon from '../../assets/MuteButton.png';
import reviewButton from '../../assets/reviewButton.png';
import smallerIcon from '../../assets/Smaller.png';
import videoQualityIcon from '../../assets/VideoQuality.png';
import adIcon from '../../assets/AD.png';
import labelIcon from '../../assets/Label.png';
import netflixNIcon from '../../assets/NetflixSmall.png';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetailsModal({ isOpen, onClose, movie }) {
  // Local state for additional movie details
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movie) {
      const fetchDetails = async () => {
        try {
          // For movies; if it's a TV show, use the /tv/{id} endpoint instead.
          const res = await axios.get(
            `${BASE}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
          );
          setMovieDetails(res.data);
        } catch (err) {
          console.error('Failed to fetch movie details:', err);
        }
      };
      fetchDetails();
    }
  }, [movie]);

  // If modal is not open or details not fetched yet, render nothing.
  if (!isOpen || !movieDetails) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop propagation so clicks inside don’t close the modal */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Hero Section */}
        <div className="modal-hero">
          <img
            src={movieDetails.backdrop_path 
                 ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
                 : movie.coverImage}
            alt={movieDetails.title}
            className="modal-cover-img"
          />

          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>

          <div className="series-info">
            <div className="series-line1">
              <img src={netflixNIcon} alt="Netflix N" className="netflix-n-logo" />
              <span className="series-type-text">Series</span>
            </div>
            <h2 className="series-title">{movieDetails.title}</h2>
          </div>

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

        {/* Movie Info Section */}
        <div className="movie-info-section">
          <div className="movie-info-left">
            <div className="info-line line-1">
              <span className="info-new">New</span>
              <span className="info-seasons">{movieDetails.release_date?.slice(0, 4)} • {movieDetails.runtime} min</span>
              <img
                className="video-quality-icon"
                src={videoQualityIcon}
                alt="HD"
              />
              <img className="ad-icon" src={adIcon} alt="AD" />
            </div>

            <div className="info-line line-2">
              <img className="smaller-icon" src={smallerIcon} alt="smaller" />
              <span className="info-warnings">
                {/* For now, static; later you can combine warnings like "smoking, violence" */}
                smoking, violence
              </span>
            </div>

            <div className="info-line line-3">
              <img className="label-icon" src={labelIcon} alt="Label" />
              <span className="info-ranking">#2 in TV Shows Today</span>
            </div>

            <div className="info-line line-4">
              <p className="info-description">
                {movieDetails.overview}
              </p>
            </div>
          </div>

          <div className="movie-info-right">
            <div className="info-row">
              <span className="info-gray">Cast:</span>
              {/* Extract cast names from movieDetails.credits.cast */}
              <span className="info-white">
                {movieDetails.credits?.cast
                  ?.slice(0, 3)
                  .map((member) => member.name)
                  .join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">Genre:</span>
              <span className="info-white">
                {movieDetails.genres
                  ?.map((genre) => genre.name)
                  .join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">This show is:</span>
              <span className="info-white">
                {/* Example static descriptors; you might derive these from movieDetails later */}
                Dark, Suspenseful, Exciting
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
