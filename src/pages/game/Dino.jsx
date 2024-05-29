// src/components/Dino.js
import React from 'react';
import './Dino.css';

const Dino = ({ jumping }) => {
  return (
    <div className={`dino ${jumping ? 'jumping' : ''}`}>
        <img src="https://th.bing.com/th/id/OIP.InvRNlIxtTXB7Hr2uuw9tAHaHa?rs=1&pid=ImgDetMain" alt="Dino" />
    </div>
    
  );
};

export default Dino;
