import React, { useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getEquipmentById, EquipmentInfo } from '../../data/educationalContent';
import { UpsSchematic, CoolingSchematic, NetworkSchematic, SecuritySchematic } from './InteractiveSchematics';
import { soundManager } from '../../utils/audio';
import '../../styles/InfoPanel.css';

export const InfoPanel: React.FC = () => {
  const interactingWith = useGameStore((s) => s.interactingWith);
  const setInteractingWith = useGameStore((s) => s.setInteractingWith);
  const guidedTourIndex = useGameStore((s) => s.guidedTourIndex);
  const nextGuidedPOI = useGameStore((s) => s.nextGuidedPOI);
  const prevGuidedPOI = useGameStore((s) => s.prevGuidedPOI);

  useEffect(() => {
    if (interactingWith) {
      soundManager.playInspect();
    }
  }, [interactingWith]);

  useEffect(() => {
    if (!interactingWith) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        soundManager.playClick();
        setInteractingWith(null);
      } else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        soundManager.playClick();
        nextGuidedPOI();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        soundManager.playClick();
        prevGuidedPOI();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [interactingWith, setInteractingWith, nextGuidedPOI, prevGuidedPOI]);

  if (!interactingWith) return null;

  const equipment: EquipmentInfo = getEquipmentById(interactingWith) || {
    id: interactingWith,
    name: 'Équipement Datacenter',
    category: 'Infrastructure',
    definition: "Composant d'infrastructure critique haute disponibilité assurant la continuité de service.",
    purpose: "Garantir un SLA de 99,99 % sans interruption de charge.",
    howItWorks: "Opère en redondance 2N avec bascule automatique.",
    realWorldExample: "Déployé chez les opérateurs hyperscale mondiaux.",
    oralPitch: "« Cet équipement garantit la tolérance aux pannes du site en éliminant tout point de défaillance unique. »",
    keyPoints: [
      'Disponibilité continue 24h/24 et 7j/7',
      'Redondance matérielle sans coupure de service',
      'Supervision télémétrique en temps réel',
    ],
    keyMetric: '99,99 % de disponibilité',
  };

  // Determine schematic based on category or ID
  const isElectrical =
    equipment.category.includes('Électrique') ||
    equipment.category.includes('Énergie') ||
    equipment.category.includes('Secours') ||
    ['ups', 'batteries', 'generator', 'pdu', 'transformer', 'ats'].includes(equipment.id);

  const isCooling =
    equipment.category.includes('Climatisation') ||
    equipment.category.includes('Aéraulique') ||
    equipment.category.includes('Froid') ||
    equipment.category.includes('Air') ||
    ['crac-unit', 'cold-aisle', 'hot-aisle', 'raised-floor', 'cooling-tower'].includes(equipment.id);

  const isNetwork =
    equipment.category.includes('Réseau') ||
    equipment.category.includes('Transit') ||
    equipment.category.includes('Connexion') ||
    equipment.category.includes('Calcul') ||
    equipment.category.includes('Cyber') ||
    ['server-rack', 'network-switch', 'bgp-router', 'spine-switch', 'firewall', 'fiber-optic', 'fiber-backbone', 'patch-panel'].includes(equipment.id);

  const isSecurity =
    equipment.category.includes('Sécurité') ||
    equipment.category.includes('Supervision') ||
    ['datacenter-building', 'access-control', 'noc-monitor', 'siem-system', 'fire-suppression', 'cctv-camera', 'biometric-scanner'].includes(equipment.id);

  return (
    <div className="info-panel" onClick={(e) => e.stopPropagation()}>
      {/* Header with Step and Category */}
      <div className="info-panel__header">
        <div>
          <span className="info-panel__badge">
            Étape {guidedTourIndex + 1}/12 • {equipment.category}
          </span>
          <h2 className="info-panel__title">{equipment.name}</h2>
        </div>
        <button
          className="info-panel__close-btn"
          onClick={() => {
            soundManager.playClick();
            setInteractingWith(null);
          }}
          title="Fermer pour explorer librement (Échap)"
        >
          ✕
        </button>
      </div>

      <div className="info-panel__body">
        {/* Interactive Schematic Animation */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(14,165,233,0.25)' }}>
          {isElectrical && <UpsSchematic />}
          {isCooling && <CoolingSchematic />}
          {isNetwork && <NetworkSchematic />}
          {isSecurity && <SecuritySchematic />}
          {!isElectrical && !isCooling && !isNetwork && !isSecurity && <UpsSchematic />}
        </div>

        {/* 15-Minute Oral Cheat Sheet (Essentiel sans détails superflus) */}
        <div className="info-panel__oral-box">
          <div className="info-panel__oral-header">
            <h3 className="info-panel__oral-title">
              <span>🗣️</span> Ce qu&apos;il faut expliquer
            </h3>
            {equipment.keyMetric && (
              <span className="info-panel__metric-badge">{equipment.keyMetric}</span>
            )}
          </div>

          {/* Speech bubble: exact phrase to say aloud to the jury */}
          {equipment.oralPitch && (
            <div className="info-panel__pitch-box">
              <span className="info-panel__pitch-tag">À dire au jury :</span>
              <p className="info-panel__pitch-text">{equipment.oralPitch}</p>
            </div>
          )}

          {/* 3 Key bullet points */}
          {equipment.keyPoints && (
            <div className="info-panel__keypoints">
              {equipment.keyPoints.map((pt, i) => (
                <div key={i} className="info-panel__keypoint">
                  <span className="info-panel__keypoint-bullet">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer with Guided Tour Stepper Buttons */}
      <div className="info-panel__footer">
        <button
          className="info-panel__nav-btn"
          onClick={() => {
            soundManager.playClick();
            prevGuidedPOI();
          }}
          title="Équipement précédent [Flèche Gauche]"
        >
          ◀ Précédent
        </button>

        <div className="info-panel__step-info">
          Étape <strong>{guidedTourIndex + 1}</strong> / 12
        </div>

        <button
          className="info-panel__nav-btn info-panel__nav-btn--next"
          onClick={() => {
            soundManager.playClick();
            nextGuidedPOI();
          }}
          title="Avancer au point suivant [Espace]"
        >
          <span>Suivant</span>
          <span className="info-panel__kbd">Espace ➔</span>
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;
