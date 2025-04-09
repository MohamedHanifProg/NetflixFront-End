import React, { useState } from 'react';
import '../styles/WhoIsWatching.css';
import AppLayout from '../Layouts/App/AppLayout';
import plusIcon from '../assets/PlusIcon.png';

// Import your static avatar images
import avatarAlice from '../assets/avatar1.png';
import avatarBob from '../assets/avatar2.png';
import avatarCharlie from '../assets/avatar3.png';

// Set up initial profiles; you can later update this data from your backend.
const initialProfiles = [
  { id: 1, name: 'Alice', image: avatarAlice },
  { id: 2, name: 'Bob', image: avatarBob },
  { id: 3, name: 'Charlie', image: avatarCharlie },
];

const WhoIsWatching = () => {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <AppLayout>
      <div className="whos-watching-container">
        <h1 className="page-title">Who’s watching?</h1>
        <div className="profiles-container">
          {profiles.map((profile) => (
            <div className="profile-box" key={profile.id}>
              <img
                src={profile.image}
                alt={profile.name}
                className="profile-image"
              />
              <p className="profile-name">{profile.name}</p>
            </div>
          ))}

          {/* Conditionally render the "Add Profile" box if there are less than 5 profiles */}
          {profiles.length < 5 && (
            <div className="profile-box add-profile">
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
