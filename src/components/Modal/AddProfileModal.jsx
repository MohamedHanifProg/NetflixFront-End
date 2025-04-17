import React, { useState } from 'react';
import Modal from './Modal';

export default function AddProfileModal({ onSave, onClose }) {
  const [name, setName] = useState('');

  const save = () => {
    if (name.trim()) onSave(name.trim());
  };

  return (
    <Modal onClose={onClose}>
      <h2>Create new profile</h2>
      <input
        autoFocus
        type="text"
        placeholder="Profile name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && save()}
      />
      <div className="modal-actions">
        <button onClick={onClose}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </Modal>
  );
}
