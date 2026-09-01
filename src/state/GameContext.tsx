import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { ActivityId, ChapterId, GameSave } from "../types/game";
import {
  createNewSave,
  loadSave,
  removeSave,
  writeSave,
} from "../services/saveService";
import { completeActivity, completeFinal } from "../game/progression";

type GameState = {
  save: GameSave | null;
  loadStatus: "VALID_SAVE" | "NO_SAVE" | "INVALID_SAVE";
};

type Action =
  | { type: "NEW_GAME"; playerName: string }
  | { type: "SET_INTRO_SEEN" }
  | {
      type: "SET_RESUME";
      screen: GameSave["resume"]["screen"];
      chapterId?: ChapterId;
      activityId?: ActivityId;
    }
  | { type: "COMPLETE_ACTIVITY"; chapterId: ChapterId; activityId: ActivityId }
  | { type: "COMPLETE_FINAL" }
  | { type: "TOGGLE_SOUND" }
  | { type: "RESET_GAME" };

const initialLoad = loadSave();
const initialState: GameState =
  initialLoad.status === "VALID_SAVE"
    ? { save: initialLoad.save, loadStatus: "VALID_SAVE" }
    : { save: null, loadStatus: initialLoad.status };

function persist(save: GameSave | null): GameSave | null {
  if (save) writeSave(save);
  return save;
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "NEW_GAME": {
      const save = createNewSave(action.playerName);
      return { save: persist(save), loadStatus: "VALID_SAVE" };
    }
    case "SET_INTRO_SEEN": {
      if (!state.save) return state;
      const save: GameSave = {
        ...state.save,
        introSeen: true,
        resume: { screen: "map" },
      };
      return { ...state, save: persist(save) };
    }
    case "SET_RESUME": {
      if (!state.save) return state;
      const save: GameSave = {
        ...state.save,
        resume: {
          screen: action.screen,
          chapterId: action.chapterId,
          activityId: action.activityId,
        },
      };
      return { ...state, save: persist(save) };
    }
    case "COMPLETE_ACTIVITY": {
      if (!state.save) return state;
      const save = completeActivity(
        state.save,
        action.chapterId,
        action.activityId,
      );
      return { ...state, save: persist(save) };
    }
    case "COMPLETE_FINAL": {
      if (!state.save) return state;
      return { ...state, save: persist(completeFinal(state.save)) };
    }
    case "TOGGLE_SOUND": {
      if (!state.save) return state;
      const save = { ...state.save, soundEnabled: !state.save.soundEnabled };
      return { ...state, save: persist(save) };
    }
    case "RESET_GAME": {
      removeSave();
      return { save: null, loadStatus: "NO_SAVE" };
    }
    default:
      return state;
  }
}

const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<Action> } | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const value = useContext(GameContext);
  if (!value) throw new Error("useGame must be used inside GameProvider");
  return value;
}
