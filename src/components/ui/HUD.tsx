import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { Area, GameState } from '../../types/index';
import { EQUIPMENT_TARGETS, EquipmentTarget } from '../../data/equipmentTargets';
import { soundManager } from '../../utils/audio';
import POINavigator from './POINavigator';
import '../../styles/HUD.css';

const AREA_META: Record<Area, { name: string; icon: string; zoneNum: number }> = {
  [Area.INTRODUCTION]: { name: 'Zone 01 • Bâtiment & Sécurité', icon: '🏢', zoneNum: 1 },
  [Area.SERVER_ROOM]: { name: 'Zone 02 • Salle des Serveurs', icon: '🖥️', zoneNum: 2 },
  [Area.COOLING]: { name: 'Zone 03 • Climatisation & Froid', icon: '❄️', zoneNum: 3 },
  [Area.ELECTRICAL]: { name: 'Zone 04 • Électricité & Secours', icon: '⚡', zoneNum: 4 },
  [Area.NETWORK]: { name: 'Zone 05 • Réseau & Internet', icon: '🌐', zoneNum: 5 },
  [Area.SECURITY]: { name: 'Zone 06 • Surveillance & Anti-Feu', icon: '🛡️', zoneNum: 6 },
};

interface HUDProps {
  onOpenQuiz?: () => void;
  onOpenSummary?: () => void;
}

export const HUD: React.FC<HUDProps> = ({ onOpenQuiz, onOpenSummary }) => {
  const currentArea = useGameStore((s) => s.currentArea);
  const interactingWith = useGameStore((s) => s.interactingWith);
  const getProgress = useGameStore((s) => s.getProgress);
  const playerPosition = useGameStore((s) => s.playerPosition);
  const playerRotation = useGameStore((s) => s.playerRotation);
  const setInteractingWith = useGameStore((s) => s.setInteractingWith);
  const addInteraction = useGameStore((s) => s.addInteraction);
  const teleportToPOI = useGameStore((s) => s.teleportToPOI);
  const completedInteractions = useGameStore((s) => s.completedInteractions);
  const gameState = useGameStore((s) => s.gameState);

  const guidedTourIndex = useGameStore((s) => s.guidedTourIndex);
  const nextGuidedPOI = useGameStore((s) => s.nextGuidedPOI);
  const prevGuidedPOI = useGameStore((s) => s.prevGuidedPOI);

  const [isPOIOpen, setIsPOIOpen] = useState(false);
  const [muted, setMuted] = useState(soundManager.isMuted());

  const areaInfo = AREA_META[currentArea] || {
    name: 'Datacenter',
    icon: '🏢',
    zoneNum: 1,
  };

  const currentStepTarget = EQUIPMENT_TARGETS[guidedTourIndex] || EQUIPMENT_TARGETS[0];

  // Calculate nearest interactive equipment within 4.8 meters for prompt
  const nearestTarget = useMemo<EquipmentTarget | null>(() => {
    const playerVec = new THREE.Vector3(...playerPosition);
    let closest: EquipmentTarget | null = null;
    let minDist = 4.8;

    for (const target of EQUIPMENT_TARGETS) {
      const targetVec = new THREE.Vector3(target.position[0], playerPosition[1], target.position[2]);
      const dist = playerVec.distanceTo(targetVec);
      if (dist < minDist) {
        minDist = dist;
        closest = target;
      }
    }
    return closest;
  }, [playerPosition]);

  // Points of interest for current zone with real-time navigation arrow & distance
  const zonePOIs = useMemo(() => {
    const px = playerPosition[0];
    const pz = playerPosition[2];
    const yaw = playerRotation[0];

    const targets = EQUIPMENT_TARGETS.filter((t) => t.zoneNumber === areaInfo.zoneNum);

    return targets.map((poi) => {
      const dx = poi.position[0] - px;
      const dz = poi.position[2] - pz;
      const dist = Math.hypot(dx, dz);

      // Bearing relative to player yaw
      const worldYaw = Math.atan2(-dx, -dz);
      let relAngle = worldYaw - yaw;
      while (relAngle < -Math.PI) relAngle += Math.PI * 2;
      while (relAngle > Math.PI) relAngle -= Math.PI * 2;

      let arrow = '▲';
      if (Math.abs(relAngle) < 0.4) {
        arrow = '▲';
      } else if (relAngle >= 0.4 && relAngle < 1.3) {
        arrow = '↗';
      } else if (relAngle >= 1.3 && relAngle < 2.0) {
        arrow = '▶';
      } else if (relAngle <= -0.4 && relAngle > -1.3) {
        arrow = '↖';
      } else if (relAngle <= -1.3 && relAngle > -2.0) {
        arrow = '◀';
      } else {
        arrow = '▼';
      }

      return {
        ...poi,
        distance: dist,
        arrow,
        isVisited: completedInteractions.has(poi.id),
      };
    });
  }, [playerPosition, playerRotation, areaInfo.zoneNum, completedInteractions]);

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Advance guided tour with Space or N (when info panel is not open)
      if (!interactingWith && (e.key === ' ' || e.key === 'n' || e.key === 'N')) {
        if (gameState === GameState.PLAYING || gameState === GameState.MISSION) {
          e.preventDefault();
          soundManager.playClick();
          nextGuidedPOI();
        }
      }

      // Previous guided tour with B
      if (!interactingWith && (e.key === 'b' || e.key === 'B')) {
        if (gameState === GameState.PLAYING || gameState === GameState.MISSION) {
          e.preventDefault();
          soundManager.playClick();
          prevGuidedPOI();
        }
      }

      // Toggle POI drawer with 'P'
      if (e.key === 'p' || e.key === 'P') {
        if (!interactingWith && (gameState === GameState.PLAYING || gameState === GameState.MISSION)) {
          soundManager.playClick();
          setIsPOIOpen((prev) => !prev);
        }
      }

      // Inspect with 'E'
      if ((e.key === 'e' || e.key === 'E') && nearestTarget && !interactingWith && !isPOIOpen) {
        if (gameState === GameState.PLAYING || gameState === GameState.MISSION) {
          soundManager.playInspect();
          setInteractingWith(nearestTarget.id);
          addInteraction(nearestTarget.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearestTarget, interactingWith, isPOIOpen, gameState, setInteractingWith, addInteraction, nextGuidedPOI, prevGuidedPOI]);

  const currentAreaProgress = useMemo(() => {
    const list = getProgress();
    const curr = list.find((p) => p.area === currentArea);
    return curr || { total: 2, completed: 0, percentage: 0 };
  }, [currentArea, getProgress]);

  const showPrompt = !interactingWith && !isPOIOpen && Boolean(nearestTarget);

  const handlePromptClick = () => {
    if (nearestTarget) {
      soundManager.playInspect();
      setInteractingWith(nearestTarget.id);
      addInteraction(nearestTarget.id);
    }
  };

  const handleGlideToPOI = (poi: EquipmentTarget) => {
    soundManager.playClick();
    teleportToPOI({
      position: poi.viewPosition,
      lookAt: poi.lookAt,
    });
  };

  const handleNextStep = () => {
    soundManager.playClick();
    nextGuidedPOI();
  };

  const handlePrevStep = () => {
    soundManager.playClick();
    prevGuidedPOI();
  };

  const handleCurrentStepClick = () => {
    if (currentStepTarget) {
      soundManager.playInspect();
      setInteractingWith(currentStepTarget.id);
      addInteraction(currentStepTarget.id);
    }
  };

  return (
    <>
      <div className="hud">
        {/* Top Left: Zone Title & Display of Current Points of Interest */}
        <div className="hud__top-left">
          <div className="hud__zone-pill">
            <span className="hud__zone-icon">{areaInfo.icon}</span>
            <span className="hud__zone-name">{areaInfo.name}</span>
            <span className="hud__zone-sep">•</span>
            <span className="hud__zone-count" title="Équipements explorés dans cette zone">
              {currentAreaProgress.completed}/{currentAreaProgress.total}
            </span>
          </div>

          {/* Current Zone Points of Interest Chips */}
          {zonePOIs.length > 0 && (
            <div className="hud__poi-chips">
              {zonePOIs.map((poi) => (
                <button
                  key={poi.id}
                  className={`hud__poi-chip ${poi.isVisited ? 'hud__poi-chip--visited' : ''}`}
                  onClick={() => handleGlideToPOI(poi)}
                  title={`Cliquer pour voler directement vers : ${poi.name}`}
                >
                  <span className="hud__poi-chip-icon">{poi.icon}</span>
                  <span className="hud__poi-chip-name">{poi.name}</span>
                  <span className="hud__poi-chip-nav">
                    <span className="hud__poi-chip-arrow">{poi.arrow}</span>
                    <span className="hud__poi-chip-dist">{poi.distance.toFixed(0)}m</span>
                  </span>
                  {poi.isVisited ? (
                    <span className="hud__poi-chip-status hud__poi-chip-status--done">✓</span>
                  ) : (
                    <span className="hud__poi-chip-status hud__poi-chip-status--todo">●</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Top Right: Minimal Controls (POI Drawer, Quiz, Mute) */}
        <div className="hud__top-right">
          {/* POI Drawer Trigger (Full List of 12) */}
          <button
            className="hud__icon-btn hud__icon-btn--pill"
            onClick={() => {
              soundManager.playClick();
              setIsPOIOpen(true);
            }}
            title="Afficher tous les 12 points d'intérêt du Datacenter [P]"
          >
            <span>📍</span>
            <span>POI</span>
            <span className="hud__btn-hint">P</span>
          </button>

          {/* Quick Quiz Trigger */}
          {onOpenQuiz && (
            <button
              className="hud__icon-btn hud__icon-btn--pill"
              onClick={() => {
                soundManager.playClick();
                onOpenQuiz();
              }}
              title="Quiz Datacenter [K]"
            >
              <span>🧠</span>
              <span>Quiz</span>
              <span className="hud__btn-hint">K</span>
            </button>
          )}

          {/* Summary Modal Trigger */}
          {onOpenSummary && (
            <button
              className="hud__icon-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenSummary();
              }}
              title="Bilan de l'exploration"
            >
              📊
            </button>
          )}

          {/* Audio Mute/Unmute */}
          <button
            className="hud__icon-btn"
            onClick={() => {
              soundManager.toggleMute();
              setMuted(soundManager.isMuted());
            }}
            title={muted ? 'Activer le son' : 'Couper le son'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Center Reticle */}
        <div
          className={`hud__crosshair ${
            showPrompt ? 'hud__crosshair--interact' : ''
          }`}
        />

        {/* Floating Minimal Interaction Prompt [E] (positioned above stepper) */}
        {showPrompt && nearestTarget && (
          <div className="hud__prompt" onClick={handlePromptClick}>
            <span className="hud__prompt-key">E</span>
            <span className="hud__prompt-label">Examiner</span>
            <span className="hud__prompt-name">{nearestTarget.name}</span>
          </div>
        )}

        {/* ── Guided Tour Bottom Stepper (Touche Espace pour avancer) ── */}
        {!interactingWith && (
          <div className="hud__stepper-bar">
            <button
              className="hud__stepper-btn"
              onClick={handlePrevStep}
              title="Équipement précédent [B]"
            >
              ◀
            </button>

            <div
              className="hud__stepper-info"
              onClick={handleCurrentStepClick}
              title="Cliquer pour ouvrir la fiche de cet équipement"
            >
              <div className="hud__stepper-badge">
                <span>VISITE GUIDÉE</span>
                <span className="hud__stepper-step">Étape {guidedTourIndex + 1}/12</span>
              </div>
              <div className="hud__stepper-name">
                <span>{currentStepTarget?.icon}</span>
                <strong>{currentStepTarget?.name}</strong>
              </div>
            </div>

            <button
              className="hud__stepper-btn hud__stepper-btn--next"
              onClick={handleNextStep}
              title="Avancer au point suivant [Espace]"
            >
              <span>Suivant</span>
              <span className="hud__stepper-key">Espace ➔</span>
            </button>
          </div>
        )}
      </div>

      {/* POI Drawer (All 12 Campus POIs) */}
      <POINavigator isOpen={isPOIOpen} onClose={() => setIsPOIOpen(false)} />
    </>
  );
};

export default HUD;
