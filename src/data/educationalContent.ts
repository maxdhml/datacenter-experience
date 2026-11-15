export interface EquipmentInfo {
  id: string;
  name: string;
  category: string;
  definition: string;
  purpose: string;
  howItWorks: string;
  realWorldExample: string;
  oralPitch: string;
  keyPoints: string[];
  keyMetric: string;
}

// ─── Zone 1 : Bâtiment & Sécurité ────────────────────────────────
export const introductionEquipment: EquipmentInfo[] = [
  {
    id: 'datacenter-building',
    name: 'Le Bâtiment Sécurisé',
    category: 'Bâtiment & Sécurité',
    definition:
      'Une véritable forteresse conçue pour héberger des milliers de serveurs sans jamais s’arrêter.',
    purpose:
      'Garantir que les sites web, applications et données restent accessibles 24h/24, même en cas de panne de la ville.',
    howItWorks:
      'Chaque élément vital est doublé en miroir (câbles, clim, électricité) pour que le site reste toujours allumé.',
    realWorldExample:
      'Les centres de données de Google, OVH ou Microsoft qui font fonctionner Internet.',
    oralPitch:
      "« Le datacenter est une véritable forteresse : un bâtiment ultra-protégé conçu pour faire tourner Internet 24h/24 sans jamais s’arrêter, même pendant les pannes de la ville. »",
    keyPoints: [
      'Tous les équipements vitaux (câbles, électricité, clim) sont doublés en miroir',
      'Moins de 25 minutes d’arrêt par an tolérées (99,99 % de fonctionnement)',
      'Bâtiment autonome résistant aux coupures et aux intempéries',
    ],
    keyMetric: '99,99 % de fonctionnement',
  },
  {
    id: 'access-control',
    name: 'Le Sas de Sécurité',
    category: 'Sécurité Physique',
    definition:
      'Une double porte de sécurité qui n’autorise le passage que d’une seule personne à la fois.',
    purpose:
      'Empêcher formellement toute personne non autorisée d’entrer dans la salle des serveurs.',
    howItWorks:
      'La première porte se ferme et se verrouille avant que la seconde ne puisse s’ouvrir.',
    realWorldExample:
      'Sas de sécurité similaires à ceux des banques ou des aéroports.',
    oralPitch:
      "« Pour entrer en salle serveurs, ce sas à double porte interdit formellement de passer à deux : un intrus ne peut jamais se faufiler derrière un technicien. »",
    keyPoints: [
      'La 1ère porte se ferme avant que la 2ème ne puisse s’ouvrir',
      'Badge obligatoire et capteur de présence individuelle',
      'Chaque entrée et sortie est enregistrée automatiquement',
    ],
    keyMetric: '1 seule personne à la fois',
  },
];

// ─── Zone 2 : Salle des Serveurs (Le Cœur) ──────────────────────
export const serverRoomEquipment: EquipmentInfo[] = [
  {
    id: 'server-rack',
    name: 'L’Armoire de Serveurs',
    category: 'Les Ordinateurs',
    definition:
      'Une grande armoire métallique standardisée qui empile des dizaines d’ordinateurs puissants.',
    purpose:
      'Faire tourner les applications de millions d’utilisateurs : sites web, vidéos et jeux en ligne.',
    howItWorks:
      'Chaque baie contient des ordinateurs très plats branchés sur deux arrivées électriques pour ne jamais couper.',
    realWorldExample:
      'Une armoire remplace des centaines d’ordinateurs de bureau ordinaires.',
    oralPitch:
      "« C'est le cœur d'Internet : dans cette grande armoire, on empile des dizaines d'ordinateurs très puissants qui stockent nos photos, vidéos et sites web. »",
    keyPoints: [
      'Empilement de dizaines d’ordinateurs modulaires et compacts',
      'Deux câbles électriques différents (Câble A + Câble B) pour ne jamais couper',
      'Fonctionnement permanent jour et nuit sans interruption',
    ],
    keyMetric: 'Jusqu’à 40 serveurs par armoire',
  },
  {
    id: 'network-switch',
    name: 'Le Switch (L’Aiguilleur)',
    category: 'Connexion Interne',
    definition:
      'Le boîtier réseau intelligent placé au sommet de l’armoire qui relie tous les serveurs entre eux.',
    purpose:
      'Permettre aux serveurs d’échanger des données à grande vitesse et de les envoyer vers Internet.',
    howItWorks:
      'Il lit l’adresse de chaque paquet de données et l’envoie au bon serveur en une fraction de milliseconde.',
    realWorldExample:
      'C’est le standard téléphonique ou l’aiguilleur de train de l’armoire.',
    oralPitch:
      "« Le switch, c'est l'aiguilleur de l'armoire : il relie tous les serveurs entre eux par des câbles ultra-rapides et expédie les données vers Internet. »",
    keyPoints: [
      'Aiguille les données vers le bon serveur en une fraction de milliseconde',
      'Vitesse ultra-rapide par fibre optique',
      'Évite les embouteillages d’informations entre ordinateurs',
    ],
    keyMetric: 'Vitesse de la lumière',
  },
];

// ─── Zone 3 : Climatisation & Refroidissement ───────────────────
export const coolingEquipment: EquipmentInfo[] = [
  {
    id: 'cold-aisle',
    name: 'L’Allée d’Air Froid',
    category: 'Refroidissement',
    definition:
      'Un couloir vitré fermé qui piège l’air frais devant les serveurs pour ne pas le gaspiller.',
    purpose:
      'Empêcher l’air froid (20 °C) de se mélanger avec l’air brûlant rejeté à l’arrière des machines.',
    howItWorks:
      'L’air frais monte du faux plancher dans ce couloir fermé. Les ventilateurs des ordinateurs l’aspirent.',
    realWorldExample:
      'Comme fermer la porte du frigo pour garder le froid à l’intérieur au lieu de refroidir toute la pièce.',
    oralPitch:
      "« Pour éviter la surchauffe, ce couloir vitré piège l'air frais à 20 °C devant les serveurs : ils l'aspirent et recrachent l'air brûlant derrière. »",
    keyPoints: [
      'Air frais maintenu à 20 °C dans un couloir fermé étanche',
      'Empêche l’air froid de se mélanger à l’air chaud rejeté',
      'Économise 30 % d’électricité de climatisation',
    ],
    keyMetric: 'Air frais à 20 °C',
  },
  {
    id: 'crac-unit',
    name: 'Le Grand Climatiseur',
    category: 'Refroidissement',
    definition:
      'De grandes armoires de climatisation qui refroidissent l’air en continu grâce à de l’eau froide.',
    purpose:
      'Évacuer la chaleur produite par les processeurs, car l’électricité consommée se transforme en chaleur.',
    howItWorks:
      'Le climatiseur aspire l’air chaud de la salle, le refroidit avec de l’eau froide et le renvoie sous le plancher.',
    realWorldExample:
      'Fonctionne comme un radiateur de voiture géant qui tourne en continu.',
    oralPitch:
      "« Toute l'électricité des serveurs se transforme en chaleur. Ces climatiseurs géants font circuler de l'eau froide pour refroidir la salle en continu. »",
    keyPoints: [
      'Aspire l’air chaud et souffle l’air refroidi sous le plancher',
      'Refroidissement en circuit d’eau froide en continu 24h/24',
      'Si un climatiseur tombe en panne, un autre prend le relais immédiatement',
    ],
    keyMetric: 'Refroidissement permanent 24h/24',
  },
];

// ─── Zone 4 : Électricité & Alimentation de Secours ──────────────
export const electricalEquipment: EquipmentInfo[] = [
  {
    id: 'ups',
    name: 'La Batterie de Secours',
    category: 'Électricité de Secours',
    definition:
      'Une batterie géante qui prend le relais en zéro seconde en cas de panne de courant dans la ville.',
    purpose:
      'Empêcher les ordinateurs de s’éteindre d’un coup si l’électricité de la rue est coupée.',
    howItWorks:
      'Si la ville coupe le courant, les batteries fournissent l’électricité instantanément sans aucune coupure.',
    realWorldExample:
      'Comme la batterie d’un ordinateur portable, mais capable d’alimenter tout un quartier.',
    oralPitch:
      "« Si l'électricité de la ville se coupe, cette batterie géante prend le relais en zéro seconde : les serveurs ne subissent aucune micro-coupure. »",
    keyPoints: [
      'Bascule instantanée en 0 milliseconde sans coupure',
      'Batteries fournissant 15 minutes d’autonomie',
      'Laisse le temps au gros moteur diesel de secours de démarrer',
    ],
    keyMetric: '0 seconde de coupure',
  },
  {
    id: 'generator',
    name: 'Le Moteur Diesel de Secours',
    category: 'Électricité de Secours',
    definition:
      'Un gigantesque moteur diesel qui produit de l’électricité en cas de longue panne générale.',
    purpose:
      'Fournir le courant au datacenter pendant plusieurs jours si le réseau électrique reste coupé.',
    howItWorks:
      'Il démarre automatiquement en moins d’une minute après la coupure et tourne avec sa cuve de carburant.',
    realWorldExample:
      'Moteurs diesel géants semblables à ceux des navires ou des hôpitaux.',
    oralPitch:
      "« C'est notre centrale électrique de secours : en moins d'une minute, ce gros moteur diesel démarre et alimente le datacenter pendant 3 jours entiers. »",
    keyPoints: [
      'Démarrage automatique en moins de 60 secondes',
      'Alimenté par de grosses cuves de fioul',
      'Garantit au moins 72 heures d’autonomie sans électricité publique',
    ],
    keyMetric: '3 jours d’autonomie sans électricité',
  },
];

// ─── Zone 5 : Connexion Internet & Sécurité ─────────────────────
export const networkEquipment: EquipmentInfo[] = [
  {
    id: 'bgp-router',
    name: 'Le Câble Fibre Optique',
    category: 'Connexion Internet',
    definition:
      'Les gros câbles de lumière qui relient le datacenter au reste de la planète.',
    purpose:
      'Transporter les vidéos, messages et fichiers entre le datacenter et les utilisateurs chez eux.',
    howItWorks:
      'Les informations voyagent sous forme d’éclairs de lumière dans des fils de verre fins comme un cheveu.',
    realWorldExample:
      'Connexions directes aux grands opérateurs télécoms mondiaux.',
    oralPitch:
      "« Des câbles de fibre optique relient le datacenter au monde entier : les données y voyagent par la lumière, avec plusieurs chemins de secours. »",
    keyPoints: [
      'Données transportées par des éclairs de lumière dans du verre',
      'Plusieurs câbles et opérateurs différents pour ne jamais couper',
      'Relie les serveurs aux smartphones et ordinateurs du monde entier',
    ],
    keyMetric: 'Multi-chemins de secours',
  },
  {
    id: 'firewall',
    name: 'Le Pare-Feu Anti-Pirate',
    category: 'Cybersécurité',
    definition:
      'Le filtre de sécurité qui analyse chaque connexion pour bloquer les pirates et les attaques.',
    purpose:
      'Protéger les serveurs contre les vols de données, les virus et les attaques malveillantes.',
    howItWorks:
      'Chaque message venant d’Internet est contrôlé. Si c’est une attaque, elle est bloquée immédiatement.',
    realWorldExample:
      'C’est le vigile ou le filtre de sécurité à l’entrée d’un bâtiment sensible.',
    oralPitch:
      "« Le pare-feu est le garde du corps du réseau : il analyse chaque connexion et bloque instantanément les pirates et les cyberattaques. »",
    keyPoints: [
      'Vérifie chaque message ou fichier qui entre dans le datacenter',
      'Bloque les attaques de saturation qui veulent faire planter les sites',
      'Protège les données confidentielles des utilisateurs',
    ],
    keyMetric: 'Zéro intrusion tolérée',
  },
];

// ─── Zone 6 : Surveillance Humaine & Sécurité Anti-Feu ───────────
export const securityEquipment: EquipmentInfo[] = [
  {
    id: 'noc-monitor',
    name: 'La Salle de Contrôle 24h/24',
    category: 'Surveillance Humaine',
    definition:
      'Le centre de contrôle où des techniciens surveillent le bon fonctionnement du site jour et nuit.',
    purpose:
      'Détecter et régler un problème (chauffe, composant fatigué) avant même que les clients ne le remarquent.',
    howItWorks:
      'Des capteurs envoient en direct la température et la santé de chaque ordinateur sur un grand mur d’écrans.',
    realWorldExample:
      'La salle de contrôle de la NASA, mais adaptée à la gestion des ordinateurs d’Internet.',
    oralPitch:
      "« Des techniciens surveillent le datacenter 24h/24 : sur ce mur d'écrans, ils voient en direct la température et la santé de chaque ordinateur. »",
    keyPoints: [
      'Équipe humaine présente sur place 24h/24 et 7j/7',
      'Des milliers de capteurs alertent avant qu’une panne ne survienne',
      'Intervention en quelques minutes pour réparer un composant',
    ],
    keyMetric: 'Surveillance 24h/24 et 7j/7',
  },
  {
    id: 'fire-suppression',
    name: 'L’Anti-Incendie (Sans eau)',
    category: 'Sécurité Anti-Feu',
    definition:
      'Un système anti-feu qui éteint les flammes avec un gaz propre sans utiliser une seule goutte d’eau.',
    purpose:
      'Éteindre un début de flamme sans détruire le matériel informatique et sans risque de court-circuit.',
    howItWorks:
      'En cas d’alerte, des bouteilles libèrent un gaz propre en 10 secondes qui étouffe le feu sans résidu.',
    realWorldExample:
      'Gaz anti-feu propre utilisé dans les musées précieux et les salles informatiques.',
    oralPitch:
      "« Dans une salle informatique, l'eau détruirait tout : on utilise un gaz spécial qui éteint les flammes en 10 secondes sans abîmer un seul ordinateur ! »",
    keyPoints: [
      'Zéro eau utilisée : aucun court-circuit électrique',
      'Extinction totale des flammes en moins de 10 secondes',
      'Les ordinateurs continuent de fonctionner sans aucun dégât',
    ],
    keyMetric: 'Extinction en 10 s sans aucune eau',
  },
];

// ─── Unified Dictionary ─────────────────────────────────────────
export const allEquipment: Record<string, EquipmentInfo[]> = {
  INTRODUCTION: introductionEquipment,
  SERVER_ROOM: serverRoomEquipment,
  COOLING: coolingEquipment,
  ELECTRICAL: electricalEquipment,
  NETWORK: networkEquipment,
  SECURITY: securityEquipment,
};

export const equipmentList: EquipmentInfo[] = Object.values(allEquipment).flat();

export function getEquipmentById(id: string): EquipmentInfo | undefined {
  return equipmentList.find((e) => e.id === id);
}
