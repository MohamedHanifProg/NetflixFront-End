// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Layouts/Admin/AdminLayout';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/admin/programs')}>
            <h2>Manage Programs</h2>
            <p>Add, update, or delete programs</p>
          </div>
          <div className="card" onClick={() => navigate('/admin/logs')}>
            <h2>View Logs</h2>
            <p>Review system logs (newest first)</p>
          </div>
          {/* Additional cards for more admin functionalities if needed */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
