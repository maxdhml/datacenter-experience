import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedPacketProps {
  path: THREE.Vector3[];
  speed?: number;
  color?: string;
  loop?: boolean;
  trailLength?: number;
}

interface TrailPoint {
  position: THREE.Vector3;
  opacity: number;
}

export default function AnimatedPacket({
  path,
  speed = 5,
  color = '#00d4ff',
  loop = true,
  trailLength = 12,
}: AnimatedPacketProps) {
  const packetRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailTimerRef = useRef(0);

  // Compute total path length and segments
  const { totalLength, segments } = useMemo(() => {
    const segs: { start: THREE.Vector3; end: THREE.Vector3; length: number; cumulative: number }[] = [];
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const len = path[i].distanceTo(path[i + 1]);
      total += len;
      segs.push({ start: path[i], end: path[i + 1], length: len, cumulative: total });
    }
    return { totalLength: total, segments: segs };
  }, [path]);

  useFrame((_, delta) => {
    if (!packetRef.current || totalLength === 0) return;

    progressRef.current += (speed * delta) / totalLength;

    if (progressRef.current >= 1) {
      if (loop) {
        progressRef.current = 0;
      } else {
        progressRef.current = 1;
        return;
      }
    }

    const targetDist = progressRef.current * totalLength;

    // Find current segment
    let pos = path[0].clone();
    for (const seg of segments) {
      if (targetDist <= seg.cumulative) {
        const segStart = seg.cumulative - seg.length;
        const t = (targetDist - segStart) / seg.length;
        pos = seg.start.clone().lerp(seg.end, t);
        break;
      }
    }

    packetRef.current.position.copy(pos);

    // Add trail points at intervals
    trailTimerRef.current += delta;
    if (trailTimerRef.current > 0.03) {
      trailTimerRef.current = 0;
      setTrail((prev) => {
        const next = [{ position: pos.clone(), opacity: 1 }, ...prev];
        return next.slice(0, trailLength).map((p, i) => ({
          ...p,
          opacity: 1 - i / trailLength,
        }));
      });
    }
  });

  return (
    <group>
      {/* Main packet sphere */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Glow sphere */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
      {/* Trail */}
      {trail.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            transparent
            opacity={point.opacity * 0.6}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
