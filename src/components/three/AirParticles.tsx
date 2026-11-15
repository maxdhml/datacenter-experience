import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Bounds =
  | { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number }
  | { min: [number, number, number]; max: [number, number, number] };

interface AirParticlesProps {
  direction?: 'up' | 'down';
  color?: string;
  bounds?: Bounds;
  count?: number;
  speed?: number;
}

export default function AirParticles({
  direction = 'up',
  color = '#4488ff',
  bounds = { minX: -5, maxX: 5, minY: 0, maxY: 8, minZ: -5, maxZ: 5 },
  count = 60,
  speed = 1,
}: AirParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const b = useMemo(() => {
    if ('min' in bounds && 'max' in bounds) {
      return {
        minX: bounds.min[0],
        maxX: bounds.max[0],
        minY: bounds.min[1],
        maxY: bounds.max[1],
        minZ: bounds.min[2],
        maxZ: bounds.max[2],
      };
    }
    return bounds;
  }, [bounds]);

  // Initialize particle positions and deterministic pseudo-random offsets
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const r2 = Math.abs(Math.sin((i + 1) * 23.123 + 45.678) * 43758.5453) % 1;
      const r3 = Math.abs(Math.sin((i + 2) * 34.567 + 89.012) * 43758.5453) % 1;
      const r4 = Math.abs(Math.sin((i + 3) * 45.678 + 12.345) * 43758.5453) % 1;
      const r5 = Math.abs(Math.sin((i + 4) * 56.789 + 67.890) * 43758.5453) % 1;
      const r6 = Math.abs(Math.sin((i + 5) * 67.890 + 23.456) * 43758.5453) % 1;
      arr.push({
        x: THREE.MathUtils.lerp(b.minX, b.maxX, r1),
        y: THREE.MathUtils.lerp(b.minY, b.maxY, r2),
        z: THREE.MathUtils.lerp(b.minZ, b.maxZ, r3),
        phase: r4 * Math.PI * 2,
        speedMul: 0.7 + r5 * 0.6,
        size: 0.04 + r6 * 0.05,
      });
    }
    return arr;
  }, [count, b]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const rangeY = b.maxY - b.minY || 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dirSign = direction === 'up' ? 1 : -1;

      // Vertical cycling motion
      let y = p.y + dirSign * t * speed * p.speedMul;
      // Wrap around
      y = b.minY + ((((y - b.minY) % rangeY) + rangeY) % rangeY);

      // Subtle horizontal sway
      const swayX = Math.sin(t * 1.5 + p.phase) * 0.15;
      const swayZ = Math.cos(t * 1.2 + p.phase) * 0.15;

      dummy.position.set(p.x + swayX, y, p.z + swayZ);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
