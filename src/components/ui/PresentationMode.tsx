import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GameState, Area } from '../../types/index';
import { presentationNotes } from '../../data/presentationNotes';
import '../../styles/PresentationMode.css';

const AREA_LIST: Area[] = [
  Area.INTRODUCTION,
  Area.SERVER_ROOM,
  Area.COOLING,
  Area.ELECTRICAL,
  Area.NETWORK,
  Area.SECURITY,
];

export const PresentationMode: React.FC = () => {
  const gameState = useGameStore((s) => s.gameState);
  const currentArea = useGameStore((s) => s.currentArea);
  const setGameState = useGameStore((s) => s.setGameState);
  const nextPresentationArea = useGameStore((s) => s.nextPresentationArea);
  const prevPresentationArea = useGameStore((s) => s.prevPresentationArea);
  const stopPresentation = useGameStore((s) => s.stopPresentation);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);

  const [notesOpen, setNotesOpen] = useState(true);

  if (gameState !== GameState.PRESENTATION) return null;

  const areaNote = presentationNotes[currentArea] || presentationNotes[Area.INTRODUCTION];
  const currentIndex = AREA_LIST.indexOf(currentArea);

  const handleNext = () => {
    nextPresentationArea();
    const nextIdx = Math.min(currentIndex + 1, AREA_LIST.length - 1);
    const targetArea = AREA_LIST[nextIdx];
    const targetPos = presentationNotes[targetArea]?.cameraPosition;
    if (targetPos) {
      setPlayerPosition(targetPos);
    }
  };

  const handlePrev = () => {
    prevPresentationArea();
    const prevIdx = Math.max(currentIndex - 1, 0);
    const targetArea = AREA_LIST[prevIdx];
    const targetPos = presentationNotes[targetArea]?.cameraPosition;
    if (targetPos) {
      setPlayerPosition(targetPos);
    }
  };

  return (
    <div className="pres-mode">
      {/* ── Top Bar ── */}
      <div className="pres-mode__top-bar">
        <div className="pres-mode__badge">
          <div className="pres-mode__indicator" />
          <h2 className="pres-mode__title">
            MODE PRÉSENTATION UNIVERSITAIRE — RÉSEAUX & TÉLÉCOMS
          </h2>
        </div>

        <div className="pres-mode__actions">
          <button
            className={`pres-mode__btn ${notesOpen ? 'pres-mode__btn--active' : ''}`}
            onClick={() => setNotesOpen((o) => !o)}
          >
            📋 {notesOpen ? 'Masquer Notes Orateur' : 'Afficher Notes Orateur'}
          </button>
          <button
            className="pres-mode__btn"
            onClick={() => setGameState(GameState.PLAYING)}
          >
            🎮 Mode Vol Libre
          </button>
          <button
            className="pres-mode__btn"
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
            onClick={() => stopPresentation()}
          >
            ✕ Quitter Présentation
          </button>
        </div>
      </div>

      {/* ── Speaker Notes Drawer ── */}
      {notesOpen && (
        <div className="pres-mode__notes-drawer">
          <div>
            <h3 className="pres-mode__notes-title">{areaNote.title}</h3>
            <p className="pres-mode__notes-subtitle">
              {areaNote.subtitle} • Durée estimée : ~{areaNote.durationMinutes} min
            </p>
          </div>

          <div>
            <div className="pres-mode__notes-section-title">
              🎙️ Suggestions d&apos;Élocution (Discours Présentateur)
            </div>
            {areaNote.speechNotes.map((note, idx) => (
              <div key={idx} className="pres-mode__speech-box" style={{ marginBottom: '8px' }}>
                {note}
              </div>
            ))}
          </div>

          <div>
            <div className="pres-mode__notes-section-title">
              📌 Notions Techniques Clés à Expliquer
            </div>
            <ul className="pres-mode__keypoints-list">
              {areaNote.keyPoints.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>

          {areaNote.suggestedQuestions && (
            <div>
              <div className="pres-mode__notes-section-title">
                ❓ Questions à Poser à l&apos;Auditoire
              </div>
              <ul className="pres-mode__keypoints-list">
                {areaNote.suggestedQuestions.map((q, idx) => (
                  <li key={idx} style={{ color: '#fed7aa' }}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom Guided Navigation ── */}
      <div className="pres-mode__bottom-bar">
        <button
          className="pres-mode__nav-btn"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
        >
          ← Zone Précédente
        </button>

        <span className="pres-mode__area-badge">
          Zone {currentIndex + 1} / {AREA_LIST.length}
        </span>

        <button
          className="pres-mode__nav-btn"
          onClick={handleNext}
          disabled={currentIndex >= AREA_LIST.length - 1}
        >
          Zone Suivante →
        </button>
      </div>
    </div>
  );
};

export default PresentationMode;

