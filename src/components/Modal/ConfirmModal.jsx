import React from 'react';
import Modal from './Modal';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onCancel}>Cancel</button>
        <button className="danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
