// src/components/detailsModal/MovieDetailsModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieDetailsModal.css';

// Import static assets
import closeIcon from '../../assets/exiticon.png';
import plusButtonIcon from '../../assets/PlusButton.png';
import muteButtonIcon from '../../assets/MuteButton.png';
import reviewButton from '../../assets/reviewButton.png';
import smallerIcon from '../../assets/Smaller.png';
import videoQualityIcon from '../../assets/VideoQuality.png';
import adIcon from '../../assets/AD.png';
import labelIcon from '../../assets/Label.png';
import netflixNIcon from '../../assets/NetflixSmall.png';
import playIcon from '../../assets/playIcon.png';

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetailsModal({ isOpen, onClose, movie }) {
  // State for detailed movie/TV info (fetched via API)
  const [movieDetails, setMovieDetails] = useState(null);
  // State for episodes (only for TV series)
  const [episodes, setEpisodes] = useState(null);

  // Fetch detailed data for the selected movie/TV series
  useEffect(() => {
    if (movie) {
      const fetchDetails = async () => {
        try {
          // Determine if the movie is a TV series (usually TV shows have a "name" property and no "title")
          const isTV = movie?.name && !movie?.title;
          const res = await axios.get(
            `${BASE}/${isTV ? 'tv' : 'movie'}/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
          );
          setMovieDetails(res.data);
        } catch (err) {
          console.error('Failed to fetch details:', err);
        }
      };
      fetchDetails();
    }
  }, [movie]);

  // Once detailed data is available and if this is a TV series, fetch episodes for season 1
  useEffect(() => {
    const isTV = movie?.name && !movie?.title;
    if (isTV && movie) {
      const fetchEpisodes = async () => {
        try {
          const res = await axios.get(
            `${BASE}/tv/${movie.id}/season/1?api_key=${API_KEY}`
          );
          setEpisodes(res.data.episodes);
        } catch (err) {
          console.error('Failed to fetch episodes:', err);
        }
      };
      fetchEpisodes();
    }
  }, [movie]);

  // Don't render modal until it's open and movieDetails have been fetched
  if (!isOpen || !movieDetails) return null;

  const isTV = movie?.name && !movie?.title;
  const title = movieDetails.title || movieDetails.name;
  const releaseYear = (movieDetails.release_date || movieDetails.first_air_date || '').slice(0, 4);
  const runtime = isTV
    ? `${movieDetails.number_of_seasons} season${movieDetails.number_of_seasons > 1 ? 's' : ''}`
    : `${movieDetails.runtime} min`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Prevent clicks inside modal from propagating */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* HERO SECTION */}
        <div className="modal-hero">
          <img
            src={
              movieDetails.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
                : movie.coverImage
            }
            alt={title}
            className="modal-cover-img"
          />

          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>

          {/* SERIES INFO: two-line layout */}
          <div className="series-info">
            <div className="series-line1">
              <img src={netflixNIcon} alt="Netflix N" className="netflix-n-logo" />
              <span className="series-type-text">{isTV ? 'Series' : 'Movie'}</span>
            </div>
            <h2 className="series-title">{title}</h2>
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

        {/* MOVIE INFO SECTION */}
        <div className="movie-info-section">
          <div className="movie-info-left">
            <div className="info-line line-1">
              <span className="info-new">New</span>
              <span className="info-seasons">{releaseYear} • {runtime}</span>
              <img className="video-quality-icon" src={videoQualityIcon} alt="HD" />
              <img className="ad-icon" src={adIcon} alt="AD" />
            </div>

            <div className="info-line line-2">
              <img className="smaller-icon" src={smallerIcon} alt="smaller" />
              <span className="info-warnings">smoking, violence</span>
            </div>

            <div className="info-line line-3">
              <img className="label-icon" src={labelIcon} alt="Label" />
              <span className="info-ranking">#2 in {isTV ? 'TV Shows' : 'Movies'} Today</span>
            </div>

            <div className="info-line line-4">
              <p className="info-description">{movieDetails.overview}</p>
            </div>
          </div>

          <div className="movie-info-right">
            <div className="info-row">
              <span className="info-gray">Cast:</span>
              <span className="info-white">
                {movieDetails.credits?.cast?.slice(0, 3).map((c) => c.name).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">Genre:</span>
              <span className="info-white">
                {movieDetails.genres?.map((g) => g.name).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">This {isTV ? 'series' : 'movie'} is:</span>
              <span className="info-white">Dark, Suspenseful, Exciting</span>
            </div>
          </div>
        </div>

        {/* EPISODES SECTION: Only render for TV series and when episodes have been fetched */}
        {isTV && episodes && (
          <div className="episodes-section">
            <div className="episodes-header">
              <span className="episodes-header-left">Episodes</span>
              <span className="episodes-header-right">{title}</span>
            </div>
            <div className="episodes-list">
              {episodes.map((ep) => (
                <div className="episode-row" key={ep.id}>
                  <div className="episode-number">{ep.episode_number}</div>
                  <div className="episode-main">
                    <div className="episode-image-wrapper">
                      {ep.still_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                          alt={`Episode ${ep.episode_number}`}
                          className="episode-image"
                        />
                      ) : (
                        <div className="episode-image-placeholder" />
                      )}
                      <img src={playIcon} alt="Play" className="play-icon" />
                    </div>
                    <div className="episode-details">
                      <div className="episode-info-row">
                        <span className="episode-title">{ep.name}</span>
                        <span className="episode-duration">{ep.runtime ? `${ep.runtime}m` : 'N/A'}</span>
                      </div>
                      <p className="episode-description">{ep.overview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
