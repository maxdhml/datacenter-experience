import React, { useState, useMemo, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { EQUIPMENT_TARGETS, EquipmentTarget } from '../../data/equipmentTargets';
import { soundManager } from '../../utils/audio';
import '../../styles/POINavigator.css';

interface POINavigatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZONE_TABS = [
  { id: 'all', label: 'Toutes les zones' },
  { id: '1', label: '🏢 1. Introduction' },
  { id: '2', label: '🖥️ 2. Salle Serveurs' },
  { id: '3', label: '❄️ 3. Climatisation' },
  { id: '4', label: '⚡ 4. Électricité & Secours' },
  { id: '5', label: '🌐 5. Réseau & Internet' },
  { id: '6', label: '🛡️ 6. Surveillance & Sécurité' },
];

export const POINavigator: React.FC<POINavigatorProps> = ({ isOpen, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const playerPosition = useGameStore((s) => s.playerPosition);
  const completedInteractions = useGameStore((s) => s.completedInteractions);
  const teleportToPOI = useGameStore((s) => s.teleportToPOI);
  const setInteractingWith = useGameStore((s) => s.setInteractingWith);
  const addInteraction = useGameStore((s) => s.addInteraction);

  // Keyboard shortcut listener to close on Escape or P
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        soundManager.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute POIs sorted by distance or zone
  const filteredPOIs = useMemo(() => {
    return EQUIPMENT_TARGETS.map((poi) => {
      const dist = Math.hypot(
        poi.position[0] - playerPosition[0],
        poi.position[2] - playerPosition[2]
      );
      return {
        ...poi,
        distance: dist,
        isVisited: completedInteractions.has(poi.id),
      };
    })
      .filter((poi) => {
        const matchesZone =
          selectedZone === 'all' || String(poi.zoneNumber) === selectedZone;
        const matchesSearch =
          !searchQuery.trim() ||
          poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poi.zone.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesZone && matchesSearch;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [selectedZone, searchQuery, playerPosition, completedInteractions]);

  if (!isOpen) return null;

  const handleTravel = (target: EquipmentTarget) => {
    soundManager.playClick();
    teleportToPOI({
      position: target.viewPosition,
      lookAt: target.lookAt,
    });
    onClose();
  };

  const handleInspect = (target: EquipmentTarget) => {
    soundManager.playInspect();
    setInteractingWith(target.id);
    addInteraction(target.id);
    onClose();
  };

  return (
    <div className="poi-modal__backdrop" onClick={onClose}>
      <div className="poi-modal__container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="poi-modal__header">
          <div className="poi-modal__header-left">
            <div className="poi-modal__icon">🧭</div>
            <div>
              <h2 className="poi-modal__title">Points d&apos;Intérêt du Datacenter</h2>
              <p className="poi-modal__subtitle">
                Sélectionnez un équipement pour y voler directement ou consulter son schéma technique interactif
              </p>
            </div>
          </div>
          <button
            className="poi-modal__close-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            title="Fermer [Échap]"
          >
            ✕
          </button>
        </div>

        {/* Controls: Search & Zone Filter Tabs */}
        <div className="poi-modal__controls">
          <input
            type="text"
            className="poi-modal__search-input"
            placeholder="🔍 Rechercher un équipement (ex: Onduleur, ToR Switch, CRAC, Novec, Spine, PDU...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />

          <div className="poi-modal__tabs">
            {ZONE_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`poi-modal__tab ${
                  selectedZone === tab.id ? 'poi-modal__tab--active' : ''
                }`}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedZone(tab.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="poi-modal__body">
          {filteredPOIs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              Aucun équipement ne correspond à votre recherche.
            </div>
          ) : (
            filteredPOIs.map((poi) => (
              <div
                key={poi.id}
                className={`poi-card ${poi.isVisited ? 'poi-card--visited' : ''}`}
              >
                <div className="poi-card__top">
                  <div className="poi-card__icon">{poi.icon}</div>
                  <div className="poi-card__meta">
                    <h3 className="poi-card__name">{poi.name}</h3>
                    <p className="poi-card__zone">{poi.zone}</p>
                  </div>
                </div>

                <div className="poi-card__status-row">
                  <span className="poi-card__distance">
                    📍 {poi.distance.toFixed(1)} m
                  </span>
                  <span
                    className={`poi-card__badge ${
                      poi.isVisited
                        ? 'poi-card__badge--visited'
                        : 'poi-card__badge--unvisited'
                    }`}
                  >
                    {poi.isVisited ? '✓ Visité' : 'À explorer'}
                  </span>
                </div>

                <div className="poi-card__actions">
                  <button
                    className="poi-card__btn poi-card__btn--travel"
                    onClick={() => handleTravel(poi)}
                    title="Déplacement fluide vers cet équipement"
                  >
                    🧭 S&apos;y rendre
                  </button>
                  <button
                    className="poi-card__btn poi-card__btn--inspect"
                    onClick={() => handleInspect(poi)}
                    title="Ouvrir le schéma technique"
                  >
                    📖 Schéma
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="poi-modal__footer">
          <div>
            Total : <strong>{filteredPOIs.length}</strong> équipement(s) répertorié(s)
          </div>
          <div>
            Raccourci clavier : <span className="poi-modal__footer-key">P</span> ou{' '}
            <span className="poi-modal__footer-key">Échap</span> pour fermer
          </div>
        </div>
      </div>
    </div>
  );
};

export default POINavigator;

