import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GameState } from '../../types/index';
import QuizPanel from './QuizPanel';
import { soundManager } from '../../utils/audio';
import '../../styles/PauseMenu.css';

export const PauseMenu: React.FC = () => {
  const gameState = useGameStore((s) => s.gameState);
  const setGameState = useGameStore((s) => s.setGameState);
  const togglePause = useGameStore((s) => s.togglePause);

  const [isQuizOpen, setIsQuizOpen] = useState(false);

  if (gameState !== GameState.PAUSED) return null;

  return (
    <>
      <div className="pause-overlay" onClick={togglePause}>
        <div className="pause-card" onClick={(e) => e.stopPropagation()}>
          <h2 className="pause-card__title">PAUSE • EXPLORATION</h2>

          <div className="pause-card__buttons">
            <button
              className="main-menu__btn main-menu__btn--primary"
              onClick={() => {
                soundManager.playClick();
                togglePause();
              }}
            >
              ▶ Reprendre l&apos;Exploration 3D
            </button>
            <button
              className="main-menu__btn"
              onClick={() => {
                soundManager.playClick();
                setIsQuizOpen(true);
              }}
            >
              🧠 Défi Quiz Connaissances
            </button>
            <button
              className="main-menu__btn"
              style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
              onClick={() => {
                soundManager.playClick();
                setGameState(GameState.MENU);
              }}
            >
              🚪 Retour à l&apos;Accueil
            </button>
          </div>
        </div>
      </div>

      <QuizPanel isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default PauseMenu;
