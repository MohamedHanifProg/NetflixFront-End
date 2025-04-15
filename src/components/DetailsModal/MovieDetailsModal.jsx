import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieDetailsModal.css';
import API_BASE_URL from '../../config';

// Static assets
const closeIcon = "/assets/exiticon.png";
const plusButtonIcon = "/assets/PlusButton.png";
const muteButtonIcon = "/assets/MuteButton.png";
const reviewButton = "/assets/reviewButton.png";
const smallerIcon = "/assets/Smaller.png";
const videoQualityIcon = "/assets/VideoQuality.png";
const adIcon = "/assets/AD.png";
const labelIcon = "/assets/Label.png";
const netflixNIcon = "/assets/NetflixSmall.png";
const playIcon = "/assets/playIcon.png";

// RESTful base route
const BASE = `${API_BASE_URL}/details`;

function MovieDetailsModal({ isOpen, onClose, movie }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const isTV = movie?.media_type === 'tv';
  const title = movie?.title || movie?.name;
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate('/review', { state: { movie } });
  };

  const handleAddToList = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return alert("You must be logged in.");

      await axios.post(
        `${API_BASE_URL}/mylist/add`,
        {
          id: movie.id,
          media_type: movie.media_type,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to your list!");
    } catch (error) {
      console.error("Error adding to list:", error);
      alert("This item may already be in your list.");
    }
  };

  useEffect(() => {
    if (!movie) return;

    const fetchDetails = async () => {
      try {
        const endpoint = `${BASE}/${movie.media_type}/${movie.id}`;
        const res = await axios.get(endpoint);
        setMovieDetails(res.data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
    };

    fetchDetails();
  }, [movie]);

  useEffect(() => {
    if (!isTV || !movie?.id) return;

    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(`${BASE}/tv/${movie.id}/season/1`);
        setEpisodes(res.data.episodes);
      } catch (err) {
        console.error('Failed to fetch episodes:', err);
      }
    };

    fetchEpisodes();
  }, [movie]);

  if (!isOpen || !movieDetails) return null;

  const releaseYear = (movieDetails.release_date || movieDetails.first_air_date || '').slice(0, 4);
  const runtime = isTV
    ? `${movieDetails.number_of_seasons} season${movieDetails.number_of_seasons > 1 ? 's' : ''}`
    : `${movieDetails.runtime} min`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
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

          <div className="series-info">
            <div className="series-line1">
              <img src={netflixNIcon} alt="Netflix N" className="netflix-n-logo" />
              <span className="series-type-text">{isTV ? 'Series' : 'Movie'}</span>
            </div>
            <h2 className="series-title">{title}</h2>
          </div>

          <div className="buttons-row">
            <div className="left-buttons">
              <button className="review-btn" onClick={handleReviewClick}>
                <img src={reviewButton} alt="Review" />
              </button>
              <button className="plus-btn" onClick={handleAddToList}>
                <img src={plusButtonIcon} alt="Add to List" />
              </button>
            </div>
            <button className="mute-btn">
              <img src={muteButtonIcon} alt="Mute" />
            </button>
          </div>
        </div>

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
                {movieDetails.credits?.cast?.slice(0, 3).map(c => c.name).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">Genre:</span>
              <span className="info-white">
                {movieDetails.genres?.map(g => g.name).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-gray">This {isTV ? 'series' : 'movie'} is:</span>
              <span className="info-white">Dark, Suspenseful, Exciting</span>
            </div>
          </div>
        </div>

        {isTV && episodes?.length > 0 && (
          <div className="episodes-section">
            <div className="episodes-header">
              <span className="episodes-header-left">Episodes</span>
              <span className="episodes-header-right">{title}</span>
            </div>
            <div className="episodes-list">
              {episodes.map((ep, index) => (
                <div className={`episode-row ${index === 0 ? 'selected-row' : ''}`} key={ep.id}>
                  <div className="episode-number">{ep.episode_number}</div>
                  <div className="episode-main">
                    <div className={index === 0 ? "episode-image-wrapper first-episode" : "episode-image-wrapper"}>
                      {ep.still_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                          alt={`Episode ${ep.episode_number}`}
                          className="episode-image"
                        />
                      ) : (
                        <div className="episode-image-placeholder" />
                      )}
                      {index === 0 && (
                        <img src={playIcon} alt="Play" className="play-icon" />
                      )}
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
