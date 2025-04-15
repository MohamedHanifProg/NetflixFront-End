// src/pages/Review.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../Layouts/App/AppLayout';
import '../styles/Review.css';
import  API_URL  from '../config';

const Review = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie; // movie details passed from MovieDetailsModal

  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  // Submit review to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const reviewData = {
      movieId: movie?.id,
      title: movie?.title || movie?.name,
      text,
      isPublic,
      rating,
    };

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to submit review');
        return;
      }
      console.log('Review submitted successfully:', data);
      // On success, redirect back (or navigate as desired)
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting your review.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <AppLayout>
      <div className="review-page">
        <h1>Write a Review</h1>
        {movie && (
          <p className="movie-title">
            For: <strong>{movie.title || movie.name}</strong>
          </p>
        )}
        <form className="review-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className="review-options">
            <label>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              Private
            </label>
          </div>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'filled' : ''}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="review-buttons">
            <button type="submit">Submit Review</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Review;
