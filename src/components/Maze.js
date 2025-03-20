import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Maze() {
  const mesh = useRef();
  const { camera } = useThree();
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.1;
      switch (event.key) {
        case 'w':
          setPosition((pos) => [pos[0], pos[1], pos[2] - speed]);
          break;
        case 's':
          setPosition((pos) => [pos[0], pos[1], pos[2] + speed]);
          break;
        case 'a':
          setPosition((pos) => [pos[0] - speed, pos[1], pos[2]]);
          break;
        case 'd':
          setPosition((pos) => [pos[0] + speed, pos[1], pos[2]]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame(() => {
    camera.position.set(position[0], 1, position[2]);
  });

  return (
    <mesh ref={mesh} position={[0, -0.5, 0]}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default Maze;
