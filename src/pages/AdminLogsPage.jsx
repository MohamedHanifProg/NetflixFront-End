// src/pages/AdminLogsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import '../styles/AdminLogs.css';
import { useNavigate } from 'react-router-dom';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/logs`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setLogs(response.data.logs);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch logs');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="admin-logs-page">
      <h1>System Logs</h1>
      {error && <div className="error">{error}</div>}
      <table className="logs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminLogsPage;
