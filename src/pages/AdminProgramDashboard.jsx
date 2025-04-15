// src/pages/AdminProgramDashboard.jsx
import React, { useState, useEffect } from 'react';
import  API_URL  from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminProgramDashboard.css';

const AdminProgramDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${API_URL}/programs`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      setPrograms(response.data.programs);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch programs');
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/programs/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      setPrograms(programs.filter((program) => program._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete program');
    }
  };

  const handleEdit = (program) => {
    navigate(`/admin/programs/edit/${program._id}`, { state: { program } });
  };

  return (
    <div className="admin-dashboard">
      <h1>Program Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <table className="program-table">
        <thead>
          <tr>
            <th>External ID</th>
            <th>Title</th>
            <th>Media Type</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program._id}>
              <td>{program.externalId}</td>
              <td>{program.title}</td>
              <td>{program.mediaType}</td>
              <td>{program.releaseDate ? new Date(program.releaseDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(program)}>Edit</button>
                <button onClick={() => handleDelete(program._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/admin/programs/new')}>Add New Program</button>
    </div>
  );
};

export default AdminProgramDashboard;
