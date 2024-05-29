// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Dino from './Dino';
import Obstacle from './Obstacle';
import './Game.css';

const Game = () => {
  const [jumping, setJumping] = useState(false);
  const [obstacles, setObstacles] = useState([{ left: 500 }]);
  const [dinoPosition, setDinoPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setJumping(true);
        setTimeout(() => setJumping(false), 600); // Increased from 300ms to 600ms
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prevObstacles) => {
        const newObstacles = prevObstacles.map((obstacle) => ({
          ...obstacle,
          left: obstacle.left - 5,
        }));

        if (newObstacles[0].left < -20) {
          newObstacles.shift();
        }

        if (newObstacles[newObstacles.length - 1].left < 300) {
          newObstacles.push({ left: 500 });
        }

        return newObstacles;
      });

      setDinoPosition((prevPosition) => {
        if (jumping) {
          return prevPosition < 150 ? prevPosition + 10 : prevPosition;
        } else {
          return prevPosition > 50 ? prevPosition - 10 : prevPosition;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, [jumping, gameOver]);

  useEffect(() => {
    const checkCollision = () => {
      const dinoRect = { left: 50, right: 100, top: 50, bottom: 100 };
      const obstacleRect = { left: obstacles[0].left, right: obstacles[0].left + 20, top: 60, bottom: 100 };

      if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
      ) {
        setGameOver(true);
      }
    };

    const collisionInterval = setInterval(checkCollision, 30);

    return () => clearInterval(collisionInterval);
  }, [obstacles]);

  return (
    <div className="game">
      <Dino jumping={jumping} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} left={obstacle.left} />
      ))}
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default Game;
