import { Area } from '../types/index.js';

export interface AreaPresentationNote {
  area: Area;
  title: string;
  subtitle: string;
  durationMinutes: number;
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
  keyPoints: string[];
  speechNotes: string[];
  suggestedQuestions: string[];
}

export const presentationNotes: Record<Area, AreaPresentationNote> = {
  [Area.INTRODUCTION]: {
    area: Area.INTRODUCTION,
    title: "1. Introduction : La Forteresse d'Internet",
    subtitle: "Rôle du bâtiment & accès sécurisé",
    durationMinutes: 0,
    cameraPosition: [0, 3.2, -15],
    cameraLookAt: [0, 1.8, -8],
    keyPoints: [
      "Qu'est-ce qu'un datacenter : le coffre-fort physique qui héberge nos applications et données",
      "Disponibilité de 99,99 % : conçu pour ne jamais s'arrêter, même en cas de tempête",
      "Sécurité dès l'entrée : sas à double porte interdisant de passer à deux"
    ],
    speechNotes: [
      "« Bonjour à tous. Aujourd’hui, nous entrons en immersion dans un datacenter : l’usine invisible qui fait tourner Internet. »",
      "« Tout est conçu pour une disponibilité de 99,99 % : chaque câble et chaque équipement vital est doublé. »",
      "« Dès l’entrée, la sécurité physique est totale : le sas interdit de passer à deux pour qu’aucun intrus ne puisse s’infiltrer. »"
    ],
    suggestedQuestions: [
      "Pourquoi dit-on qu'un datacenter fonctionne à 99,99 % de disponibilité ?",
      "Comment le sas de sécurité empêche-t-il une personne non autorisée d'entrer ?"
    ]
  },

  [Area.SERVER_ROOM]: {
    area: Area.SERVER_ROOM,
    title: "2. La Salle des Serveurs : Le Cerveau",
    subtitle: "Armoires de serveurs & commutateurs réseau",
    durationMinutes: 0,
    cameraPosition: [0, 2.5, 4],
    cameraLookAt: [0, 1.8, 14],
    keyPoints: [
      "Armoires de serveurs : grandes armoires empilant des dizaines d'ordinateurs puissants",
      "Double alimentation (câble A + câble B) : un court-circuit ne coupe jamais le serveur",
      "Switch réseau au sommet : l'aiguilleur qui relie les serveurs à la vitesse de la lumière"
    ],
    speechNotes: [
      "« Nous voici dans la salle des serveurs. C’est ici que sont traitées les requêtes de millions d’utilisateurs. »",
      "« Chaque armoire empile des dizaines d'ordinateurs branchés sur deux circuits électriques distincts : si l’un saute, l’autre prend la relève. »",
      "« Tout en haut, le switch fait office d’aiguilleur : il trie et expédie les paquets de données en moins d’une microseconde. »"
    ],
    suggestedQuestions: [
      "Pourquoi chaque serveur possède-t-il deux câbles d'alimentation différents ?",
      "Quel est le rôle du switch situé au sommet de chaque baie ?"
    ]
  },

  [Area.COOLING]: {
    area: Area.COOLING,
    title: "3. La Climatisation : Dompter la Chaleur",
    subtitle: "Allée d'air frais & climatiseurs géants",
    durationMinutes: 0,
    cameraPosition: [0, 3.0, 26],
    cameraLookAt: [0, 1.8, 36],
    keyPoints: [
      "Chaleur : 100 % de l'électricité consommée par les composants devient de la chaleur",
      "Allée d'air froid fermée : on piège l'air frais à 20 °C devant les serveurs pour ne pas le gaspiller",
      "Climatiseurs d'eau froide : ils aspirent l'air chaud et soufflent le froid sous nos pieds"
    ],
    speechNotes: [
      "« Les serveurs chauffent énormément : 100 % de l’électricité consommée se transforme en chaleur. »",
      "« Pour éviter la surchauffe sans gaspiller d’énergie, on enferme l’air frais à 20 °C dans un couloir vitré étanche. »",
      "« Les serveurs aspirent cet air froid et recrachent l'air chaud à l’arrière, directement vers les climatiseurs. »"
    ],
    suggestedQuestions: [
      "Pourquoi ne doit-on jamais mélanger l'air froid et l'air chaud dans une salle informatique ?",
      "Quelle est la température idéale maintenue dans l'allée froide ?"
    ]
  },

  [Area.ELECTRICAL]: {
    area: Area.ELECTRICAL,
    title: "4. L'Énergie & le Secours : Zéro Coupure",
    subtitle: "Batteries de secours et moteurs diesel",
    durationMinutes: 0,
    cameraPosition: [0, 3.0, 48],
    cameraLookAt: [0, 1.8, 58],
    keyPoints: [
      "Batteries de secours : bascule instantanée en 0 milliseconde si la ville coupe le courant",
      "Autonomie sur batteries : 15 minutes, le temps de lancer le moteur diesel",
      "Moteur diesel de secours : démarre en moins d'une minute pour assurer 3 jours d'autonomie"
    ],
    speechNotes: [
      "« Sans électricité, pas d’Internet. Si le réseau électrique de la ville s'éteint brutalement, le datacenter ne doit pas broncher. »",
      "« Les batteries de secours prennent le relais en 0 milliseconde : aucune coupure n'est visible. »",
      "« Ces batteries tiennent 15 minutes, ce qui laisse le temps au moteur diesel de démarrer pour fournir du courant pendant plusieurs jours. »"
    ],
    suggestedQuestions: [
      "Pourquoi le temps de bascule sur batteries doit-il être de 0 milliseconde ?",
      "Combien de temps le moteur diesel de secours peut-il alimenter le datacenter ?"
    ]
  },

  [Area.NETWORK]: {
    area: Area.NETWORK,
    title: "5. La Connexion Internet & le Pare-Feu",
    subtitle: "Fibres optiques & pare-feu anti-pirate",
    durationMinutes: 0,
    cameraPosition: [0, 3.0, 70],
    cameraLookAt: [0, 1.8, 80],
    keyPoints: [
      "Fibre optique : l'information voyage sous forme de lumière dans des fils de verre",
      "Multi-opérateurs : plusieurs câbles séparés pour ne jamais être coupé si un fil est arraché",
      "Pare-feu : le garde du corps numérique qui bloque les pirates et cyberattaques"
    ],
    speechNotes: [
      "« Le datacenter est relié au monde par des fibres optiques ultra-rapides où l’information voyage sous forme de lumière. »",
      "« Pour ne jamais être coupé, il est branché à plusieurs opérateurs différents par des chemins souterrains distincts. »",
      "« À l'entrée du réseau, le pare-feu fait office de garde du corps : il bloque les attaques de pirates avant qu'elles n'atteignent les serveurs. »"
    ],
    suggestedQuestions: [
      "Pourquoi les données circulent-elles sous forme de lumière dans la fibre optique ?",
      "Quel est le rôle du pare-feu face aux cyberattaques ?"
    ]
  },

  [Area.SECURITY]: {
    area: Area.SECURITY,
    title: "6. Surveillance Humaine & Sécurité Incendie",
    subtitle: "Salle de contrôle & extinction sans eau",
    durationMinutes: 0,
    cameraPosition: [0, 2.8, 92],
    cameraLookAt: [0, 2.0, 104],
    keyPoints: [
      "Salle de contrôle : des techniciens surveillent le site 24h/24, 365 jours par an",
      "Extinction sans eau : l'eau détruirait les ordinateurs et causerait des courts-circuits",
      "Le gaz étouffe le feu en 10 secondes et les serveurs continuent de tourner"
    ],
    speechNotes: [
      "« Enfin, la zone 6 est la salle de contrôle où des équipes veillent sur les écrans jour et nuit pour agir avant la moindre panne. »",
      "« En cas de début d'incendie, pas d’eau ! On libère un gaz propre qui éteint les flammes en 10 secondes sans abîmer les ordinateurs. »",
      "« C’est cette alliance entre électricité de secours, climatisation et vigilance humaine qui permet au numérique de fonctionner. Merci de votre attention ! »"
    ],
    suggestedQuestions: [
      "Pourquoi est-il strictement interdit d'utiliser de l'eau pour éteindre un feu dans un datacenter ?",
      "Que surveillent les équipes sur leur grand mur d'écrans ?"
    ]
  }
};
