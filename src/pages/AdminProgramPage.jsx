import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  API_URL  from '../config';
import '../styles/AdminProgram.css';

const AdminProgramPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    externalId: '',
    title: '',
    mediaType: 'movie', 
    posterPath: '',
    backdropPath: '',
    releaseDate: '',
    overview: '',
    genres: '' 
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Generic change handler for input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // When the admin submits the form, send a POST request to create a new program
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Prepare payload
    const payload = {
      externalId: Number(form.externalId), // Ensure the externalId is a number
      title: form.title,
      mediaType: form.mediaType,
      posterPath: form.posterPath,
      backdropPath: form.backdropPath,
      releaseDate: form.releaseDate, // the backend should convert this string to a Date if needed
      overview: form.overview,
      genres: form.genres.split(',').map((genre) => genre.trim()).filter((genre) => genre)
    };

    try {
      const response = await fetch(`${API_URL}/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create program');
        return;
      }

      setSuccessMessage('Program created successfully!');
      // Optionally, clear the form after successful creation
      setForm({
        externalId: '',
        title: '',
        mediaType: 'movie',
        posterPath: '',
        backdropPath: '',
        releaseDate: '',
        overview: '',
        genres: ''
      });

      navigate('/admin/programs');
      
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the program.');
    }
  };

  return (
    <div className="admin-program-page">
      <h1>Admin Program Management</h1>
      <form onSubmit={handleSubmit} className="admin-program-form">
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}

        <label>
          External ID:
          <input
            type="text"
            name="externalId"
            value={form.externalId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Media Type:
          <select name="mediaType" value={form.mediaType} onChange={handleChange}>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
        </label>

        <label>
          Poster Path:
          <input
            type="text"
            name="posterPath"
            value={form.posterPath}
            onChange={handleChange}
          />
        </label>

        <label>
          Backdrop Path:
          <input
            type="text"
            name="backdropPath"
            value={form.backdropPath}
            onChange={handleChange}
          />
        </label>

        <label>
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Overview:
          <textarea
            name="overview"
            value={form.overview}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Genres (comma separated):
          <input
            type="text"
            name="genres"
            value={form.genres}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Program</button>
      </form>
    </div>
  );
};

export default AdminProgramPage;
