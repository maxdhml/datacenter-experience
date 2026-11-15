// ── Game State Enums ──────────────────────────────────────────────

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  PRESENTATION = 'PRESENTATION',
  MISSION = 'MISSION',
}

export enum Area {
  INTRODUCTION = 'INTRODUCTION',
  SERVER_ROOM = 'SERVER_ROOM',
  COOLING = 'COOLING',
  ELECTRICAL = 'ELECTRICAL',
  NETWORK = 'NETWORK',
  SECURITY = 'SECURITY',
}

// ── Equipment & Interactive Objects ──────────────────────────────

export interface EquipmentDetails {
  name: string;
  definition: string;
  purpose: string;
  howItWorks: string;
  realWorldExample: string;
  category: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  type: 'equipment' | 'info' | 'quiz' | 'door' | 'terminal';
  position: [number, number, number];
  description: string;
  details: EquipmentDetails;
}

// ── Mission ─────────────────────────────────────────────────────

export interface MissionAlert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: number;
}

export interface MissionScenario {
  id: string;
  title: string;
  description: string;
  steps: MissionStep[];
  area: Area;
  consequences?: string;
  solutionExplanation?: string;
}

export interface MissionStep {
  id: string;
  instruction: string;
  targetObjectId?: string;
  completed: boolean;
}

export interface MissionState {
  active: boolean;
  currentStep: number;
  scenario: MissionScenario | null;
  completed: string[];
  alerts: MissionAlert[];
}

// ── Presentation ────────────────────────────────────────────────

export interface PresentationState {
  active: boolean;
  currentArea: Area;
  autoCamera: boolean;
  showNotes: boolean;
  notesVisible: boolean;
}

// ── Quiz ────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  correct: boolean;
}

// ── Player ──────────────────────────────────────────────────────

export interface PlayerState {
  position: [number, number, number];
  rotation: [number, number];
  currentArea: Area;
  interactingWith: string | null;
  health: number;
}

// ── Collision ───────────────────────────────────────────────────

export interface BoundingBox {
  min: [number, number, number];
  max: [number, number, number];
}

// ── Store types ─────────────────────────────────────────────────

export interface AreaProgress {
  area: Area;
  total: number;
  completed: number;
  percentage: number;
}
