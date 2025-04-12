import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../Layouts/App/AppLayout';
import '../styles/Review.css';

const Review = () => {
  const { state } = useLocation();
  const movie = state?.movie;

  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      movieId: movie?.id,
      title: movie?.title || movie?.name,
      text,
      isPublic,
      rating,
    };
    console.log('Submitted review:', reviewData);
    alert('Review submitted!');
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

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Review;
