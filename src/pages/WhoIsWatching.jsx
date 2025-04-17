// src/pages/WhoIsWatching.jsx
import React, { useState, useEffect } from 'react';
import '../styles/WhoIsWatching.css';
import AppLayout from '../Layouts/App/AppLayout';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

import AddProfileModal from '../components/Modal/AddProfileModal';
import ConfirmModal    from '../components/Modal/ConfirmModal';

const plusIcon   = '/assets/PlusIcon.png';
const deleteIcon = '/assets/DeleteIcon.png';

const availableAvatars = [
  '/assets/avatar1.png',
  '/assets/avatar2.png',
  '/assets/avatar3.png',
];

export default function WhoIsWatching() {
  const [profiles, setProfiles]      = useState([]);
  const [editingId,   setEditingId]   = useState(null);
  const [editingName, setEditingName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const navigate = useNavigate();

  /* ─── Fetch profiles once */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${API_URL}/users/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) setProfiles(data.profiles);
        else        console.error(data.message);
      } catch (err) {
        console.error('Fetching profiles failed', err);
      }
    })();
  }, []);

  /* ─── Select profile */
  const selectProfile = (profile, e) => {
    e.stopPropagation();
    sessionStorage.setItem('selectedProfile', JSON.stringify(profile));
    navigate('/home');
  };

  /* ─── Rename profile */
  const updateProfileName = async (id, newName) => {
    try {
      const res  = await fetch(`${API_URL}/users/profiles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ profileName: newName }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfiles(p => p.map(t => (t._id === id ? { ...t, profileName: newName } : t)));
      } else console.error(data.message);
    } catch (err) {
      console.error('Rename failed', err);
    }
  };

  /* ─── Delete profile */
  const deleteProfile = async () => {
    if (!deleteTarget) return;
    try {
      const res  = await fetch(`${API_URL}/users/profiles/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) setProfiles(p => p.filter(t => t._id !== deleteTarget._id));
      else        console.error(data.message);
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setDeleteTarget(null);
    }
  };

  /* ─── Add profile */
  const addProfile = async (profileName) => {
    const avatar = availableAvatars[Math.random() * availableAvatars.length | 0];
    try {
      const res  = await fetch(`${API_URL}/users/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ profileName, avatar }),
      });
      const data = await res.json();
      if (res.ok) setProfiles(p => [...p, data.profile]);
      else        console.error(data.message);
    } catch (err) {
      console.error('Add profile failed', err);
    } finally {
      setShowAddModal(false);
    }
  };

  /* ─── UI */
  return (
    <AppLayout>
      <div className="whos-watching-container">
        <h1 className="page-title">Who’s watching?</h1>

        <div className="profiles-container">
          {profiles.map(profile => (
            <div
              key={profile._id}
              className="profile-box"
              style={{ position: 'relative' }}
              onClick={(e) => selectProfile(profile, e)}
            >
              {/* delete */}
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget(profile);
                }}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>

              {/* avatar */}
              <img src={profile.avatar} alt={profile.profileName} className="profile-image" />

              {/* name / editor */}
              {editingId === profile._id ? (
                <input
                  value={editingName}
                  autoFocus
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => {
                    updateProfileName(editingId, editingName);
                    setEditingId(null);
                    setEditingName('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateProfileName(editingId, editingName);
                      setEditingId(null);
                      setEditingName('');
                    }
                  }}
                />
              ) : (
                <p
                  className="profile-name"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(profile._id);
                    setEditingName(profile.profileName);
                  }}
                >
                  {profile.profileName}
                </p>
              )}
            </div>
          ))}

          {/* add tile */}
          {profiles.length < 5 && (
            <div className="profile-box add-profile" onClick={() => setShowAddModal(true)}>
              <div className="add-placeholder">
                <img src={plusIcon} alt="Add" className="plus-icon" />
              </div>
              <p className="profile-name">Add Profile</p>
            </div>
          )}
        </div>
      </div>

      {/* modals */}
      {showAddModal && (
        <AddProfileModal onSave={addProfile} onClose={() => setShowAddModal(false)} />
      )}

      {deleteTarget && (
        <ConfirmModal
          message={`Delete “${deleteTarget.profileName}”?`}
          onConfirm={deleteProfile}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AppLayout>
  );
}
