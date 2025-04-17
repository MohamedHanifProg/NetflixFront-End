// src/components/DetailsModal/MovieDetailsModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieDetailsModal.css';
import API_BASE_URL from '../../config';

import InfoModal    from '../Modal/InfoModal';
import ConfirmModal from '../Modal/ConfirmModal';

// static assets
const closeIcon       = '/assets/exiticon.png';
const plusButtonIcon  = '/assets/PlusButton.png';
const muteButtonIcon  = '/assets/MuteButton.png';
const reviewButton    = '/assets/reviewButton.png';
const smallerIcon     = '/assets/Smaller.png';
const videoQualityIcon= '/assets/VideoQuality.png';
const adIcon          = '/assets/AD.png';
const labelIcon       = '/assets/Label.png';
const netflixNIcon    = '/assets/NetflixSmall.png';
const playIcon        = '/assets/playIcon.png';

const BASE = `${API_BASE_URL}/details`;

export default function MovieDetailsModal({ isOpen, onClose, movie }) {
  /* state ---------------------------------------------------------- */
  const [movieDetails, setMovieDetails] = useState(null);
  const [episodes,     setEpisodes]     = useState(null);
  const [userReviews,  setUserReviews]  = useState([]);
  const [reviews,      setReviews]      = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  /* modal helpers */
  const [infoMsg, setInfoMsg]       = useState(null);      // null or string
  const [confirm, setConfirm]       = useState(null);      // null or { id }
  const closeInfo    = () => setInfoMsg(null);
  const cancelDelete = () => setConfirm(null);

  /* misc ----------------------------------------------------------- */
  const isTV  = movie?.media_type === 'tv';
  const title = movie?.title || movie?.name;
  const navigate = useNavigate();

  /* review navigation */
  const handleReviewClick = () => navigate('/review', { state: { movie } });
  const handleEditReview  = (r) => navigate('/review', { state: { movie, review: r } });

  /* delete review -------------------------------------------------- */
  const handleDeleteReview = (reviewId) => setConfirm({ id: reviewId });
  const actuallyDelete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/reviews/${confirm.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfirm(null);
      setInfoMsg('Review deleted.');
      fetchReviews();
    } catch (err) {
      console.error('Delete review failed:', err);
      setInfoMsg('Could not delete review.');
    }
  };

  /* add to list ---------------------------------------------------- */
  const handleAddToList = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return setInfoMsg('You must be logged in.');

      await axios.post(
        `${API_BASE_URL}/mylist/add`,
        {
          id:            movie.id,
          media_type:    movie.media_type,
          title:         movie.title || movie.name,
          poster_path:   movie.poster_path,
          backdrop_path: movie.backdrop_path,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInfoMsg('Added to your list!');
    } catch (err) {
      console.error('Add to list error:', err);
      setInfoMsg('This item may already be in your list.');
    }
  };

  /* fetch reviews -------------------------------------------------- */
  const fetchReviews = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await axios.get(`${API_BASE_URL}/reviews/${movie.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const userId = token ? JSON.parse(atob(token.split('.')[1]))?.id : null;
      setUserReviews(data.filter(r => r.user?._id === userId));
      setReviews     (data.filter(r => r.isPublic && r.user?._id !== userId));
    } catch (err) {
      console.error('Fetch reviews failed:', err);
    }
  };

  /* initial fetch -------------------------------------------------- */
  useEffect(() => {
    if (!movie) return;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE}/${movie.media_type}/${movie.id}`);
        setMovieDetails(data);
        fetchReviews();
      } catch (err) { console.error('Details fetch failed:', err); }
    })();
  }, [movie]);

  /* tv episodes ---------------------------------------------------- */
  useEffect(() => {
    if (!isTV || !movie?.id) return;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE}/tv/${movie.id}/season/1`);
        setEpisodes(data.episodes);
      } catch (err) { console.error('Episodes fetch failed:', err); }
    })();
  }, [movie]);

  if (!isOpen || !movieDetails) return null;

  /* derived info */
  const releaseYear = (movieDetails.release_date || movieDetails.first_air_date || '').slice(0,4);
  const runtime = isTV
    ? `${movieDetails.number_of_seasons} season${movieDetails.number_of_seasons > 1 ? 's' : ''}`
    : `${movieDetails.runtime} min`;

  /* render --------------------------------------------------------- */
  return (
    <>
      {/* main modal */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/* hero ---------------------------------------------------- */}
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

          {/* info section ------------------------------------------- */}
          <div className="movie-info-section">
            <div className="movie-info-left">
              <div className="info-line line-1">
                <span className="info-new">New</span>
                <span className="info-seasons">{releaseYear} • {runtime}</span>
                <img className="video-quality-icon" src={videoQualityIcon} alt="HD" />
                <img className="ad-icon"            src={adIcon}          alt="AD" />
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
                  {movieDetails.credits?.cast?.slice(0,3).map(c=>c.name).join(', ') || 'N/A'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-gray">Genre:</span>
                <span className="info-white">
                  {movieDetails.genres?.map(g=>g.name).join(', ') || 'N/A'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-gray">This {isTV ? 'series' : 'movie'} is:</span>
                <span className="info-white">Dark, Suspenseful, Exciting</span>
              </div>
            </div>
          </div>

          {/* reviews ------------------------------------------------- */}
          {userReviews.length > 0 && (
            <div className="review-section">
              <h3>Your Reviews</h3>
              {userReviews.map(r=>(
                <div key={r._id} className="review-card">
                  <p>{r.text}</p>
                  <p><strong>Rating:</strong> {'⭐'.repeat(r.rating)}</p>
                  <small>{r.isPublic ? 'Public' : 'Private'}</small>
                  <div className="review-buttons">
                    <button onClick={()=>handleEditReview(r)}>Edit</button>
                    <button onClick={()=>handleDeleteReview(r._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviews.length > 0 && (
            <div className="review-section">
              <h3>What others say</h3>
              {(showAllReviews ? reviews : reviews.slice(0,3)).map(r=>(
                <div key={r._id} className="review-card">
                  <p>{r.text}</p>
                  <p><strong>Rating:</strong> {'⭐'.repeat(r.rating)}</p>
                </div>
              ))}
              {reviews.length > 3 && (
                <button className="see-more-btn" onClick={()=>setShowAllReviews(p=>!p)}>
                  {showAllReviews ? 'See Less' : 'See More'}
                </button>
              )}
            </div>
          )}

          {/* episodes ---------------------------------------------- */}
          {isTV && episodes?.length > 0 && (
            <div className="episodes-section">
              <div className="episodes-header">
                <span className="episodes-header-left">Episodes</span>
                <span className="episodes-header-right">{title}</span>
              </div>
              <div className="episodes-list">
                {episodes.map((ep, i)=>(
                  <div key={ep.id} className={`episode-row ${i===0?'selected-row':''}`}>
                    <div className="episode-number">{ep.episode_number}</div>
                    <div className="episode-main">
                      <div className={`episode-image-wrapper${i===0?' first-episode':''}`}>
                        {ep.still_path
                          ? <img src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} alt={`Ep ${ep.episode_number}`} className="episode-image" />
                          : <div className="episode-image-placeholder" />}
                        {i===0 && <img src={playIcon} alt="Play" className="play-icon" />}
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

      {/* ancillary modals ------------------------------------------ */}
      {infoMsg   && <InfoModal   message={infoMsg}      onClose={closeInfo} />}
      {confirm   && (
        <ConfirmModal
          message="Are you sure you want to delete this review? "
          onConfirm={actuallyDelete}
          onCancel ={cancelDelete}
        />
      )}
    </>
  );
}
