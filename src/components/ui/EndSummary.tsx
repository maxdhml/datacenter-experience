import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GameState } from '../../types/index';
import '../../styles/EndSummary.css';

export const EndSummary: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const setGameState = useGameStore((s) => s.setGameState);
  const completedInteractions = useGameStore((s) => s.completedInteractions);
  const quizResults = useGameStore((s) => s.quizResults);
  const getProgress = useGameStore((s) => s.getProgress);

  if (!isOpen) return null;

  const totalCorrectQuiz = quizResults.filter((q) => q.correct).length;
  const progressList = getProgress();
  const overallAvg = Math.round(
    progressList.reduce((acc, p) => acc + p.percentage, 0) / progressList.length
  );

  return (
    <div className="end-summary-overlay" onClick={onClose}>
      <div className="end-summary-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="end-summary__title">BILAN DE L&apos;EXPÉRIENCE DATACENTER</h2>

        <div className="end-summary__stats-grid">
          <div className="end-summary__stat-box">
            <div className="end-summary__stat-value" style={{ color: '#38bdf8' }}>
              {completedInteractions.size}
            </div>
            <div className="end-summary__stat-label">Équipements Découverts</div>
          </div>
          <div className="end-summary__stat-box">
            <div className="end-summary__stat-value" style={{ color: '#22c55e' }}>
              {totalCorrectQuiz}/{quizResults.length || 0}
            </div>
            <div className="end-summary__stat-label">Score Quiz</div>
          </div>
          <div className="end-summary__stat-box">
            <div className="end-summary__stat-value" style={{ color: '#a855f7' }}>
              {overallAvg}%
            </div>
            <div className="end-summary__stat-label">Maîtrise Globale</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#94a3b8', fontSize: '0.85rem' }}>
            PROGRESSION PAR ZONE TECHNIQUE
          </h4>
          {progressList.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', width: '130px', color: '#cbd5e1' }}>
                {item.area}
              </span>
              <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${item.percentage}%`, height: '100%', background: '#0ea5e9', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '0.8rem', width: '40px', textAlign: 'right', color: '#38bdf8' }}>
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            className="main-menu__btn"
            onClick={() => {
              onClose();
              setGameState(GameState.MENU);
            }}
          >
            Retour au Menu Principal
          </button>
          <button
            className="main-menu__btn main-menu__btn--primary"
            onClick={onClose}
          >
            Continuer la Découverte
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndSummary;

