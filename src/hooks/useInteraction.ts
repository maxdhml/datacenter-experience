import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '../stores/gameStore.js';
import { GameState } from '../types/index.js';
import type { InteractiveObject } from '../types/index.js';

const INTERACT_RANGE = 3;

export interface InteractionResult {
  hoveredObject: InteractiveObject | null;
  canInteract: boolean;
  interact: () => void;
  closeInteraction: () => void;
}

/**
 * Raycasts from the camera centre to detect nearby interactive objects.
 *
 * The `objects` array is expected to be passed in by whatever component
 * keeps the list of InteractiveObjects for the current area.
 */
export function useInteraction(objects: InteractiveObject[]): InteractionResult {
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const [hoveredObject, setHoveredObject] = useState<InteractiveObject | null>(null);

  const gameState = useGameStore((s) => s.gameState);
  const setInteractingWith = useGameStore((s) => s.setInteractingWith);
  const addInteraction = useGameStore((s) => s.addInteraction);
  const playerPosition = useGameStore((s) => s.playerPosition);

  // ── Find closest object in range ─────────────────────────────
  const updateHovered = useCallback(() => {
    if (gameState !== GameState.PLAYING) {
      setHoveredObject(null);
      return;
    }

    const playerPos = new THREE.Vector3(...playerPosition);
    let closest: InteractiveObject | null = null;
    let closestDist = INTERACT_RANGE;

    for (const obj of objects) {
      const objPos = new THREE.Vector3(...obj.position);
      const dist = playerPos.distanceTo(objPos);
      if (dist < closestDist) {
        // Also check that the object is roughly in front of the camera
        raycaster.current.set(camera.position, camera.getWorldDirection(new THREE.Vector3()));
        const toObj = objPos.clone().sub(camera.position).normalize();
        const dot = raycaster.current.ray.direction.dot(toObj);
        if (dot > 0.5) {
          closest = obj;
          closestDist = dist;
        }
      }
    }

    setHoveredObject(closest);
  }, [camera, gameState, objects, playerPosition]);

  // Update on each render cycle (called externally or via effect)
  useEffect(() => {
    const id = setInterval(updateHovered, 100); // lightweight polling
    return () => clearInterval(id);
  }, [updateHovered]);

  // ── Interact action ──────────────────────────────────────────
  const interact = useCallback(() => {
    if (hoveredObject) {
      setInteractingWith(hoveredObject.id);
      addInteraction(hoveredObject.id);
    }
  }, [hoveredObject, setInteractingWith, addInteraction]);

  const closeInteraction = useCallback(() => {
    setInteractingWith(null);
  }, [setInteractingWith]);

  // ── Keyboard bindings ────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'KeyE' && hoveredObject && gameState === GameState.PLAYING) {
        interact();
      }
      if (e.code === 'Escape') {
        closeInteraction();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hoveredObject, gameState, interact, closeInteraction]);

  return {
    hoveredObject,
    canInteract: hoveredObject !== null,
    interact,
    closeInteraction,
  };
}
