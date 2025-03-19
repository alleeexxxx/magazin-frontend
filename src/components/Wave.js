import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Wave({ count, position }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const wave = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 4 - 2;
      const y = Math.random() * 4 - 2;
      const z = Math.random() * 4 - 2;
      const scale = Math.random() * 0.5 + 0.5;
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    wave.forEach((particle, i) => {
      const { x, y, z, scale } = particle;
      const t = state.clock.getElapsedTime();
      dummy.position.set(x, y + Math.sin(t + i / 1.5) / 2, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </instancedMesh>
  );
}

export default Wave;