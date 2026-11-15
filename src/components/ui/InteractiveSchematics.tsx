import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';

/* ─── 1. Schéma Électrique & Batterie de Secours (Simple & Intuitif) ─── */
export const UpsSchematic: React.FC = () => {
  const [gridFailed, setGridFailed] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(98);

  const toggleGrid = () => {
    soundManager.playRelay();
    setGridFailed((prev) => {
      const next = !prev;
      if (!next) {
        setBatteryLevel(98);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!gridFailed) return;
    const interval = setInterval(() => {
      setBatteryLevel((b) => Math.max(15, b - 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [gridFailed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Interactive Control */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
          ⚡ SCHÉMA ÉLECTRIQUE : SECOURS SANS COUPURE
        </span>
        <button
          onClick={toggleGrid}
          className="pres-mode__btn"
          style={{
            background: gridFailed ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.2)',
            borderColor: gridFailed ? '#ef4444' : '#0ea5e9',
            color: gridFailed ? '#fca5a5' : '#38bdf8',
            fontSize: '0.8rem',
            padding: '5px 12px',
          }}
        >
          {gridFailed ? '⚡ Rétablir le Réseau de la Ville' : '⚠️ Simuler une Panne de Courant'}
        </button>
      </div>

      {/* Animated SVG Diagram */}
      <svg viewBox="0 0 460 150" style={{ width: '100%', background: '#0b1220', borderRadius: '10px', border: '1px solid #1e293b' }}>
        <style>{`
          .flow-line { stroke-dasharray: 6 4; animation: flowAnim 1s linear infinite; }
          .flow-line-fast { stroke-dasharray: 4 3; animation: flowAnim 0.5s linear infinite; }
          @keyframes flowAnim { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
        `}</style>

        {/* Source: Réseau Ville */}
        <rect x="15" y="25" width="105" height="45" rx="6" fill={gridFailed ? '#1e293b' : '#1e3a5f'} stroke={gridFailed ? '#475569' : '#0284c7'} strokeWidth="2" />
        <text x="67" y="45" fill={gridFailed ? '#64748b' : '#38bdf8'} fontSize="10" fontWeight="bold" textAnchor="middle">COURANT VILLE</text>
        <text x="67" y="58" fill={gridFailed ? '#ef4444' : '#22c55e'} fontSize="9" textAnchor="middle">{gridFailed ? '❌ COUPÉ (0V)' : '✓ NORMAL (230V)'}</text>

        {/* Line from City to Battery */}
        <line x1="120" y1="47" x2="175" y2="47" stroke={gridFailed ? '#334155' : '#0ea5e9'} strokeWidth="3" className={gridFailed ? '' : 'flow-line'} />

        {/* Batterie de Secours (Onduleur) */}
        <rect x="175" y="20" width="125" height="55" rx="6" fill={gridFailed ? '#451a03' : '#1e293b'} stroke={gridFailed ? '#f59e0b' : '#38bdf8'} strokeWidth="2" />
        <text x="237" y="42" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">BATTERIE DE SECOURS</text>
        <text x="237" y="58" fill={gridFailed ? '#fbbf24' : '#22c55e'} fontSize="9" textAnchor="middle">
          {gridFailed ? `⚡ EN DÉCHARGE (${batteryLevel}%)` : '🔋 PRÊTE & CHARGÉE'}
        </text>

        {/* Output Line to Servers */}
        <line x1="300" y1="47" x2="355" y2="47" stroke="#22c55e" strokeWidth="3" className="flow-line-fast" />

        {/* Servers: Always Powered */}
        <rect x="355" y="20" width="95" height="55" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
        <text x="402" y="42" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">SERVEURS</text>
        <text x="402" y="58" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">✓ TOUJOURS ALLUMÉS</text>

        {/* Legend beneath */}
        <text x="230" y="115" fill="#94a3b8" fontSize="9" textAnchor="middle">
          {gridFailed
            ? '⚠️ Panne dans la ville : la batterie alimente les serveurs instantanément !'
            : '✓ Fonctionnement normal : l’électricité recharge aussi la batterie.'}
        </text>
        <text x="230" y="132" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
          Temps de coupure pour les serveurs : 0 milliseconde
        </text>
      </svg>

      {/* 3 Simple Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>TEMPS DE COUPURE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>0 seconde</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>AUTONOMIE BATTERIE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: gridFailed ? '#f59e0b' : '#38bdf8' }}>
            {gridFailed ? `${Math.round(batteryLevel * 0.25)} min` : '15 minutes'}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>MOTEUR DIESEL</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>Relais auto &lt; 1 min</div>
        </div>
      </div>
    </div>
  );
};

/* ─── 2. Schéma Climatisation & Allée Froide (Simple & Visuel) ─── */
export const CoolingSchematic: React.FC = () => {
  const [coolingActive, setCoolingActive] = useState(true);

  const toggleCooling = () => {
    soundManager.playClick();
    setCoolingActive((c) => !c);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
          ❄️ CIRCULATION D&apos;AIR FRAIS & ÉVACUATION DE LA CHALEUR
        </span>
        <button
          onClick={toggleCooling}
          className="pres-mode__btn"
          style={{ fontSize: '0.8rem', padding: '5px 12px' }}
        >
          {coolingActive ? '❄️ Climatiseur Actif' : '⚠️ Climatiseur en Pause'}
        </button>
      </div>

      <svg viewBox="0 0 460 150" style={{ width: '100%', background: '#0b1220', borderRadius: '10px', border: '1px solid #1e293b' }}>
        {/* Allée Froide Confinée (Left) */}
        <rect x="25" y="25" width="115" height="50" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
        <text x="82" y="47" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">ALLÉE FROIDE</text>
        <text x="82" y="62" fill="#7dd3fc" fontSize="9" textAnchor="middle">Air Frais à 20 °C</text>

        {/* Cold Air flow to Servers */}
        <line x1="140" y1="50" x2="190" y2="50" stroke="#38bdf8" strokeWidth="3" className="flow-line" />

        {/* Serveurs (Center) */}
        <rect x="190" y="20" width="110" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="245" y="44" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">LES SERVEURS</text>
        <text x="245" y="58" fill="#f59e0b" fontSize="8" textAnchor="middle">Chaleur dégagée 35°C</text>
        <text x="245" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">Aspirent l&apos;air frais</text>

        {/* Hot air flow to Climatiseur */}
        <line x1="300" y1="50" x2="350" y2="50" stroke="#ef4444" strokeWidth="3" className="flow-line" />

        {/* Grand Climatiseur (Right) */}
        <rect x="350" y="25" width="95" height="50" rx="6" fill="#1e3a5f" stroke="#0284c7" strokeWidth="2" />
        <text x="397" y="47" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CLIMATISEUR</text>
        <text x="397" y="62" fill="#38bdf8" fontSize="9" textAnchor="middle">Eau froide 24h/24</text>

        {/* Return Underfloor Loop */}
        <path d="M 397 75 L 397 115 L 82 115 L 82 75" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="5 3" />
        <text x="240" y="130" fill="#7dd3fc" fontSize="9" textAnchor="middle">
          L&apos;air refroidi remonte sous les pieds directement dans l&apos;allée froide
        </text>
      </svg>

      {/* 3 Simple Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>TEMPÉRATURE IDÉALE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>20 °C</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>ÉCONOMIE D&apos;ÉNERGIE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>+30 %</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>RISQUE DE SURCHAUFFE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>0 % (Sécurisé)</div>
        </div>
      </div>
    </div>
  );
};

/* ─── 3. Schéma Réseau & Internet (Simple & Visuel) ─── */
export const NetworkSchematic: React.FC = () => {
  const [packetStep, setPacketStep] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const sendPacket = () => {
    if (isSending) return;
    setIsSending(true);
    setPacketStep(1);
    soundManager.playInspect();

    setTimeout(() => setPacketStep(2), 500);
    setTimeout(() => setPacketStep(3), 1000);
    setTimeout(() => setPacketStep(4), 1500);
    setTimeout(() => {
      setIsSending(false);
      soundManager.playSuccess();
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
          🌐 TRAJET D&apos;UN MESSAGE DEPUIS VOTRE SMARTPHONE
        </span>
        <button
          onClick={sendPacket}
          disabled={isSending}
          className="pres-mode__btn"
          style={{ fontSize: '0.8rem', padding: '5px 12px' }}
        >
          {isSending ? '📡 Données en route...' : '🚀 Envoyer un Message (Photo/Vidéo)'}
        </button>
      </div>

      <svg viewBox="0 0 460 145" style={{ width: '100%', background: '#0b1220', borderRadius: '10px', border: '1px solid #1e293b' }}>
        {/* 1. Smartphone */}
        <rect x="15" y="35" width="80" height="45" rx="6" fill={packetStep === 1 ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="1.5" />
        <text x="55" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">📱 SMARTPHONE</text>
        <text x="55" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Utilisateur</text>

        {/* Link 1 */}
        <line x1="95" y1="57" x2="135" y2="57" stroke={packetStep >= 1 ? '#38bdf8' : '#334155'} strokeWidth="2.5" />

        {/* 2. Pare-Feu */}
        <rect x="135" y="35" width="85" height="45" rx="6" fill={packetStep === 2 ? '#0369a1' : '#1e293b'} stroke="#10b981" strokeWidth="1.5" />
        <text x="177" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">🛡️ PARE-FEU</text>
        <text x="177" y="68" fill="#34d399" fontSize="8" textAnchor="middle">Anti-Pirate</text>

        {/* Link 2 */}
        <line x1="220" y1="57" x2="260" y2="57" stroke={packetStep >= 2 ? '#38bdf8' : '#334155'} strokeWidth="2.5" />

        {/* 3. Switch (Aiguilleur) */}
        <rect x="260" y="35" width="85" height="45" rx="6" fill={packetStep === 3 ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="1.5" />
        <text x="302" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">🔀 SWITCH</text>
        <text x="302" y="68" fill="#38bdf8" fontSize="8" textAnchor="middle">L&apos;Aiguilleur</text>

        {/* Link 3 */}
        <line x1="345" y1="57" x2="385" y2="57" stroke={packetStep >= 3 ? '#22c55e' : '#334155'} strokeWidth="2.5" />

        {/* 4. Serveur IT */}
        <rect x="385" y="35" width="65" height="45" rx="6" fill={packetStep === 4 ? '#14532d' : '#1e293b'} stroke="#22c55e" strokeWidth="2" />
        <text x="417" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SERVEUR</text>
        <text x="417" y="68" fill="#4ade80" fontSize="8" textAnchor="middle">Reçu !</text>

        {/* Animated Flying Light Packet */}
        {packetStep === 1 && <circle cx="115" cy="57" r="6" fill="#f59e0b" />}
        {packetStep === 2 && <circle cx="240" cy="57" r="6" fill="#f59e0b" />}
        {packetStep === 3 && <circle cx="365" cy="57" r="6" fill="#f59e0b" />}
        {packetStep === 4 && <circle cx="417" cy="57" r="7" fill="#22c55e" />}

        {/* Legend */}
        <text x="230" y="115" fill="#e2e8f0" fontSize="9" textAnchor="middle">
          {packetStep === 4
            ? '✓ Message reçu et traité en moins d’un centième de seconde !'
            : 'Le message voyage par fibres optiques à la vitesse de la lumière.'}
        </text>
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>VITESSE DU TRAFIC</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>Lumière (Fibre)</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CYBERSÉCURITÉ</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>100 % Filtré</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>DISPONIBILITÉ</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>Jamais coupé</div>
        </div>
      </div>
    </div>
  );
};

/* ─── 4. Schéma Sécurité Anti-Incendie Sans Eau (Simple & Visuel) ─── */
export const SecuritySchematic: React.FC = () => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
          🧯 SYSTÈME ANTI-FEU AU GAZ PROPRE (ZÉRO EAU)
        </span>
        <button
          onClick={startSuppression}
          disabled={countdown !== null}
          className="pres-mode__btn"
          style={{
            background: countdown !== null ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.15)',
            borderColor: '#ef4444',
            color: '#f87171',
            fontSize: '0.8rem',
            padding: '5px 12px',
          }}
        >
          {countdown !== null ? `🚨 Extinction dans ${countdown}s` : '🔥 Simuler Alerte Feu'}
        </button>
      </div>

      <div style={{ background: '#0b1220', borderRadius: '10px', padding: '14px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          {[
            { step: '1', title: 'Fumée détectée', desc: 'Capteurs laser instantanés', ok: true },
            { step: '2', title: 'Alarme sonore', desc: 'Alerte immédiate du personnel', ok: true },
            { step: '3', title: 'Compte 10s', desc: 'Évacuation humaine', active: countdown !== null && countdown > 0 },
            { step: '4', title: 'Gaz libéré', desc: 'Feu étouffé sans une goutte d’eau', success: countdown === 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: item.success ? 'rgba(34,197,94,0.2)' : item.active ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.03)',
                border: item.success ? '1px solid #22c55e' : item.active ? '1px solid #ef4444' : '1px solid #334155',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: item.success ? '#4ade80' : item.active ? '#fca5a5' : '#38bdf8' }}>
                ÉTAPE 0{item.step}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', margin: '3px 0' }}>{item.title}</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>EAU UTILISÉE</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>0 goutte d&apos;eau</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>DÉGÂT MATÉRIEL</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22c55e' }}>Zéro dégât</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>TEMPS D&apos;EXTINCTION</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>10 secondes</div>
        </div>
      </div>
    </div>
  );
};
