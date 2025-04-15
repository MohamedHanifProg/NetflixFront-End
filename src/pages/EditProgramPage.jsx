// src/pages/EditProgramPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import  API_URL  from '../config';
import '../styles/AdminProgram.css';
import AdminLayout from '../Layouts/Admin/AdminLayout';

const EditProgramPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    externalId: '',
    title: '',
    mediaType: 'movie',
    posterPath: '',
    backdropPath: '',
    releaseDate: '',
    overview: '',
    genres: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Initialize form data from state (or fetch if state not provided)
  useEffect(() => {
    if (state && state.program) {
      const prog = state.program;
      setForm({
        externalId: prog.externalId || '',
        title: prog.title || '',
        mediaType: prog.mediaType || 'movie',
        posterPath: prog.posterPath || '',
        backdropPath: prog.backdropPath || '',
        releaseDate: prog.releaseDate ? prog.releaseDate.split('T')[0] : '',
        overview: prog.overview || '',
        genres: prog.genres ? prog.genres.join(', ') : '',
      });
    }
  }, [state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const payload = {
      externalId: Number(form.externalId),
      title: form.title,
      mediaType: form.mediaType,
      posterPath: form.posterPath,
      backdropPath: form.backdropPath,
      releaseDate: form.releaseDate,
      overview: form.overview,
      genres: form.genres.split(',').map((genre) => genre.trim()).filter((genre) => genre),
    };

    try {
      const response = await fetch(`${API_URL}/programs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update program');
        return;
      }

      setSuccessMessage('Program updated successfully!');
      // Optionally navigate back after update
      navigate('/admin/programs');
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating the program.');
    }
  };

  return (
    <AdminLayout>
    <div className="admin-program-page">
      <h1>Edit Program</h1>
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
        <button type="submit">Update Program</button>
      </form>
    </div>
    </AdminLayout>
  );
};

export default EditProgramPage;
