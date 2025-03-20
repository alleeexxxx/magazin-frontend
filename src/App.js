import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Wave from './components/Wave';
import Fire from './components/Fire';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Canvas style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Wave count={100} position={[0, 0, 0]} />} />
            <Route path="/fire" element={<Fire count={100} />} />
          </Routes>
        </Suspense>
      </Canvas>
    </BrowserRouter>
  );
}

export default App;
