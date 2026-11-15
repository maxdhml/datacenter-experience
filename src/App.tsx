import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from './stores/gameStore';
import { GameState } from './types/index';
import FirstPersonCamera from './components/three/FirstPersonCamera';
import DatacenterEnvironment from './components/three/DatacenterEnvironment';
import MainMenu from './components/ui/MainMenu';
import HUD from './components/ui/HUD';
import InfoPanel from './components/ui/InfoPanel';
import PauseMenu from './components/ui/PauseMenu';
import QuizPanel from './components/ui/QuizPanel';
import EndSummary from './components/ui/EndSummary';

export default function App() {
  const gameState = useGameStore((s) => s.gameState);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Press 'K' to open Knowledge Quiz anytime during exploration
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' || e.key === 'K') {
        if (gameState === GameState.PLAYING) {
          setIsQuizOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState]);

  // Main menu screen
  if (gameState === GameState.MENU) {
    return <MainMenu />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas with realistic bright industrial rendering */}
      <Canvas
        shadows={false}
        dpr={[1, 1.25]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.35,
          powerPreference: 'high-performance',
          precision: 'mediump',
        }}
        camera={{ fov: 72, near: 0.1, far: 380, position: [0, 1.6, -14] }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#1e293b', 50, 150]} />
        <Suspense fallback={null}>
          <FirstPersonCamera />
          <DatacenterEnvironment />
        </Suspense>
      </Canvas>

      {/* Integrated Modern HUD Layer */}
      <HUD
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSummary={() => setIsSummaryOpen(true)}
      />

      {/* Equipment Detailed Info Drawer with Interactive Animated Schematics */}
      <InfoPanel />

      {/* Pause Menu Overlay */}
      {gameState === GameState.PAUSED && <PauseMenu />}

      {/* Standalone Quiz Modal */}
      <QuizPanel isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Exploration Summary Modal */}
      <EndSummary isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} />
    </div>
  );
}
