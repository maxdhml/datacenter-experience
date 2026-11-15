import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GameState } from '../../types/index';
import { missionScenarios, defaultScenario } from '../../data/missionData';
import '../../styles/MissionPanel.css';

export const MissionPanel: React.FC = () => {
  const gameState = useGameStore((s) => s.gameState);
  const missionState = useGameStore((s) => s.missionState);
  const setGameState = useGameStore((s) => s.setGameState);
  const startMission = useGameStore((s) => s.startMission);
  const advanceMission = useGameStore((s) => s.advanceMission);
  const completeMission = useGameStore((s) => s.completeMission);
  const interactingWith = useGameStore((s) => s.interactingWith);

  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>('cooling');

  // Listen to equipment interactions to advance mission if matches step target
  useEffect(() => {
    if (gameState !== GameState.MISSION || !missionState.scenario) return;
    const currentStep = missionState.scenario.steps[missionState.currentStep];
    if (currentStep && currentStep.targetObjectId && interactingWith === currentStep.targetObjectId) {
      if (missionState.currentStep < missionState.scenario.steps.length - 1) {
        advanceMission();
      } else {
        completeMission();
      }
    }
  }, [interactingWith, gameState, missionState, advanceMission, completeMission]);

  if (gameState !== GameState.MISSION) return null;

  const currentScenario = missionState.scenario || defaultScenario;
  const isCompleted = missionState.currentStep >= currentScenario.steps.length;

  const handleSelectScenario = (key: string) => {
    setSelectedScenarioKey(key);
    startMission(missionScenarios[key]);
  };

  return (
    <div className="mission-ui">
      {/* ── Top Alarm Banner ── */}
      <div className="mission-ui__banner">
        <span className="mission-ui__banner-icon">🚨</span>
        <span className="mission-ui__banner-title">
          {isCompleted
            ? 'INCIDENT MAÎTRISÉ • PARAMÈTRES NOMINAUX RÉTABLIS'
            : 'INCIDENT CRITIQUE EN COURS — INTERVENTION REQUISE'}
        </span>
      </div>

      {/* ── Objectives Checklist Card ── */}
      <div className="mission-ui__card">
        <div className="mission-ui__card-header">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {Object.keys(missionScenarios).map((key) => (
              <button
                key={key}
                className={`pres-mode__btn ${
                  selectedScenarioKey === key ? 'pres-mode__btn--active' : ''
                }`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => handleSelectScenario(key)}
              >
                {key === 'cooling'
                  ? 'Thermique'
                  : key === 'electrical'
                  ? 'Électrique'
                  : 'Réseau IP'}
              </button>
            ))}
          </div>
          <h3 className="mission-ui__card-title">{currentScenario.title}</h3>
          <p className="mission-ui__card-desc">{currentScenario.description}</p>
        </div>

        <div className="mission-ui__steps">
          {currentScenario.steps.map((step, idx) => {
            const isDone = idx < missionState.currentStep || isCompleted;
            const isCurrent = idx === missionState.currentStep && !isCompleted;
            return (
              <div
                key={step.id}
                className={`mission-ui__step ${
                  isCurrent
                    ? 'mission-ui__step--current'
                    : isDone
                    ? 'mission-ui__step--done'
                    : ''
                }`}
              >
                <span className="mission-ui__step-num">
                  {isDone ? '✓' : `0${idx + 1}.`}
                </span>
                <span>{step.instruction}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button
            className="main-menu__btn"
            style={{ padding: '8px 14px', fontSize: '0.8rem', minWidth: 'auto' }}
            onClick={() => setGameState(GameState.PLAYING)}
          >
            Quitter la Mission
          </button>
          {!isCompleted && (
            <button
              className="main-menu__btn main-menu__btn--primary"
              style={{ padding: '8px 14px', fontSize: '0.8rem', minWidth: 'auto' }}
              onClick={() => {
                if (missionState.currentStep < currentScenario.steps.length - 1) {
                  advanceMission();
                } else {
                  completeMission();
                }
              }}
            >
              Étape Suivante ➔
            </button>
          )}
        </div>
      </div>

      {/* ── Success Resolution Modal ── */}
      {isCompleted && (
        <div className="mission-ui__success-modal">
          <h2 className="mission-ui__success-title">
            <span>🎉</span> Félicitations ! Incident Résolu avec Succès
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
            {currentScenario.solutionExplanation}
          </p>
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              borderLeft: '4px solid #22c55e',
              padding: '12px 16px',
              borderRadius: '4px',
              color: '#dcfce7',
              fontSize: '0.9rem',
            }}
          >
            <strong>Conséquences évitées :</strong> {currentScenario.consequences}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              className="main-menu__btn main-menu__btn--primary"
              onClick={() => setGameState(GameState.PLAYING)}
            >
              Reprendre l&apos;exploration libre
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionPanel;

