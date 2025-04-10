// src/pages/TestModal.jsx
import React, { useState } from 'react';
import MovieDetailsModal from '../components/DetailsModal/MovieDetailsModal';

const TestModal = () => {
  const [isModalOpen, setModalOpen] = useState(true); // Force modal open for testing

  const dummyMovie = {
    title: 'House of Ninjas',
    description: 'This is a sample description for House of Ninjas...',
    coverImage: 'https://via.placeholder.com/800x450.png?text=House+of+Ninjas',
    rating: 'TV-14',
    genre: 'Action/Adventure',
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <MovieDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TestModal;
