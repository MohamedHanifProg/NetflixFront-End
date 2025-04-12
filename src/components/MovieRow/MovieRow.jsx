// src/components/MovieRow/MovieRow.jsx
import React from 'react';
import './MovieRow.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const MovieRow = ({ title, movies, showRanking = false, onMoreInfo }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="category-row">
      <h3>{title}</h3>
      <div className={`row-items ${showRanking ? 'top10-row' : ''}`}>
        {movies
          .filter((movie) => movie.poster_path || movie.backdrop_path)
          .map((movie, index) => (
            <div
              className={`program-card ${showRanking ? 'top10-card' : ''}`}
              key={movie.id}
              onClick={() => onMoreInfo && onMoreInfo(movie)}
            >
              {showRanking ? (
                <div className="top10-wrapper">
                  <span className="rank-number">{index + 1}</span>
                  <img
                    src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    className="top10-image top"
                  />
                </div>
              ) : (
                <img
                  src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default MovieRow;
