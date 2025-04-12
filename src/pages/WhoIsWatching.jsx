// src/pages/WhoIsWatching.jsx
import React, { useState, useEffect } from 'react';
import '../styles/WhoIsWatching.css';
import AppLayout from '../Layouts/App/AppLayout';
const plusIcon = "/assets/PlusIcon.png";
import API_URL from '../config';

const WhoIsWatching = () => {
  const [profiles, setProfiles] = useState([]);
  // Hold the profile id being edited (if any) and its current edit value
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [editingProfileName, setEditingProfileName] = useState('');

  // Fetch profiles from the backend when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProfiles(data.profiles);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching profiles', error);
      }
    };
    fetchProfiles();
  }, []);

  // Sends an update request to the backend to update the profile name
  const updateProfileName = async (profileId, newName) => {
    try {
      const response = await fetch(`${API_URL}/api/users/profiles/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ profileName: newName }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update the profiles state with the new profileName
        setProfiles((prevProfiles) =>
          prevProfiles.map((p) =>
            p._id === profileId ? { ...p, profileName: newName } : p
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  // When a profile name is clicked, begin inline editing
  const handleNameClick = (profile) => {
    setEditingProfileId(profile._id);
    setEditingProfileName(profile.profileName);
  };

  // Handle changes in the inline edit input field
  const handleNameChange = (e) => {
    setEditingProfileName(e.target.value);
  };

  // When the input loses focus, save the update
  const handleNameBlur = async () => {
    if (editingProfileId && editingProfileName) {
      await updateProfileName(editingProfileId, editingProfileName);
    }
    setEditingProfileId(null);
    setEditingProfileName('');
  };

  // Also handle "Enter" key to confirm editing
  const handleNameKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await updateProfileName(editingProfileId, editingProfileName);
      setEditingProfileId(null);
      setEditingProfileName('');
    }
  };

  // Handler for adding a new profile (to be implemented)
  const handleAddProfile = () => {
    console.log('Add profile clicked');
    // You can implement a modal or separate flow to add a new profile
  };

  return (
    <AppLayout>
      <div className="whos-watching-container">
        <h1 className="page-title">Who’s watching?</h1>
        <div className="profiles-container">
          {profiles.map((profile) => (
            <div className="profile-box" key={profile._id}>
              <img
                src={profile.avatar}
                alt={profile.profileName}
                className="profile-image"
              />
              {editingProfileId === profile._id ? (
                <input
                  type="text"
                  value={editingProfileName}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                />
              ) : (
                <p className="profile-name" onClick={() => handleNameClick(profile)}>
                  {profile.profileName}
                </p>
              )}
            </div>
          ))}
          {profiles.length < 5 && (
            <div className="profile-box add-profile" onClick={handleAddProfile}>
              <div className="add-placeholder">
                <img src={plusIcon} alt="Add Profile" className="plus-icon" />
              </div>
              <p className="profile-name">Add Profile</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default WhoIsWatching;
