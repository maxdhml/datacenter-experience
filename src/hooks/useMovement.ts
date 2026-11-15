import { useRef } from 'react';
import * as THREE from 'three';
import { useKeyboard } from './useKeyboard.js';
import { useGameStore } from '../stores/gameStore.js';
import { Area, GameState } from '../types/index.js';

// Compact corridor boundaries: -14 <= x <= 14, -22 <= z <= 108 (~130m total)
const MIN_X = -14.2;
const MAX_X = 14.2;
const MIN_Z = -22.0;
const MAX_Z = 108.0;

const BASE_SPEED = 6.2; // units per second
const SPRINT_SPEED = 10.5; // fast fluid run when holding Shift

function isKey(keys: Map<string, boolean>, code: string): boolean {
  return keys.get(code) === true;
}

export interface MovementResult {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  velocity: THREE.Vector3;
  isMoving: boolean;
  isSprinting: boolean;
}

export function useMovement() {
  const keysRef = useKeyboard();
  const currentVelocity = useRef(new THREE.Vector3());
  const targetVelocity = useRef(new THREE.Vector3());

  const currentArea = useGameStore((s) => s.currentArea);
  const setArea = useGameStore((s) => s.setArea);
  const gameState = useGameStore((s) => s.gameState);
  const interactingWith = useGameStore((s) => s.interactingWith);
  const targetPOI = useGameStore((s) => s.targetPOI);

  function update(
    delta: number,
    currentPos: THREE.Vector3,
    yaw: number,
  ): THREE.Vector3 {
    // Freeze movement during inspection, guided tour camera gliding, or menus
    if (
      (gameState !== GameState.PLAYING && gameState !== GameState.MISSION) ||
      interactingWith ||
      targetPOI
    ) {
      currentVelocity.current.set(0, 0, 0);
      return currentPos;
    }

    const keys = keysRef.current;

    // Support ZQSD (French AZERTY) and WASD (QWERTY) + Arrow Keys
    const forward =
      isKey(keys, 'KeyW') || isKey(keys, 'KeyZ') || isKey(keys, 'ArrowUp');
    const backward = isKey(keys, 'KeyS') || isKey(keys, 'ArrowDown');
    const left =
      isKey(keys, 'KeyA') || isKey(keys, 'KeyQ') || isKey(keys, 'ArrowLeft');
    const right = isKey(keys, 'KeyD') || isKey(keys, 'ArrowRight');
    const sprint = isKey(keys, 'ShiftLeft') || isKey(keys, 'ShiftRight');

    const moveForward = (forward ? 1 : 0) - (backward ? 1 : 0);
    const moveStrafe = (right ? 1 : 0) - (left ? 1 : 0);

    // Forward direction from camera yaw (looking along horizontal XZ plane)
    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);

    // Right / Strafe direction perpendicular to forward
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);

    // Combine forward and strafe vectors
    let moveX = moveForward * forwardX + moveStrafe * rightX;
    let moveZ = moveForward * forwardZ + moveStrafe * rightZ;

    const moveLen = Math.hypot(moveX, moveZ);
    if (moveLen > 0.001) {
      moveX /= moveLen;
      moveZ /= moveLen;
    }

    const activeSpeed = sprint ? SPRINT_SPEED : BASE_SPEED;
    targetVelocity.current.set(moveX * activeSpeed, 0, moveZ * activeSpeed);

    // Snappy responsive physics damping (immediate acceleration & clean stop without sliding)
    const dampingSpeed = moveLen > 0 ? 18 : 26;
    const lerpFactor = 1 - Math.exp(-dampingSpeed * delta);
    currentVelocity.current.lerp(targetVelocity.current, lerpFactor);

    // Apply movement with smooth wall-sliding boundary clamps
    let nextX = currentPos.x + currentVelocity.current.x * delta;
    let nextZ = currentPos.z + currentVelocity.current.z * delta;

    if (nextX < MIN_X) {
      nextX = MIN_X;
      currentVelocity.current.x = 0;
    } else if (nextX > MAX_X) {
      nextX = MAX_X;
      currentVelocity.current.x = 0;
    }

    if (nextZ < MIN_Z) {
      nextZ = MIN_Z;
      currentVelocity.current.z = 0;
    } else if (nextZ > MAX_Z) {
      nextZ = MAX_Z;
      currentVelocity.current.z = 0;
    }

    const newPos = currentPos.clone();
    newPos.x = nextX;
    newPos.z = nextZ;

    // Auto-detect area by compact Z coordinate
    let detectedArea = Area.INTRODUCTION;
    if (newPos.z >= 88) {
      detectedArea = Area.SECURITY;
    } else if (newPos.z >= 66) {
      detectedArea = Area.NETWORK;
    } else if (newPos.z >= 44) {
      detectedArea = Area.ELECTRICAL;
    } else if (newPos.z >= 22) {
      detectedArea = Area.COOLING;
    } else if (newPos.z >= 0) {
      detectedArea = Area.SERVER_ROOM;
    } else {
      detectedArea = Area.INTRODUCTION;
    }

    if (detectedArea !== currentArea) {
      setArea(detectedArea);
    }

    return newPos;
  }

  function getState(): MovementResult {
    const keys = keysRef.current;
    const forward =
      isKey(keys, 'KeyW') || isKey(keys, 'KeyZ') || isKey(keys, 'ArrowUp');
    const backward = isKey(keys, 'KeyS') || isKey(keys, 'ArrowDown');
    const left =
      isKey(keys, 'KeyA') || isKey(keys, 'KeyQ') || isKey(keys, 'ArrowLeft');
    const right = isKey(keys, 'KeyD') || isKey(keys, 'ArrowRight');
    const sprint = isKey(keys, 'ShiftLeft') || isKey(keys, 'ShiftRight');

    return {
      moveForward: forward,
      moveBackward: backward,
      moveLeft: left,
      moveRight: right,
      velocity: currentVelocity.current.clone(),
      isMoving: currentVelocity.current.lengthSq() > 0.1,
      isSprinting: sprint,
    };
  }

  return { update, getState };
}
