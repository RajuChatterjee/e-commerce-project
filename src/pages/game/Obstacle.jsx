// src/components/Obstacle.js
import React from 'react';
import './Obstacle.css';

const Obstacle = ({ left }) => {
  return (
    <div className="obstacle" style={{ left: `${left}px` }}>
         <img src="https://th.bing.com/th/id/OIP.qEpBZB8uRGbsD2MRNWQZHwHaHP?rs=1&pid=ImgDetMain" alt="Cactus" />
    </div>
  );
};

export default Obstacle;
