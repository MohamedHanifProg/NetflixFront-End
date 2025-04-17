import React from 'react';
import './Modal.css';

/**
 * Generic backdrop + dialog shell.
 * Click on the shaded backdrop to close.
 */
export default function Modal({ onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // don’t close when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
