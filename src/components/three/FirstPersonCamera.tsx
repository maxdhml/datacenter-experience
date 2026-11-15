import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMovement } from '../../hooks/useMovement.js';
import { useGameStore } from '../../stores/gameStore.js';
import { GameState } from '../../types/index.js';
import { presentationNotes } from '../../data/presentationNotes.js';

interface FirstPersonCameraProps {
  sensitivity?: number;
  headBobAmount?: number;
  headBobSpeed?: number;
}

export function FirstPersonCamera({
  sensitivity = 0.0020,
  headBobAmount = 0.025,
  headBobSpeed = 11,
}: FirstPersonCameraProps) {
  const { camera, gl } = useThree();

  // Smoothed camera rotation (angles in radians)
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  const bobPhase = useRef(0);
  const position = useRef(new THREE.Vector3(0, 1.6, -14)); // Start at reception entrance

  // Performance: Throttled store synchronization to avoid 144Hz React state churn
  const lastSyncTime = useRef(0);
  const lastSyncPos = useRef(new THREE.Vector3());
  const lastSyncYaw = useRef(0);

  const gameState = useGameStore((s) => s.gameState);
  const currentArea = useGameStore((s) => s.currentArea);
  const interactingWith = useGameStore((s) => s.interactingWith);
  const targetPOI = useGameStore((s) => s.targetPOI);
  const clearTargetPOI = useGameStore((s) => s.clearTargetPOI);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const setPlayerRotation = useGameStore((s) => s.setPlayerRotation);
  const togglePause = useGameStore((s) => s.togglePause);
  const setInteractingWith = useGameStore((s) => s.setInteractingWith);

  const movement = useMovement();
  const isLocked = useRef(false);

  // ── Mouse & Pointer Lock ──
  useEffect(() => {
    const canvas = gl.domElement;

    const onClick = () => {
      // Don't lock if interacting with info panel, paused or targetPOI active
      if (
        (gameState === GameState.PLAYING || gameState === GameState.MISSION) &&
        !interactingWith &&
        !isLocked.current
      ) {
        canvas.requestPointerLock();
      }
    };

    const onPointerLockChange = () => {
      isLocked.current = document.pointerLockElement === canvas;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return;
      targetYaw.current -= e.movementX * sensitivity;
      targetPitch.current -= e.movementY * sensitivity;
      targetPitch.current = Math.max(
        -Math.PI / 2 + 0.05,
        Math.min(Math.PI / 2 - 0.05, targetPitch.current)
      );
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (interactingWith) {
          setInteractingWith(null);
        } else if (gameState === GameState.PLAYING) {
          togglePause();
        }
      }
    };

    canvas.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gl, gameState, interactingWith, sensitivity, togglePause, setInteractingWith]);

  // Release pointer lock when paused or opening info panel
  useEffect(() => {
    if (interactingWith || gameState === GameState.PAUSED) {
      if (document.exitPointerLock && document.pointerLockElement) {
        document.exitPointerLock();
      }
    }
  }, [interactingWith, gameState]);

  // ── Frame Loop ──
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.08);

    // 1. POI Gliding Mode
    if (targetPOI && (gameState === GameState.PLAYING || gameState === GameState.MISSION)) {
      const goalPos = new THREE.Vector3(...targetPOI.position);
      position.current.lerp(goalPos, 1 - Math.exp(-6.0 * dt));

      const goalLookAt = new THREE.Vector3(...targetPOI.lookAt);
      const lookDir = goalLookAt.clone().sub(position.current).normalize();
      const goalYaw = Math.atan2(-lookDir.x, -lookDir.z);
      const goalPitch = Math.asin(lookDir.y);

      // Handle shortest angle wrap for yaw
      let diffYaw = goalYaw - currentYaw.current;
      while (diffYaw < -Math.PI) diffYaw += Math.PI * 2;
      while (diffYaw > Math.PI) diffYaw -= Math.PI * 2;

      currentYaw.current += diffYaw * (1 - Math.exp(-7.0 * dt));
      currentPitch.current += (goalPitch - currentPitch.current) * (1 - Math.exp(-7.0 * dt));

      targetYaw.current = currentYaw.current;
      targetPitch.current = currentPitch.current;

      camera.position.copy(position.current);
      const euler = new THREE.Euler(currentPitch.current, currentYaw.current, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      // Throttled store sync: drops React render churn from 144Hz to ~12Hz
      const now = performance.now();
      if (
        now - lastSyncTime.current > 75 &&
        (position.current.distanceToSquared(lastSyncPos.current) > 0.01 ||
          Math.abs(currentYaw.current - lastSyncYaw.current) > 0.02)
      ) {
        lastSyncTime.current = now;
        lastSyncPos.current.copy(position.current);
        lastSyncYaw.current = currentYaw.current;
        setPlayerPosition([position.current.x, position.current.y, position.current.z]);
        setPlayerRotation([currentYaw.current, currentPitch.current]);
      }

      if (position.current.distanceTo(goalPos) < 0.2) {
        clearTargetPOI();
      }
      return;
    }

    // 2. Presentation Mode
    if (gameState === GameState.PRESENTATION) {
      const note = presentationNotes[currentArea];
      if (note) {
        const targetPos = new THREE.Vector3(...note.cameraPosition);
        const targetLookAt = new THREE.Vector3(...note.cameraLookAt);

        position.current.lerp(targetPos, dt * 2.2);
        camera.position.copy(position.current);

        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(camera.position, targetLookAt, new THREE.Vector3(0, 1, 0))
        );
        camera.quaternion.slerp(targetQuat, dt * 2.8);

        // Store sync
        setPlayerPosition([position.current.x, position.current.y, position.current.z]);
      }
      return;
    }

    // 3. Normal Exploration Mode
    if (gameState === GameState.PLAYING || gameState === GameState.MISSION) {
      // Damped smooth mouse look
      const mouseSmoothing = 1 - Math.exp(-24 * dt);
      currentYaw.current += (targetYaw.current - currentYaw.current) * mouseSmoothing;
      currentPitch.current += (targetPitch.current - currentPitch.current) * mouseSmoothing;

      // Movement update using smoothed yaw
      const newPos = movement.update(dt, position.current, currentYaw.current);
      position.current.copy(newPos);

      // Subtle realistic head bobbing
      const { isMoving } = movement.getState();
      if (isMoving) {
        bobPhase.current += dt * headBobSpeed;
      } else {
        bobPhase.current *= 0.85;
      }
      const bobOffset = Math.sin(bobPhase.current) * headBobAmount;

      camera.position.set(
        position.current.x,
        position.current.y + bobOffset,
        position.current.z
      );

      const euler = new THREE.Euler(currentPitch.current, currentYaw.current, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      // Throttled store sync: drops React render churn from 144Hz to ~12Hz
      const now = performance.now();
      if (
        now - lastSyncTime.current > 75 &&
        (position.current.distanceToSquared(lastSyncPos.current) > 0.01 ||
          Math.abs(currentYaw.current - lastSyncYaw.current) > 0.02)
      ) {
        lastSyncTime.current = now;
        lastSyncPos.current.copy(position.current);
        lastSyncYaw.current = currentYaw.current;
        setPlayerPosition([position.current.x, position.current.y, position.current.z]);
        setPlayerRotation([currentYaw.current, currentPitch.current]);
      }
    }
  });

  return null;
}

export default FirstPersonCamera;
