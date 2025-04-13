// src/pages/WhoIsWatching.jsx
import React, { useState, useEffect } from 'react';
import '../styles/WhoIsWatching.css';
import AppLayout from '../Layouts/App/AppLayout';
import API_URL from '../config';

// Reference your icons (these paths expect that your assets folder is in the public folder)
const plusIcon = "/assets/PlusIcon.png";
const deleteIcon = "/assets/DeleteIcon.png";  // Ensure this file exists

// Available avatars for new profiles
const availableAvatars = [
  "/assets/avatar1.png",
  "/assets/avatar2.png",
  "/assets/avatar3.png",
];

const WhoIsWatching = () => {
  const [profiles, setProfiles] = useState([]);
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

  // Updates a profile name via PUT request
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

  // Inline edit handlers
  const handleNameClick = (profile) => {
    setEditingProfileId(profile._id);
    setEditingProfileName(profile.profileName);
  };

  const handleNameChange = (e) => {
    setEditingProfileName(e.target.value);
  };

  const handleNameBlur = async () => {
    if (editingProfileId && editingProfileName) {
      await updateProfileName(editingProfileId, editingProfileName);
    }
    setEditingProfileId(null);
    setEditingProfileName('');
  };

  const handleNameKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await updateProfileName(editingProfileId, editingProfileName);
      setEditingProfileId(null);
      setEditingProfileName('');
    }
  };

  // Handler for deleting a profile
  const handleDeleteProfile = async (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await fetch(`${API_URL}/api/users/profiles/${profileId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          // Remove the deleted profile from the state
          setProfiles(prevProfiles => prevProfiles.filter(p => p._id !== profileId));
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting profile", error);
      }
    }
  };

  // Handler for adding a new profile
  const handleAddProfile = async () => {
    const profileName = window.prompt("Enter a name for your new profile:");
    if (!profileName || profileName.trim() === "") return;

    // Choose a random avatar for the new profile
    const randomAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];

    try {
      const response = await fetch(`${API_URL}/api/users/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ profileName, avatar: randomAvatar }),
      });
      const data = await response.json();
      if (response.ok) {
        setProfiles(prev => [...prev, data.profile]);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding profile", error);
    }
  };

  return (
    <AppLayout>
      <div className="whos-watching-container">
        <h1 className="page-title">Who’s watching?</h1>
        <div className="profiles-container">
          {profiles.map((profile) => (
            <div className="profile-box" key={profile._id} style={{ position: 'relative' }}>
              {/* Delete button overlay */}
              <button
                className="delete-button"
                onClick={() => handleDeleteProfile(profile._id)}
              >
                <img src={deleteIcon} alt="Delete Profile" />
              </button>
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
