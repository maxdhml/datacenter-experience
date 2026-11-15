import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';

const svgBoxStyle: React.CSSProperties = {
  width: '100%',
  background: '#0b1220',
  borderRadius: '10px',
  border: '1px solid #1e293b',
};

/* ─── 1. Le Bâtiment Sécurisé : Les 3 Cercles de Protection ─── */
export const BuildingSchematic: React.FC = () => {
  const [tested, setTested] = useState(false);

  const testIntrusion = () => {
    soundManager.playAlarm();
    setTested(true);
    setTimeout(() => {
      setTested(false);
      soundManager.playSuccess();
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🏰 LES 3 CERCLES DE PROTECTION PHYSIQUE
        </span>
        <button
          onClick={testIntrusion}
          disabled={tested}
          className="pres-mode__btn"
          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
        >
          {tested ? '🚨 Test Intrusion en cours...' : '🛡️ Simuler Tentative d’Intrusion'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Cercle 1 : Clôture */}
        <rect x="15" y="22" width="125" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="77" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1. PÉRIMÈTRE</text>
        <text x="77" y="56" fill="#7dd3fc" fontSize="8" textAnchor="middle">Clôture & Caméras 360°</text>

        {/* Flèche 1 */}
        <line x1="140" y1="47" x2="168" y2="47" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Cercle 2 : Sas & Accueil */}
        <rect x="168" y="22" width="125" height="50" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
        <text x="230" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2. BÂTIMENT</text>
        <text x="230" y="56" fill="#38bdf8" fontSize="8" textAnchor="middle">Sas d&apos;entrée & Gardiens</text>

        {/* Flèche 2 */}
        <line x1="293" y1="47" x2="320" y2="47" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Cercle 3 : Salle Blindée Serveurs */}
        <rect x="320" y="22" width="125" height="50" rx="6" fill="#0f291e" stroke="#22c55e" strokeWidth="2" />
        <text x="382" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3. SALLE SERVEURS</text>
        <text x="382" y="56" fill="#4ade80" fontSize="8" textAnchor="middle">Badge RFID + Biométrie</text>

        {/* Légende interactive */}
        <text x="230" y="98" fill={tested ? '#ef4444' : '#22c55e'} fontSize="9" fontWeight="bold" textAnchor="middle">
          {tested
            ? '🚨 INTRUSION BLOQUÉE DÈS LA CLÔTURE EXTÉRIEURE !'
            : '✓ 3 niveaux de barrières infranchissables pour protéger les données.'}
        </text>
      </svg>
    </div>
  );
};

/* ─── 2. Le Sas de Sécurité : Fonctionnement Anti-Passage à Deux ─── */
export const AirlockSchematic: React.FC = () => {
  const [step, setStep] = useState(1);

  const advanceStep = () => {
    soundManager.playRelay();
    setStep((s) => (s % 3) + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🚪 FONCTIONNEMENT DU SAS À DOUBLE PORTE
        </span>
        <button onClick={advanceStep} className="pres-mode__btn" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          ▶ Étape suivante ({step}/3)
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Porte 1 */}
        <rect x="40" y="20" width="30" height="55" rx="3" fill={step === 1 ? '#22c55e' : '#dc2626'} />
        <text x="55" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">P1</text>
        <text x="55" y="92" fill={step === 1 ? '#4ade80' : '#f87171'} fontSize="8" textAnchor="middle">
          {step === 1 ? 'Ouverte' : 'Fermée'}
        </text>

        {/* Chambre Sas au centre */}
        <rect x="110" y="15" width="240" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="230" y="38" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CHAMBRE DU SAS</text>
        <text x="230" y="54" fill="#94a3b8" fontSize="8" textAnchor="middle">
          {step === 1 && '1. La personne entre seule'}
          {step === 2 && '2. Les DEUX portes sont verrouillées • Contrôle du poids'}
          {step === 3 && '3. Badge validé • Autorisation de sortir'}
        </text>

        {/* Porte 2 */}
        <rect x="390" y="20" width="30" height="55" rx="3" fill={step === 3 ? '#22c55e' : '#dc2626'} />
        <text x="405" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">P2</text>
        <text x="405" y="92" fill={step === 3 ? '#4ade80' : '#f87171'} fontSize="8" textAnchor="middle">
          {step === 3 ? 'Ouverte' : 'Fermée'}
        </text>

        <text x="230" y="110" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">
          Règle absolue : les 2 portes ne peuvent JAMAIS être ouvertes en même temps !
        </text>
      </svg>
    </div>
  );
};

/* ─── 3. L'Armoire de Serveurs : Double Alimentation A + B ─── */
export const ServerPowerSchematic: React.FC = () => {
  const [cableAFailed, setCableAFailed] = useState(false);

  const toggleCable = () => {
    soundManager.playRelay();
    setCableAFailed((v) => !v);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          ⚡ DOUBLE ALIMENTATION A + B DES SERVEURS
        </span>
        <button
          onClick={toggleCable}
          className="pres-mode__btn"
          style={{
            background: cableAFailed ? 'rgba(239, 68, 68, 0.2)' : 'rgba(14, 165, 233, 0.2)',
            borderColor: cableAFailed ? '#ef4444' : '#0ea5e9',
            fontSize: '0.78rem',
            padding: '4px 10px',
          }}
        >
          {cableAFailed ? '🔌 Rétablir Câble A' : '⚠️ Couper le Câble A'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Source A */}
        <rect x="25" y="18" width="100" height="32" rx="4" fill={cableAFailed ? '#334155' : '#1e3a5f'} stroke={cableAFailed ? '#64748b' : '#38bdf8'} />
        <text x="75" y="38" fill={cableAFailed ? '#94a3b8' : '#38bdf8'} fontSize="9" fontWeight="bold" textAnchor="middle">
          CÂBLE A (230V)
        </text>

        {/* Ligne A */}
        <line x1="125" y1="34" x2="280" y2="52" stroke={cableAFailed ? '#475569' : '#38bdf8'} strokeWidth="2.5" strokeDasharray={cableAFailed ? '' : '5 3'} />

        {/* Source B */}
        <rect x="25" y="65" width="100" height="32" rx="4" fill="#14532d" stroke="#22c55e" />
        <text x="75" y="85" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">
          CÂBLE B (230V)
        </text>

        {/* Ligne B */}
        <line x1="125" y1="81" x2="280" y2="62" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="5 3" />

        {/* Serveur informatique */}
        <rect x="280" y="28" width="150" height="58" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <text x="355" y="52" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SERVEUR EN SERVICE</text>
        <text x="355" y="68" fill="#4ade80" fontSize="8" fontWeight="bold" textAnchor="middle">
          {cableAFailed ? '✓ ALIMENTÉ PAR CÂBLE B' : '✓ 100% OPÉRATIONNEL'}
        </text>

        <text x="230" y="112" fill={cableAFailed ? '#f59e0b' : '#94a3b8'} fontSize="8.5" textAnchor="middle">
          {cableAFailed
            ? '⚠️ Le câble A a sauté, mais le câble B a pris la relève sans 1 ms de coupure !'
            : 'Chaque serveur a deux câbles différents pour ne jamais s’éteindre en cas de panne.'}
        </text>
      </svg>
    </div>
  );
};

/* ─── 4. Le Switch : L'Aiguilleur Réseau ─── */
export const SwitchRouterSchematic: React.FC = () => {
  const [targetServer, setTargetServer] = useState(1);

  const routePacket = () => {
    soundManager.playInspect();
    setTargetServer((s) => (s % 3) + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🔀 LE SWITCH : L&apos;AIGUILLEUR ULTRA-RAPIDE
        </span>
        <button onClick={routePacket} className="pres-mode__btn" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          🚀 Aiguiller vers Serveur #{targetServer}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Requête utilisateur */}
        <rect x="20" y="40" width="90" height="40" rx="5" fill="#1e293b" stroke="#38bdf8" />
        <text x="65" y="58" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">REQUÊTE</text>
        <text x="65" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">Photo / Vidéo</text>

        <line x1="110" y1="60" x2="165" y2="60" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Le Switch */}
        <rect x="165" y="30" width="110" height="60" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="220" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SWITCH TO-OF-RACK</text>
        <text x="220" y="70" fill="#bae6fd" fontSize="8" textAnchor="middle">Aiguilleur 100 Gbps</text>

        {/* 3 Serveurs de destination */}
        {[1, 2, 3].map((srv) => (
          <g key={srv}>
            <line
              x1="275"
              y1="60"
              x2="345"
              y2={25 + (srv - 1) * 35}
              stroke={targetServer === srv ? '#22c55e' : '#334155'}
              strokeWidth={targetServer === srv ? 3 : 1.5}
            />
            <rect
              x="345"
              y={12 + (srv - 1) * 35}
              width="95"
              height="26"
              rx="4"
              fill={targetServer === srv ? '#14532d' : '#1e293b'}
              stroke={targetServer === srv ? '#22c55e' : '#475569'}
            />
            <text x="392" y={28 + (srv - 1) * 35} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              Serveur #{srv} {targetServer === srv ? '✓ Reçu' : ''}
            </text>
          </g>
        ))}

        <text x="230" y="112" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
          Le switch trie et expédie les paquets en moins d’une microseconde !
        </text>
      </svg>
    </div>
  );
};

/* ─── 5. L'Allée d'Air Frais : Confinement Thermique 20°C ─── */
export const ColdAisleSchematic: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          ❄️ CONFINEMENT D&apos;AIR FRAIS À 20 °C
        </span>
        <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
          ZÉRO MÉLANGE D&apos;AIR
        </span>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Allée Froide Confinée (Gauche) */}
        <rect x="25" y="20" width="120" height="55" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
        <text x="85" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">ALLÉE FROIDE (20°C)</text>
        <text x="85" y="58" fill="#7dd3fc" fontSize="8" textAnchor="middle">Sous cloche vitrée étanche</text>

        {/* Flèche d'aspiration */}
        <line x1="145" y1="47" x2="195" y2="47" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5 3" />

        {/* Serveurs au centre */}
        <rect x="195" y="15" width="115" height="65" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="252" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">LES SERVEURS</text>
        <text x="252" y="56" fill="#f59e0b" fontSize="8" textAnchor="middle">Aspirent le frais (20°C)</text>
        <text x="252" y="68" fill="#ef4444" fontSize="8" textAnchor="middle">Recrachent l&apos;air chaud (35°C)</text>

        {/* Flèche vers allée chaude */}
        <line x1="310" y1="47" x2="360" y2="47" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 3" />

        {/* Allée Chaude (Droite) */}
        <rect x="360" y="20" width="85" height="55" rx="6" fill="#451a03" stroke="#f97316" strokeWidth="2" />
        <text x="402" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">ALLÉE CHAUDE</text>
        <text x="402" y="58" fill="#fdba74" fontSize="8" textAnchor="middle">Évacuation 35°C</text>

        <text x="230" y="105" fill="#38bdf8" fontSize="8.5" textAnchor="middle">
          L’air frais ne se mélange jamais avec l’air chaud : 30 % d’électricité économisée !
        </text>
      </svg>
    </div>
  );
};

/* ─── 6. Le Grand Climatiseur : Boucle d'Eau Glacée ─── */
export const ChilledWaterSchematic: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          💧 LA BOUCLE D&apos;EAU GLACÉE INDUSTRIELLE
        </span>
        <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 700 }}>
          DÉBIT CONTINU 24H/24
        </span>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Climatiseur en salle */}
        <rect x="25" y="22" width="120" height="52" rx="6" fill="#1e3a5f" stroke="#0284c7" strokeWidth="2" />
        <text x="85" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CLIMATISEUR SALLE</text>
        <text x="85" y="58" fill="#38bdf8" fontSize="8" textAnchor="middle">Aspire l&apos;air chaud (35°C)</text>

        {/* Tuyau aller eau glacée (7°C) */}
        <line x1="145" y1="38" x2="310" y2="38" stroke="#38bdf8" strokeWidth="3" />
        <text x="227" y="32" fill="#7dd3fc" fontSize="8" textAnchor="middle">Aller Eau Glacée ➔ 7 °C</text>

        {/* Tuyau retour eau tiède (13°C) */}
        <line x1="310" y1="58" x2="145" y2="58" stroke="#ef4444" strokeWidth="3" />
        <text x="227" y="70" fill="#fca5a5" fontSize="8" textAnchor="middle">Retour Réchauffé ⬅ 13 °C</text>

        {/* Refroidisseur extérieur */}
        <rect x="310" y="22" width="125" height="52" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <text x="372" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">TOURS EXTÉRIEURES</text>
        <text x="372" y="58" fill="#94a3b8" fontSize="8" textAnchor="middle">Évacue les calories dehors</text>

        <text x="230" y="105" fill="#e2e8f0" fontSize="8.5" textAnchor="middle">
          L&apos;eau circule en circuit fermé sans jamais entrer en contact avec les circuits électroniques.
        </text>
      </svg>
    </div>
  );
};

/* ─── 7. La Batterie de Secours (Onduleur) : Bascule 0 ms ─── */
export const UpsSchematic: React.FC = () => {
  const [gridFailed, setGridFailed] = useState(false);

  const toggleGrid = () => {
    soundManager.playRelay();
    setGridFailed((g) => !g);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          ⚡ BASCULE INSTANTANÉE SUR BATTERIES (0 ms)
        </span>
        <button
          onClick={toggleGrid}
          className="pres-mode__btn"
          style={{
            background: gridFailed ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.2)',
            borderColor: gridFailed ? '#ef4444' : '#0ea5e9',
            fontSize: '0.78rem',
            padding: '4px 10px',
          }}
        >
          {gridFailed ? '⚡ Rétablir Réseau Ville' : '⚠️ Simuler Coupure Ville'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Ville */}
        <rect x="20" y="25" width="100" height="45" rx="5" fill={gridFailed ? '#1e293b' : '#1e3a5f'} stroke={gridFailed ? '#475569' : '#0284c7'} strokeWidth="1.5" />
        <text x="70" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">COURANT VILLE</text>
        <text x="70" y="58" fill={gridFailed ? '#ef4444' : '#22c55e'} fontSize="8" textAnchor="middle">
          {gridFailed ? '❌ COUPÉ (0V)' : '✓ NORMAL (230V)'}
        </text>

        <line x1="120" y1="47" x2="175" y2="47" stroke={gridFailed ? '#334155' : '#0ea5e9'} strokeWidth="2.5" />

        {/* Onduleur */}
        <rect x="175" y="20" width="125" height="55" rx="6" fill={gridFailed ? '#451a03' : '#1e293b'} stroke={gridFailed ? '#f59e0b' : '#38bdf8'} strokeWidth="2" />
        <text x="237" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">BATTERIES ONDULEUR</text>
        <text x="237" y="58" fill={gridFailed ? '#fbbf24' : '#22c55e'} fontSize="8" textAnchor="middle">
          {gridFailed ? '⚡ EN DÉCHARGE (RELAIS)' : '🔋 CHARGÉES & PRÊTES'}
        </text>

        <line x1="300" y1="47" x2="355" y2="47" stroke="#22c55e" strokeWidth="3" />

        {/* Serveurs */}
        <rect x="355" y="20" width="90" height="55" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
        <text x="400" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SERVEURS</text>
        <text x="400" y="58" fill="#4ade80" fontSize="8" fontWeight="bold" textAnchor="middle">✓ TOUJOURS ON</text>

        <text x="230" y="105" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">
          Temps de bascule : 0 seconde (aucune micro-coupure perceptible pour les données)
        </text>
      </svg>
    </div>
  );
};

/* ─── 8. Le Moteur Diesel : Autonomie 72h ─── */
export const GeneratorSchematic: React.FC = () => {
  const [running, setRunning] = useState(false);

  const startGen = () => {
    soundManager.playRelay();
    setRunning(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🚜 MOTEUR DIESEL DE SECOURS (AUTONOMIE 72H)
        </span>
        <button onClick={startGen} disabled={running} className="pres-mode__btn" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          {running ? '🚜 Moteur en marche' : '⚡ Démarrer le Diesel'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Cuve gazole */}
        <rect x="25" y="25" width="105" height="48" rx="5" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="77" y="46" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CUVE DE GAZOLE</text>
        <text x="77" y="58" fill="#f59e0b" fontSize="8" textAnchor="middle">1000 Litres (72h)</text>

        <line x1="130" y1="49" x2="185" y2="49" stroke="#f59e0b" strokeWidth="2.5" />

        {/* Moteur diesel */}
        <rect x="185" y="20" width="130" height="58" rx="6" fill={running ? '#064e3b' : '#1e293b'} stroke={running ? '#10b981' : '#475569'} strokeWidth="2" />
        <text x="250" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">GROUPE ÉLECTROGÈNE</text>
        <text x="250" y="58" fill={running ? '#34d399' : '#94a3b8'} fontSize="8" textAnchor="middle">
          {running ? '✓ 2500 kVA GÉNÉRÉS' : 'En veille (< 1 min démarrage)'}
        </text>

        <line x1="315" y1="49" x2="365" y2="49" stroke={running ? '#22c55e' : '#334155'} strokeWidth="3" />

        {/* Tout le site */}
        <rect x="365" y="25" width="80" height="48" rx="5" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
        <text x="405" y="46" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">DATACENTER</text>
        <text x="405" y="58" fill="#4ade80" fontSize="8" textAnchor="middle">Alimenté 100%</text>

        <text x="230" y="105" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
          Les batteries assurent les premières minutes, puis le moteur prend le relais pour plusieurs jours.
        </text>
      </svg>
    </div>
  );
};

/* ─── 9. La Fibre Optique : Deux Chemins Souterrains Séparés ─── */
export const FiberRedundancySchematic: React.FC = () => {
  const [fiberCut, setFiberCut] = useState(false);

  const toggleCut = () => {
    soundManager.playRelay();
    setFiberCut((c) => !c);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🌐 FIBRE MULTI-OPÉRATEURS (CHEMINS SÉPARÉS)
        </span>
        <button
          onClick={toggleCut}
          className="pres-mode__btn"
          style={{
            background: fiberCut ? 'rgba(239, 68, 68, 0.2)' : 'rgba(14, 165, 233, 0.2)',
            borderColor: fiberCut ? '#ef4444' : '#0ea5e9',
            fontSize: '0.78rem',
            padding: '4px 10px',
          }}
        >
          {fiberCut ? '🔗 Réparer Câble 1' : '⚠️ Simuler Coupure Câble 1'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Datacenter */}
        <rect x="25" y="32" width="105" height="50" rx="5" fill="#0c4a6e" stroke="#38bdf8" />
        <text x="77" y="53" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">DATACENTER</text>
        <text x="77" y="67" fill="#7dd3fc" fontSize="8" textAnchor="middle">Serveurs Web</text>

        {/* Ligne Fibre 1 (Haut) */}
        <path
          d="M 130 45 Q 230 18 335 45"
          fill="none"
          stroke={fiberCut ? '#ef4444' : '#38bdf8'}
          strokeWidth="3"
          strokeDasharray={fiberCut ? '4 4' : '6 3'}
        />
        <text x="230" y="24" fill={fiberCut ? '#ef4444' : '#38bdf8'} fontSize="8" textAnchor="middle">
          {fiberCut ? '❌ Câble 1 Sectionné par pelleteuse' : 'Câble Fibre 1 (Opérateur A)'}
        </text>

        {/* Ligne Fibre 2 (Bas) */}
        <path d="M 130 68 Q 230 95 335 68" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="6 3" />
        <text x="230" y="88" fill="#4ade80" fontSize="8" textAnchor="middle">
          Câble Fibre 2 (Opérateur B - Chemin distinct)
        </text>

        {/* Réseau Mondial */}
        <rect x="335" y="32" width="100" height="50" rx="5" fill="#14532d" stroke="#22c55e" />
        <text x="385" y="53" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">INTERNET</text>
        <text x="385" y="67" fill="#4ade80" fontSize="8" textAnchor="middle">
          {fiberCut ? '✓ 100% Connecté' : '✓ Plein Débit'}
        </text>

        <text x="230" y="112" fill={fiberCut ? '#f59e0b' : '#94a3b8'} fontSize="8.5" textAnchor="middle">
          {fiberCut
            ? 'Bascule automatique en 50 millisecondes sur le second câble souterrain !'
            : 'Même si un câble est arraché dans la rue, le deuxième continue sans coupure.'}
        </text>
      </svg>
    </div>
  );
};

/* ─── 10. Le Pare-Feu Anti-Pirate : Bouclier Cyberdéfense ─── */
export const FirewallSchematic: React.FC = () => {
  const [attackBlocked, setAttackBlocked] = useState(false);

  const simulateAttack = () => {
    soundManager.playAlarm();
    setAttackBlocked(true);
    setTimeout(() => {
      setAttackBlocked(false);
      soundManager.playSuccess();
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🛡️ LE BOUCLIER PARE-FEU ANTI-CYBERATTAQUES
        </span>
        <button onClick={simulateAttack} disabled={attackBlocked} className="pres-mode__btn" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          {attackBlocked ? '🛑 Attaque bloquée !' : '👾 Lancer Cyberattaque Pirate'}
        </button>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Trafic entrant */}
        <rect x="15" y="15" width="105" height="32" rx="4" fill="#14532d" stroke="#22c55e" />
        <text x="67" y="34" fill="#4ade80" fontSize="8.5" fontWeight="bold" textAnchor="middle">UTILISATEURS</text>

        <rect x="15" y="60" width="105" height="32" rx="4" fill="#450a0a" stroke="#ef4444" />
        <text x="67" y="79" fill="#f87171" fontSize="8.5" fontWeight="bold" textAnchor="middle">ATTAQUE PIRATE</text>

        {/* Flèches */}
        <line x1="120" y1="31" x2="190" y2="45" stroke="#22c55e" strokeWidth="2.5" />
        <line x1="120" y1="76" x2="190" y2="65" stroke="#ef4444" strokeWidth="2.5" />

        {/* Pare-feu bouclier */}
        <rect x="190" y="20" width="115" height="65" rx="6" fill="#0f172a" stroke={attackBlocked ? '#ef4444' : '#10b981'} strokeWidth="2.5" />
        <text x="247" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">PARE-FEU NGFW</text>
        <text x="247" y="58" fill={attackBlocked ? '#ef4444' : '#34d399'} fontSize="8" textAnchor="middle">
          {attackBlocked ? '🚨 FILTRAGE ACTIF' : 'Filtre de Sécurité'}
        </text>

        {/* Flèche vers serveur */}
        <line x1="305" y1="52" x2="360" y2="52" stroke="#22c55e" strokeWidth="3" />

        {/* Serveurs protégés */}
        <rect x="360" y="25" width="85" height="55" rx="6" fill="#0f291e" stroke="#22c55e" strokeWidth="2" />
        <text x="402" y="47" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SERVEURS</text>
        <text x="402" y="61" fill="#4ade80" fontSize="8" textAnchor="middle">100% Protégés</text>

        <text x="230" y="108" fill={attackBlocked ? '#ef4444' : '#38bdf8'} fontSize="8.5" textAnchor="middle">
          {attackBlocked
            ? 'Attaque pirate identifiée et stoppée net : aucun serveur n’est touché !'
            : 'Le pare-feu analyse chaque paquet entrant et rejette les intrusions.'}
        </text>
      </svg>
    </div>
  );
};

/* ─── 11. La Salle de Contrôle 24h/24 : Supervision Humaine ─── */
export const NocControlSchematic: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🖥️ LA VEILLE HUMAINE 24H/24 (CENTRE DE CONTRÔLE NOC)
        </span>
        <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 700 }}>
          SLA 99.999%
        </span>
      </div>

      <svg viewBox="0 0 460 125" style={svgBoxStyle}>
        {/* Capteurs de mesure */}
        <rect x="20" y="25" width="110" height="48" rx="5" fill="#1e293b" stroke="#38bdf8" />
        <text x="75" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">CAPTEURS EN SALLE</text>
        <text x="75" y="58" fill="#7dd3fc" fontSize="8" textAnchor="middle">T°, Watts, Débits, Caméras</text>

        <line x1="130" y1="49" x2="175" y2="49" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Mur d'écrans NOC */}
        <rect x="175" y="18" width="125" height="60" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="237" y="42" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">MUR D&apos;ÉCRANS DU NOC</text>
        <text x="237" y="56" fill="#e0f2fe" fontSize="8" textAnchor="middle">Cartographie temps réel</text>
        <text x="237" y="68" fill="#4ade80" fontSize="8" textAnchor="middle">0 Anomalie non détectée</text>

        <line x1="300" y1="49" x2="345" y2="49" stroke="#22c55e" strokeWidth="2.5" />

        {/* Équipe humaine */}
        <rect x="345" y="25" width="95" height="48" rx="5" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
        <text x="392" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">TECHNICIENS</text>
        <text x="392" y="58" fill="#4ade80" fontSize="8" textAnchor="middle">Action préventive</text>

        <text x="230" y="105" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
          L&apos;équipe repère une dérive (ex: disque fatigué) et le change avant que la panne n&apos;arrive.
        </text>
      </svg>
    </div>
  );
};

/* ─── 12. L'Anti-Incendie : Extinction Sans Eau au Gaz Propre ─── */
export const FireSuppressionSchematic: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const startSuppression = () => {
    if (countdown !== null) return;
    setCountdown(5);
    soundManager.playAlarm();
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((c) => (c ? c - 1 : 0));
        soundManager.playClick();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      soundManager.playSuccess();
      const reset = setTimeout(() => setCountdown(null), 3500);
      return () => clearTimeout(reset);
    }
  }, [countdown]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          🧯 EXTINCTION AUTOMATIQUE AU GAZ PROPRE (SANS EAU)
        </span>
        <button
          onClick={startSuppression}
          disabled={countdown !== null}
          className="pres-mode__btn"
          style={{
            background: countdown !== null ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.15)',
            borderColor: '#ef4444',
            color: '#f87171',
            fontSize: '0.78rem',
            padding: '4px 10px',
          }}
        >
          {countdown !== null ? `🚨 Gaz dans ${countdown}s` : '🔥 Simuler Alerte Incendie'}
        </button>
      </div>

      <div style={{ background: '#0b1220', borderRadius: '10px', padding: '10px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
          {[
            { step: '1', title: 'Fumée détectée', desc: 'Laser optique instantané' },
            { step: '2', title: 'Alarme sonore', desc: 'Alerte du personnel' },
            { step: '3', title: 'Compte 10s', desc: 'Évacuation humaine', active: countdown !== null && countdown > 0 },
            { step: '4', title: 'Gaz libéré', desc: 'Feu étouffé sans 1 goutte d’eau', success: countdown === 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '6px 4px',
                borderRadius: '6px',
                background: item.success ? 'rgba(34,197,94,0.2)' : item.active ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.03)',
                border: item.success ? '1px solid #22c55e' : item.active ? '1px solid #ef4444' : '1px solid #334155',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: item.success ? '#4ade80' : item.active ? '#fca5a5' : '#38bdf8' }}>
                ÉTAPE {item.step}
              </div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ffffff', margin: '2px 0' }}>{item.title}</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
