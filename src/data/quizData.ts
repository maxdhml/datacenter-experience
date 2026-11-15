import { Area } from '../types/index.js';

export interface QuizQuestion {
  id: string;
  area: Area;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ── Zone 1 : Bâtiment ──
  {
    id: 'quiz-intro-1',
    area: Area.INTRODUCTION,
    question: "Pourquoi un datacenter vise-t-il un fonctionnement de 99,99 % du temps ?",
    options: [
      'Pour économiser la facture d’électricité le week-end',
      'Pour garantir que les sites et applications ne s’arrêtent jamais (moins de 25 min d’arrêt par an)',
      'Pour faire voler les serveurs dans les nuages',
      'Pour couper Internet pendant la nuit'
    ],
    correctAnswer: 1,
    explanation: "Un datacenter est le cœur d'Internet : chaque équipement vital est doublé pour assurer que les services fonctionnent en continu, jour et nuit sans interruption."
  },
  {
    id: 'quiz-intro-2',
    area: Area.INTRODUCTION,
    question: "À quoi sert le sas de sécurité à l'entrée du bâtiment ?",
    options: [
      'À peser les serveurs avant de les installer',
      'À empêcher formellement qu’un intrus ne se glisse derrière un technicien (1 seule personne à la fois)',
      'À refroidir les visiteurs avant d’entrer',
      'À désinfecter les chaussures avec de l’eau'
    ],
    correctAnswer: 1,
    explanation: "Le sas possède deux portes coordonnées : la première se verrouille avant que la seconde ne puisse s'ouvrir, empêchant tout intrus d'entrer sans autorisation."
  },

  // ── Zone 2 : Salle Serveurs ──
  {
    id: 'quiz-server-1',
    area: Area.SERVER_ROOM,
    question: "Pourquoi chaque ordinateur possède-t-il deux câbles électriques d'alimentation (Câble A et Câble B) ?",
    options: [
      'Pour consommer deux fois plus d’électricité',
      'Pour continuer de tourner sans coupure si un disjoncteur ou un câble a un problème',
      'Un câble pour les vidéos, un câble pour les e-mails',
      'Pour faire clignoter les voyants lumineux'
    ],
    correctAnswer: 1,
    explanation: "C'est le principe du secours en miroir : les deux câbles sont branchés sur des prises différentes pour garantir zéro coupure si une prise lâche."
  },
  {
    id: 'quiz-server-2',
    area: Area.SERVER_ROOM,
    question: "Quel est le rôle du Switch (l'aiguilleur) dans l'armoire de serveurs ?",
    options: [
      'Réguler la température de la pièce',
      'Faire office d’aiguilleur : relier tous les ordinateurs entre eux et expédier les données vers Internet',
      'Stocker les sauvegardes sur disque dur',
      'Éteindre les serveurs inutilisés'
    ],
    correctAnswer: 1,
    explanation: "Le switch connecte tous les ordinateurs de l'armoire et transfère les données à la vitesse de la lumière par fibre optique."
  },

  // ── Zone 3 : Climatisation ──
  {
    id: 'quiz-cooling-1',
    area: Area.COOLING,
    question: "Quel est le principe de l'Allée d'Air Froid fermée ?",
    options: [
      'Mélanger l’air chaud et l’air froid pour tiédir la pièce',
      'Enfermer l’air frais à 20 °C dans un couloir vitré pour que les serveurs l’aspirent sans perte',
      'Mettre des glaçons directement sur les ordinateurs',
      'Ouvrir les fenêtres vers l’extérieur'
    ],
    correctAnswer: 1,
    explanation: "En isolant l'air frais à 20 °C dans un couloir fermé, on évite qu'il ne se mélange à l'air brûlant rejeté à l'arrière, ce qui économise 30 % d'énergie."
  },
  {
    id: 'quiz-cooling-2',
    area: Area.COOLING,
    question: "Pourquoi les datacenters ont-ils besoin de grands climatiseurs en continu ?",
    options: [
      'Pour le confort des techniciens qui travaillent en pull',
      'Parce que l’électricité consommée par les ordinateurs se transforme en chaleur',
      'Pour créer de la neige artificielle en hiver',
      'Pour empêcher les câbles de geler'
    ],
    correctAnswer: 1,
    explanation: "Les processeurs dégagent beaucoup de chaleur quand ils calculent. Sans climatiseurs pour évacuer cette chaleur, la salle surchaufferait en quelques minutes."
  },

  // ── Zone 4 : Électricité ──
  {
    id: 'quiz-electrical-1',
    area: Area.ELECTRICAL,
    question: "En cas de panne de courant dans la ville, en combien de temps la batterie de secours prend-elle le relais ?",
    options: [
      'En environ 5 minutes',
      'En 0 milliseconde (instantanément, aucune coupure)',
      'Il faut appuyer manuellement sur un bouton rouge',
      'Le lendemain matin'
    ],
    correctAnswer: 1,
    explanation: "Les batteries de secours prennent le relais instantanément en zéro milliseconde : les serveurs ne subissent aucune coupure."
  },
  {
    id: 'quiz-electrical-2',
    area: Area.ELECTRICAL,
    question: "À quoi sert le gros moteur diesel de secours ?",
    options: [
      'À recharger les voitures électriques des employés',
      'À produire de l’électricité pendant plusieurs jours si la panne de la ville dure longtemps',
      'À ventiler la cour extérieure',
      'À chauffer l’eau de la cantine'
    ],
    correctAnswer: 1,
    explanation: "Les batteries durent environ 15 minutes : le moteur diesel démarre automatiquement en moins d'une minute pour alimenter le site pendant 3 jours entiers."
  },

  // ── Zone 5 : Réseau ──
  {
    id: 'quiz-network-1',
    area: Area.NETWORK,
    question: "Comment les données voyagent-elles dans les câbles de fibre optique ?",
    options: [
      'Sous forme d’éclairs de lumière ultra-rapides dans des fils de verre',
      'Sous forme de courant électrique 230V',
      'Par ondes radio FM',
      'Par air comprimé sous le plancher'
    ],
    correctAnswer: 0,
    explanation: "La fibre optique utilise des éclairs lumineux voyageant dans un fil de verre pur, à une vitesse proche de celle de la lumière."
  },
  {
    id: 'quiz-network-2',
    area: Area.NETWORK,
    question: "Quel est le rôle du Pare-Feu à l'entrée du réseau ?",
    options: [
      'Éteindre les feux dans les câbles',
      'Analyser chaque connexion et bloquer les pirates et cyberattaques',
      'Mesurer la vitesse de frappe au clavier',
      'Accélérer la vitesse de téléchargement des films'
    ],
    correctAnswer: 1,
    explanation: "Le pare-feu est le bouclier du datacenter : il filtre toutes les connexions venant d'Internet pour bloquer les virus et les cyberattaques."
  },

  // ── Zone 6 : Surveillance ──
  {
    id: 'quiz-security-1',
    area: Area.SECURITY,
    question: "Pourquoi est-il interdit d'utiliser de l'eau pour éteindre un feu dans une salle serveurs ?",
    options: [
      'Parce que l’eau coûte trop cher',
      'Parce que l’eau provoquerait des courts-circuits et détruirait tous les ordinateurs',
      'Parce qu’il n’y a pas de robinet dans le bâtiment',
      'Parce que les ordinateurs flottent sur l’eau'
    ],
    correctAnswer: 1,
    explanation: "L'eau conduit l'électricité et détruirait le matériel informatique. On utilise un gaz propre spécial qui éteint les flammes en 10 secondes sans aucune goutte d'eau."
  },
  {
    id: 'quiz-security-2',
    area: Area.SECURITY,
    question: "Que surveillent les techniciens sur le grand mur d'écrans de contrôle ?",
    options: [
      'Les chaînes de télévision d’information',
      'La température, l’électricité et la santé des ordinateurs 24h/24 pour agir avant la panne',
      'Le cours de la bourse en direct',
      'Des films en streaming'
    ],
    correctAnswer: 1,
    explanation: "La salle de contrôle surveille des milliers de capteurs en direct pour repérer et régler le moindre souci avant qu'il ne devienne une panne."
  }
];

export function getQuestionsForArea(area: Area): QuizQuestion[] {
  return quizQuestions.filter((q) => q.area === area);
}
