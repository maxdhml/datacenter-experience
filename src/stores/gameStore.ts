import { create } from 'zustand';
import {
  GameState,
  Area,
} from '../types/index.js';
import type {
  MissionState,
  MissionScenario,
  PresentationState,
  QuizResult,
  AreaProgress,
} from '../types/index.js';
import { EQUIPMENT_TARGETS } from '../data/equipmentTargets.js';

// ── Ordered area list for presentation navigation ───────────────
const AREA_ORDER: Area[] = [
  Area.INTRODUCTION,
  Area.SERVER_ROOM,
  Area.COOLING,
  Area.ELECTRICAL,
  Area.NETWORK,
  Area.SECURITY,
];

const ZONE_NUM_TO_AREA: Record<number, Area> = {
  1: Area.INTRODUCTION,
  2: Area.SERVER_ROOM,
  3: Area.COOLING,
  4: Area.ELECTRICAL,
  5: Area.NETWORK,
  6: Area.SECURITY,
};

// ── Store shape ─────────────────────────────────────────────────

interface GameStore {
  // Core state
  gameState: GameState;
  currentArea: Area;

  // Player
  playerPosition: [number, number, number];
  playerRotation: [number, number];
  interactingWith: string | null;
  targetPOI: { position: [number, number, number]; lookAt: [number, number, number] } | null;

  // Guided Tour Mode
  guidedTourIndex: number;
  isGuidedTour: boolean;
  startGuidedTour: (startIndex?: number) => void;
  nextGuidedPOI: () => void;
  prevGuidedPOI: () => void;
  jumpToGuidedPOI: (index: number) => void;

  // Presentation mode
  presentationMode: PresentationState;

  // Mission
  missionState: MissionState;

  // Progress
  completedInteractions: Set<string>;
  quizResults: QuizResult[];

  // ── Actions ─────────────────────────────────────────────────

  setGameState: (state: GameState) => void;
  setArea: (area: Area) => void;

  // Presentation
  startPresentation: (area?: Area) => void;
  stopPresentation: () => void;
  nextPresentationArea: () => void;
  prevPresentationArea: () => void;
  toggleNotes: () => void;

  // Mission
  startMission: (scenario: MissionScenario) => void;
  advanceMission: () => void;
  completeMission: () => void;

  // Interactions
  setInteractingWith: (id: string | null) => void;
  addInteraction: (id: string) => void;
  submitQuiz: (result: QuizResult) => void;

  // Player
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerRotation: (rot: [number, number]) => void;
  teleportToPOI: (target: { position: [number, number, number]; lookAt: [number, number, number] }) => void;
  clearTargetPOI: () => void;

  // Pause
  togglePause: () => void;

  // Progress
  getProgress: () => AreaProgress[];
}

// ── Total interactable objects per area (2 par zone = 12 total) ────
const TOTAL_PER_AREA: Record<Area, number> = {
  [Area.INTRODUCTION]: 2,
  [Area.SERVER_ROOM]: 2,
  [Area.COOLING]: 2,
  [Area.ELECTRICAL]: 2,
  [Area.NETWORK]: 2,
  [Area.SECURITY]: 2,
};

// ── Store ───────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: GameState.MENU,
  currentArea: Area.INTRODUCTION,

  playerPosition: [0, 1.6, -14],
  playerRotation: [0, 0],
  interactingWith: null,
  targetPOI: null,

  guidedTourIndex: 0,
  isGuidedTour: true,

  presentationMode: {
    active: false,
    currentArea: Area.INTRODUCTION,
    autoCamera: true,
    showNotes: false,
    notesVisible: false,
  },

  missionState: {
    active: false,
    currentStep: 0,
    scenario: null,
    completed: [],
    alerts: [],
  },

  completedInteractions: new Set<string>(),
  quizResults: [],

  // ── Actions ───────────────────────────────────────────────────

  setGameState: (state) => set({ gameState: state }),

  setArea: (area) => set({ currentArea: area }),

  startGuidedTour: (startIndex = 0) => {
    const target = EQUIPMENT_TARGETS[startIndex] || EQUIPMENT_TARGETS[0];
    if (!target) return;
    const area = ZONE_NUM_TO_AREA[target.zoneNumber] || Area.INTRODUCTION;
    set({
      gameState: GameState.PLAYING,
      isGuidedTour: true,
      guidedTourIndex: startIndex,
      currentArea: area,
      targetPOI: {
        position: target.viewPosition,
        lookAt: target.lookAt,
      },
      interactingWith: target.id,
    });
    get().addInteraction(target.id);
  },

  nextGuidedPOI: () => {
    const nextIdx = (get().guidedTourIndex + 1) % EQUIPMENT_TARGETS.length;
    const target = EQUIPMENT_TARGETS[nextIdx];
    if (!target) return;
    const area = ZONE_NUM_TO_AREA[target.zoneNumber] || Area.INTRODUCTION;
    set({
      guidedTourIndex: nextIdx,
      isGuidedTour: true,
      gameState: GameState.PLAYING,
      currentArea: area,
      targetPOI: {
        position: target.viewPosition,
        lookAt: target.lookAt,
      },
      interactingWith: target.id,
    });
    get().addInteraction(target.id);
  },

  prevGuidedPOI: () => {
    const prevIdx = (get().guidedTourIndex - 1 + EQUIPMENT_TARGETS.length) % EQUIPMENT_TARGETS.length;
    const target = EQUIPMENT_TARGETS[prevIdx];
    if (!target) return;
    const area = ZONE_NUM_TO_AREA[target.zoneNumber] || Area.INTRODUCTION;
    set({
      guidedTourIndex: prevIdx,
      isGuidedTour: true,
      gameState: GameState.PLAYING,
      currentArea: area,
      targetPOI: {
        position: target.viewPosition,
        lookAt: target.lookAt,
      },
      interactingWith: target.id,
    });
    get().addInteraction(target.id);
  },

  jumpToGuidedPOI: (index: number) => {
    const safeIdx = Math.max(0, Math.min(index, EQUIPMENT_TARGETS.length - 1));
    const target = EQUIPMENT_TARGETS[safeIdx];
    if (!target) return;
    const area = ZONE_NUM_TO_AREA[target.zoneNumber] || Area.INTRODUCTION;
    set({
      guidedTourIndex: safeIdx,
      isGuidedTour: true,
      gameState: GameState.PLAYING,
      currentArea: area,
      targetPOI: {
        position: target.viewPosition,
        lookAt: target.lookAt,
      },
      interactingWith: target.id,
    });
    get().addInteraction(target.id);
  },

  startPresentation: (area) =>
    set({
      gameState: GameState.PRESENTATION,
      presentationMode: {
        active: true,
        currentArea: area ?? get().currentArea,
        autoCamera: true,
        showNotes: false,
        notesVisible: false,
      },
    }),

  stopPresentation: () =>
    set({
      gameState: GameState.PLAYING,
      presentationMode: {
        active: false,
        currentArea: get().presentationMode.currentArea,
        autoCamera: false,
        showNotes: false,
        notesVisible: false,
      },
    }),

  nextPresentationArea: () =>
    set((s) => {
      const idx = AREA_ORDER.indexOf(s.presentationMode.currentArea);
      const next = AREA_ORDER[(idx + 1) % AREA_ORDER.length]!;
      return {
        presentationMode: { ...s.presentationMode, currentArea: next },
        currentArea: next,
      };
    }),

  prevPresentationArea: () =>
    set((s) => {
      const idx = AREA_ORDER.indexOf(s.presentationMode.currentArea);
      const prev =
        AREA_ORDER[(idx - 1 + AREA_ORDER.length) % AREA_ORDER.length]!;
      return {
        presentationMode: { ...s.presentationMode, currentArea: prev },
        currentArea: prev,
      };
    }),

  toggleNotes: () =>
    set((s) => ({
      presentationMode: {
        ...s.presentationMode,
        showNotes: !s.presentationMode.showNotes,
        notesVisible: !s.presentationMode.notesVisible,
      },
    })),

  startMission: (scenario) =>
    set({
      gameState: GameState.MISSION,
      missionState: {
        active: true,
        currentStep: 0,
        scenario,
        completed: [],
        alerts: [],
      },
    }),

  advanceMission: () =>
    set((s) => {
      const ms = s.missionState;
      if (!ms.scenario) return s;
      const nextStep = ms.currentStep + 1;
      const isComplete = nextStep >= ms.scenario.steps.length;
      return {
        missionState: {
          ...ms,
          currentStep: isComplete ? ms.currentStep : nextStep,
        },
      };
    }),

  completeMission: () =>
    set((s) => {
      const ms = s.missionState;
      const scenarioId = ms.scenario?.id;
      return {
        gameState: GameState.PLAYING,
        missionState: {
          active: false,
          currentStep: 0,
          scenario: null,
          completed: scenarioId
            ? [...ms.completed, scenarioId]
            : ms.completed,
          alerts: [],
        },
      };
    }),

  setInteractingWith: (id) => set({ interactingWith: id }),

  addInteraction: (id) =>
    set((s) => {
      const next = new Set(s.completedInteractions);
      next.add(id);
      return { completedInteractions: next };
    }),

  submitQuiz: (result) =>
    set((s) => ({ quizResults: [...s.quizResults, result] })),

  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setPlayerRotation: (rot) => set({ playerRotation: rot }),
  teleportToPOI: (target) => {
    const targetIdx = EQUIPMENT_TARGETS.findIndex(
      (t) =>
        Math.abs(t.viewPosition[0] - target.position[0]) < 0.1 &&
        Math.abs(t.viewPosition[2] - target.position[2]) < 0.1
    );
    set({
      targetPOI: target,
      gameState: GameState.PLAYING,
      ...(targetIdx >= 0 ? { guidedTourIndex: targetIdx } : {}),
    });
  },
  clearTargetPOI: () => set({ targetPOI: null }),

  togglePause: () =>
    set((s) => ({
      gameState:
        s.gameState === GameState.PAUSED ? GameState.PLAYING : GameState.PAUSED,
    })),

  getProgress: () => {
    const completed = get().completedInteractions;
    return AREA_ORDER.map((area) => {
      const total = TOTAL_PER_AREA[area];
      const done = [...completed].filter((id) =>
        id.startsWith(area.toLowerCase()),
      ).length;
      return {
        area,
        total,
        completed: Math.min(done, total),
        percentage: total > 0 ? Math.round((Math.min(done, total) / total) * 100) : 0,
      };
    });
  },
}));
