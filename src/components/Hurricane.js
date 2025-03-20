import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Hurricane({ count }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = Math.random() * 4;
      const z = (Math.random() - 0.5) * 4;
      const scale = Math.random() * 0.3 + 0.2;
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const { x, y, z, scale } = particle;
      const t = state.clock.getElapsedTime();
      dummy.position.set(x * Math.cos(t), y, z * Math.sin(t));
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </instancedMesh>
  );
}

export default Hurricane;
