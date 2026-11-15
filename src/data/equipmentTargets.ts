export interface EquipmentTarget {
  id: string;
  name: string;
  zone: string;
  zoneNumber: number;
  icon: string;
  position: [number, number, number];
  viewPosition: [number, number, number];
  lookAt: [number, number, number];
}

export const EQUIPMENT_TARGETS: EquipmentTarget[] = [
  // ── Zone 1 : Bâtiment & Sécurité ──
  {
    id: 'datacenter-building',
    name: 'Le Bâtiment Sécurisé',
    zone: 'Zone 01 • Bâtiment',
    zoneNumber: 1,
    icon: '🏢',
    position: [0, 1.4, -18.5],
    viewPosition: [0, 1.6, -14.5],
    lookAt: [0, 2.0, -21.0],
  },
  {
    id: 'access-control',
    name: 'Le Sas de Sécurité',
    zone: 'Zone 01 • Bâtiment',
    zoneNumber: 1,
    icon: '🪪',
    position: [0, 1.2, -2.5],
    viewPosition: [0, 1.6, -5.5],
    lookAt: [0, 1.4, -2.5],
  },

  // ── Zone 2 : Salle des Serveurs ──
  {
    id: 'server-rack',
    name: 'L’Armoire de Serveurs',
    zone: 'Zone 02 • Serveurs',
    zoneNumber: 2,
    icon: '🖥️',
    position: [-7.0, 1.4, 6.8],
    viewPosition: [-5.2, 1.6, 6.8],
    lookAt: [-7.0, 1.4, 6.8],
  },
  {
    id: 'network-switch',
    name: 'Le Switch (L’Aiguilleur)',
    zone: 'Zone 02 • Serveurs',
    zoneNumber: 2,
    icon: '🔀',
    position: [3.5, 1.8, 6.8],
    viewPosition: [5.0, 1.6, 6.8],
    lookAt: [3.5, 1.8, 6.8],
  },

  // ── Zone 3 : Climatisation ──
  {
    id: 'cold-aisle',
    name: 'L’Allée d’Air Froid',
    zone: 'Zone 03 • Climatisation',
    zoneNumber: 3,
    icon: '❄️',
    position: [-4.0, 1.5, 30.0],
    viewPosition: [-4.0, 1.6, 25.5],
    lookAt: [-4.0, 1.5, 33.0],
  },
  {
    id: 'crac-unit',
    name: 'Le Grand Climatiseur',
    zone: 'Zone 03 • Climatisation',
    zoneNumber: 3,
    icon: '💨',
    position: [-11.5, 1.8, 26.0],
    viewPosition: [-8.8, 1.6, 26.0],
    lookAt: [-12.2, 1.8, 26.0],
  },

  // ── Zone 4 : Électricité & Secours ──
  {
    id: 'ups',
    name: 'La Batterie de Secours',
    zone: 'Zone 04 • Électricité',
    zoneNumber: 4,
    icon: '⚡',
    position: [-7.8, 1.4, 50.0],
    viewPosition: [-5.2, 1.6, 50.0],
    lookAt: [-8.5, 1.4, 50.0],
  },
  {
    id: 'generator',
    name: 'Le Moteur Diesel de Secours',
    zone: 'Zone 04 • Électricité',
    zoneNumber: 4,
    icon: '🚜',
    position: [-7.5, 1.6, 61.0],
    viewPosition: [-4.8, 1.6, 61.0],
    lookAt: [-8.5, 1.6, 61.0],
  },

  // ── Zone 5 : Connexion Internet ──
  {
    id: 'bgp-router',
    name: 'Le Câble Fibre Optique',
    zone: 'Zone 05 • Internet',
    zoneNumber: 5,
    icon: '🌐',
    position: [-6.5, 1.8, 77.0],
    viewPosition: [-4.5, 1.6, 77.0],
    lookAt: [-7.0, 1.8, 77.0],
  },
  {
    id: 'firewall',
    name: 'Le Pare-Feu Anti-Pirate',
    zone: 'Zone 05 • Internet',
    zoneNumber: 5,
    icon: '🛡️',
    position: [6.5, 1.8, 77.0],
    viewPosition: [4.5, 1.6, 77.0],
    lookAt: [7.0, 1.8, 77.0],
  },

  // ── Zone 6 : Surveillance & Sécurité ──
  {
    id: 'noc-monitor',
    name: 'La Salle de Contrôle 24h/24',
    zone: 'Zone 06 • Surveillance',
    zoneNumber: 6,
    icon: '🖥️',
    position: [0, 1.4, 104.5],
    viewPosition: [0, 1.6, 99.5],
    lookAt: [0, 2.5, 107.0],
  },
  {
    id: 'fire-suppression',
    name: 'L’Anti-Incendie (Sans eau)',
    zone: 'Zone 06 • Surveillance',
    zoneNumber: 6,
    icon: '🧯',
    position: [-13.5, 1.8, 95.0],
    viewPosition: [-11.0, 1.6, 95.0],
    lookAt: [-14.0, 1.8, 95.0],
  },
];
