import { Area } from '../types/index.js';
import type { MissionScenario } from '../types/index.js';

export interface MissionScenarioExtended extends MissionScenario {
  consequences: string;
  solutionExplanation: string;
}

export const missionScenarios: Record<string, MissionScenarioExtended> = {
  cooling: {
    id: 'cooling',
    title: 'Alerte Surchauffe — Panne d’un Climatiseur',
    description: 'Un climatiseur s’est arrêté dans la salle de refroidissement. La température monte rapidement vers 35 °C.',
    area: Area.COOLING,
    consequences: 'Si la température dépasse 40 °C, les serveurs vont surchauffer et s’éteindre en urgence, coupant l’accès aux sites web de milliers d’utilisateurs.',
    solutionExplanation: 'La bascule automatique sur les climatiseurs de secours permet de réinjecter de l’air frais à 20 °C dans l’allée froide avant d’abîmer les processeurs.',
    steps: [
      {
        id: 'step-1',
        instruction: 'Consultez le climatiseur industriel pour identifier le défaut.',
        targetObjectId: 'crac-unit',
        completed: false,
      },
      {
        id: 'step-2',
        instruction: 'Inspectez l’allée froide pour vérifier que les portes sont bien fermées.',
        targetObjectId: 'cold-aisle',
        completed: false,
      },
      {
        id: 'step-3',
        instruction: 'Vérifiez qu’aucune baie de serveurs ne s’est éteinte par sécurité.',
        targetObjectId: 'server-rack',
        completed: false,
      },
      {
        id: 'step-4',
        instruction: 'Rendez-vous au mur d’écrans du NOC pour confirmer le retour à 20 °C.',
        targetObjectId: 'noc-monitor',
        completed: false,
      },
    ],
  },

  electrical: {
    id: 'electrical',
    title: 'Coupure de Courant — Panne Réseau de la Ville',
    description: 'Une coupure de courant géante dans le quartier prive le datacenter de son alimentation électrique principale.',
    area: Area.ELECTRICAL,
    consequences: 'Sans système de secours, des milliers de serveurs s’éteindraient brutalement en perdant toutes les données en cours de traitement.',
    solutionExplanation: 'Les onduleurs prennent le relais en 0 milliseconde sur batteries, puis le groupe électrogène diesel démarre en moins d’une minute pour assurer l’autonomie longue durée.',
    steps: [
      {
        id: 'step-1',
        instruction: 'Vérifiez que l’onduleur et les batteries ont pris le relais en 0 ms.',
        targetObjectId: 'ups',
        completed: false,
      },
      {
        id: 'step-2',
        instruction: 'Vérifiez le démarrage automatique du groupe électrogène diesel.',
        targetObjectId: 'generator',
        completed: false,
      },
      {
        id: 'step-3',
        instruction: 'Contrôlez que les baies de serveurs sont toujours alimentées.',
        targetObjectId: 'server-rack',
        completed: false,
      },
      {
        id: 'step-4',
        instruction: 'Validez sur le mur d’écrans du NOC que l’alimentation est 100 % stable.',
        targetObjectId: 'noc-monitor',
        completed: false,
      },
    ],
  },

  network: {
    id: 'network',
    title: 'Fibre Coupée dans la Rue — Bascule de Secours',
    description: 'Un câble de fibre optique principal a été arraché lors de travaux dans la rue à proximité du datacenter.',
    area: Area.NETWORK,
    consequences: 'Le risque est une coupure totale d’Internet pour les utilisateurs si le réseau ne bascule pas immédiatement sur un autre opérateur.',
    solutionExplanation: 'Le routeur détecte la coupure de la première fibre et redirige automatiquement 100 % du trafic vers le câble de l’opérateur de secours.',
    steps: [
      {
        id: 'step-1',
        instruction: 'Inspectez le routeur d’arrivée pour vérifier la bascule sur la fibre de secours.',
        targetObjectId: 'bgp-router',
        completed: false,
      },
      {
        id: 'step-2',
        instruction: 'Contrôlez sur le pare-feu que le flux de données entrant est sécurisé.',
        targetObjectId: 'firewall',
        completed: false,
      },
      {
        id: 'step-3',
        instruction: 'Vérifiez que le switch réseau distribue bien les paquets aux serveurs.',
        targetObjectId: 'network-switch',
        completed: false,
      },
      {
        id: 'step-4',
        instruction: 'Confirmez sur le mur d’écrans du NOC que la connexion Internet est rétablie.',
        targetObjectId: 'noc-monitor',
        completed: false,
      },
    ],
  },
};

export const defaultScenario = missionScenarios.cooling;
