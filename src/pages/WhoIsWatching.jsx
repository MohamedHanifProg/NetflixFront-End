// src/pages/WhoIsWatching.jsx
import React from 'react';
import '../styles/WhoIsWatching.css';
import AppLayout from '../Layouts/App/AppLayout';
import plusIcon from '../assets/PlusIcon.png';
// temporary
import avatarAlice from '../assets/avatar1.png';
import avatarBob from '../assets/avatar2.png';
import avatarCharlie from '../assets/avatar3.png';

const profilesData = [
    { id: 1, name: 'Alice', image: avatarAlice },
    { id: 2, name: 'Bob', image: avatarBob },
    { id: 3, name: 'Charlie', image: avatarCharlie },
  ];

const WhoIsWatching = () => {
  return (
    <AppLayout>
      <div className="whos-watching-container">
        <h1 className="page-title">Who’s watching?</h1>
        <div className="profiles-container">
          {profilesData.map((profile) => (
            <div className="profile-box" key={profile.id}>
              <img
                src={profile.image}
                alt={profile.name}
                className="profile-image"
              />
              <p className="profile-name">{profile.name}</p>
            </div>
          ))}
          {/* Updated Add Profile Block */}
          <div className="profile-box add-profile">
            <div className="add-placeholder">
              <img src={plusIcon} alt="Add Profile" className="plus-icon" />
            </div>
            <p className="profile-name">Add Profile</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default WhoIsWatching;
