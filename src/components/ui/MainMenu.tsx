import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GameState } from '../../types/index';
import { soundManager } from '../../utils/audio';
import '../../styles/MainMenu.css';

export const MainMenu: React.FC = () => {
  const setGameState = useGameStore((s) => s.setGameState);
  const startGuidedTour = useGameStore((s) => s.startGuidedTour);

  const handleStartGuided = () => {
    soundManager.playClick();
    startGuidedTour(0);
  };

  const handleStartFree = () => {
    soundManager.playClick();
    setGameState(GameState.PLAYING);
  };

  return (
    <div className="main-menu">
      <div className="main-menu__grid" />

      <div className="main-menu__content" style={{ maxWidth: '680px' }}>
        <h1 className="main-menu__title" style={{ fontSize: '2.8rem', letterSpacing: '-0.02em' }}>
          DATACENTER EXPERIENCE
        </h1>
        <p className="main-menu__subtitle" style={{ fontSize: '1.15rem', color: '#94a3b8', margin: '0 auto 1.2rem auto' }}>
          Visite 3D Guidée & Schémas Techniques • Découverte du Datacenter
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '20px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem' }}>
          🧭 12 Étapes clés • Touche [Espace] pour avancer
        </div>

        {/* Start Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%' }}>
          <button
            className="main-menu__btn main-menu__btn--primary"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '16px 28px',
              fontSize: '1.15rem',
              fontWeight: 800,
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(14, 165, 233, 0.45)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            onClick={handleStartGuided}
          >
            <span>🚀 Lancer la Visite Guidée (Recommandé)</span>
          </button>

          <button
            className="main-menu__btn"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#e2e8f0',
              cursor: 'pointer',
            }}
            onClick={handleStartFree}
          >
            🚶 Exploration Libre (ZQSD + Souris)
          </button>
        </div>

        {/* Quick Controls Reference */}
        <div
          style={{
            marginTop: '32px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>⚡</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>Touche [Espace]</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Point suivant en direct</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>⌨️</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>ZQSD / WASD</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Marcher / Courir (Shift)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>📖</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>Touche [E]</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Inspecter & Synthèse</div>
          </div>
        </div>
      </div>

      <span className="main-menu__version">Tier IV • Universitaire Télécoms & Réseaux</span>
    </div>
  );
};

export default MainMenu;
