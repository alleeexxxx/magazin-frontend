import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MathUtils } from 'three';

function Wave() {
  const mesh = useRef();
  const waveLength = 2;
  const amplitude = 0.5;
  const speed = 2;

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime * speed;
    mesh.current.position.y = amplitude * Math.sin(mesh.current.position.x / waveLength + time);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshBasicMaterial color="lightblue" wireframe={true} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Wave />
    </Canvas>
  );
}

export default App;
