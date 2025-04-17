import React from 'react';
import Modal from './Modal';

export default function InfoModal({ message, onClose }) {
  return (
    <Modal onClose={onClose}>
      <p style={{ marginBottom: '1rem' }}>{message}</p>
      <div className="modal-actions">
        <button onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
}
