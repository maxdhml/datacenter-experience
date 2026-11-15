import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { useGameStore } from '../../stores/gameStore';
import type { InteractiveObject } from '../../types/index';
import { soundManager } from '../../utils/audio';

export interface InteractiveMarkerProps {
  id?: string;
  name?: string;
  position?: [number, number, number];
  description?: string;
  object?: InteractiveObject;
  onClick?: () => void;
}

export function InteractiveMarker(props: InteractiveMarkerProps) {
  const { id, name, position, object, onClick } = props;

  const actualId = id || object?.id || 'unknown';
  const actualName = name || object?.name || 'Équipement';
  const actualPos: [number, number, number] = position || object?.position || [0, 0, 0];

  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);
  const badgeGroupRef = useRef<THREE.Group>(null);

  const posX = actualPos[0];
  const posZ = actualPos[2];
  const markerVec = useMemo(
    () => new THREE.Vector3(posX, 1.6, posZ),
    [posX, posZ]
  );

  const setInteractingWith = useGameStore((s) => s.setInteractingWith);
  const addInteraction = useGameStore((s) => s.addInteraction);
  const completedInteractions = useGameStore((s) => s.completedInteractions);

  const isInspected = completedInteractions.has(actualId);

  useFrame((state, delta) => {
    const dist = state.camera.position.distanceTo(markerVec);

    // Visible up to 48 meters (across the entire zone and neighboring rooms)
    if (badgeGroupRef.current) {
      if (dist > 48) {
        badgeGroupRef.current.visible = false;
      } else {
        badgeGroupRef.current.visible = true;
        // Perspective distance scaling so markers remain clearly readable across the room
        const scale = Math.min(Math.max(dist * 0.22, 0.85), 2.2);
        badgeGroupRef.current.scale.set(scale, scale, scale);
      }
    }

    const t = state.clock.getElapsedTime();

    // Floating & rotating holographic diamond beacon
    if (diamondRef.current) {
      diamondRef.current.rotation.y += delta * 1.6;
      diamondRef.current.rotation.x = Math.sin(t * 1.8) * 0.2;
      diamondRef.current.position.y = 2.35 + Math.sin(t * 2.8) * 0.08;
    }

    // Floor rings animation
    if (ringRef.current) {
      const scale = 1 + Math.sin(t * 2.5) * 0.06;
      ringRef.current.scale.set(scale, scale, 1);
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (ringMat) {
        ringMat.opacity = dist < 6 ? 0.95 : 0.6;
      }
    }

    if (pulseRef.current) {
      const pulseProgress = (t * 0.75) % 1;
      const pulseScale = 1 + pulseProgress * 0.6;
      pulseRef.current.scale.set(pulseScale, pulseScale, 1);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(0, 0.45 * (1 - pulseProgress));
      }
    }
  });

  const handleClick = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    soundManager.playInspect();
    setInteractingWith(actualId);
    addInteraction(actualId);
    if (onClick) onClick();
  };

  const primaryColor = isInspected ? '#10b981' : '#0284c7';
  const glowColor = isInspected ? '#34d399' : '#38bdf8';

  return (
    <group position={[actualPos[0], 0, actualPos[2]]}>
      {/* ── Floor Marker: Grounded technical disc ── */}
      <group position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer technical ring */}
        <mesh ref={ringRef} onClick={handleClick}>
          <ringGeometry args={[0.5, 0.58, 32]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Expanding pulse wave */}
        <mesh ref={pulseRef}>
          <ringGeometry args={[0.58, 0.66, 32]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner solid contact point */}
        <mesh onClick={handleClick}>
          <circleGeometry args={[0.22, 20]} />
          <meshStandardMaterial
            color={primaryColor}
            emissive={glowColor}
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* ── Vertical Laser Light Pillar (Rises from ground to beacon) ── */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 2.3, 8]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.45} />
      </mesh>

      {/* ── Floating 3D Holographic Diamond Beacon ── */}
      <mesh ref={diamondRef} position={[0, 2.35, 0]} onClick={handleClick}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* ── Billboard Tag Always Facing Camera ── */}
      <group ref={badgeGroupRef} position={[0, 2.75, 0]}>
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <group onClick={handleClick}>
            {/* Background pill panel */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[1.7, 0.44]} />
              <meshStandardMaterial
                color="#090d16"
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={0.92}
              />
            </mesh>
            {/* Outline border */}
            <mesh position={[0, 0, 0.002]}>
              <planeGeometry args={[1.74, 0.48]} />
              <meshBasicMaterial
                color={glowColor}
                transparent
                opacity={0.85}
              />
            </mesh>
            <mesh position={[0, 0, 0.004]}>
              <planeGeometry args={[1.68, 0.42]} />
              <meshBasicMaterial color="#0b1120" />
            </mesh>

            {/* Status indicator pip */}
            <mesh position={[-0.7, 0, 0.01]}>
              <circleGeometry args={[0.05, 16]} />
              <meshBasicMaterial color={isInspected ? '#10b981' : '#38bdf8'} />
            </mesh>

            {/* Equipment Name Text */}
            <Text
              position={[-0.58, 0.06, 0.02]}
              fontSize={0.105}
              color="#ffffff"
              anchorX="left"
              anchorY="middle"
              maxWidth={1.22}
            >
              {actualName}
            </Text>

            {/* Prompt / Status subtext */}
            <Text
              position={[-0.58, -0.08, 0.02]}
              fontSize={0.078}
              color={glowColor}
              anchorX="left"
              anchorY="middle"
            >
              {isInspected ? '✓ Visite • [E] Revoir fiche' : "Point d'interet • [E] Examiner"}
            </Text>
          </group>
        </Billboard>
      </group>

      {/* Invisible larger click volume for easy user interaction */}
      <mesh
        position={[0, 1.4, 0]}
        onClick={handleClick}
        visible={false}
      >
        <cylinderGeometry args={[0.8, 0.8, 2.6, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default InteractiveMarker;
