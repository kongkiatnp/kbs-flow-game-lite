import type {
  ActivityId,
  ChapterId,
  ChapterProgress,
  CoreId,
  GameSave,
  SaveLoadResult,
} from "../types/game";

export const SAVE_KEY = "kbs_flow_game_save";
export const SAVE_VERSION = 1 as const;

const chapterIds: ChapterId[] = [1, 2, 3, 4, 5];
const activityIds: ActivityId[] = [1, 2, 3];
const validCores: CoreId[] = ["SYMBOL", "SEQUENCE", "DECISION", "LOOP", "MASTER"];

export function cleanPlayerName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 20);
}

export function createNewSave(playerName: string): GameSave {
  return {
    saveVersion: SAVE_VERSION,
    playerName: cleanPlayerName(playerName),
    introSeen: false,
    unlockedChapter: 1,
    completedChapters: [],
    chapterProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    logicCores: [],
    finalCompleted: false,
    resume: { screen: "story" },
    soundEnabled: true,
  };
}

function isChapterId(value: unknown): value is ChapterId {
  return typeof value === "number" && chapterIds.includes(value as ChapterId);
}

function isActivityId(value: unknown): value is ActivityId {
  return typeof value === "number" && activityIds.includes(value as ActivityId);
}

function normalizeProgress(value: unknown): ChapterProgress {
  const source =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const pick = (id: ChapterId): 0 | 1 | 2 | 3 => {
    const raw = Number(source[String(id)] ?? 0);
    if (raw <= 0) return 0;
    if (raw === 1) return 1;
    if (raw === 2) return 2;
    return 3;
  };
  return { 1: pick(1), 2: pick(2), 3: pick(3), 4: pick(4), 5: pick(5) };
}

export function normalizeSave(input: unknown): GameSave | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  if (raw.saveVersion !== SAVE_VERSION) return null;

  const playerName = cleanPlayerName(String(raw.playerName ?? ""));
  if (!playerName) return null;

  const progress = normalizeProgress(raw.chapterProgress);

  // Fail closed: progression must be sequential. If an earlier chapter is
  // incomplete, later chapter progress is discarded.
  let chainOpen = true;
  for (const id of chapterIds) {
    if (!chainOpen) {
      progress[id] = 0;
      continue;
    }
    if (id < 5 && progress[id] < 3) chainOpen = false;
  }

  // Derive truthful progression instead of trusting arbitrary unlockedChapter
  // values from Local Storage.
  const completed: ChapterId[] = chapterIds.filter((id) => progress[id] === 3);

  let unlockedChapter: ChapterId = 1;
  if (progress[1] === 3) unlockedChapter = 2;
  if (progress[2] === 3) unlockedChapter = 3;
  if (progress[3] === 3) unlockedChapter = 4;
  if (progress[4] === 3) unlockedChapter = 5;

  const coreForChapter: Record<ChapterId, CoreId> = {
    1: "SYMBOL",
    2: "SEQUENCE",
    3: "DECISION",
    4: "LOOP",
    5: "MASTER",
  };
  const logicCores = completed.map((id) => coreForChapter[id]);

  const resumeRaw =
    raw.resume && typeof raw.resume === "object"
      ? (raw.resume as Record<string, unknown>)
      : {};
  const screen = [
    "story",
    "map",
    "chapter",
    "activity",
    "final",
    "ending",
  ].includes(String(resumeRaw.screen))
    ? (String(resumeRaw.screen) as GameSave["resume"]["screen"])
    : "map";

  let chapterId = isChapterId(resumeRaw.chapterId)
    ? resumeRaw.chapterId
    : undefined;
  let activityId = isActivityId(resumeRaw.activityId)
    ? resumeRaw.activityId
    : undefined;

  if (chapterId && chapterId > unlockedChapter) chapterId = unlockedChapter;
  if (screen === "activity" && (!chapterId || !activityId)) {
    chapterId = undefined;
    activityId = undefined;
  }

  const finalCompleted = progress[5] === 3;

  return {
    saveVersion: SAVE_VERSION,
    playerName,
    introSeen: Boolean(raw.introSeen),
    unlockedChapter,
    completedChapters: completed,
    chapterProgress: progress,
    logicCores,
    finalCompleted,
    resume: {
      screen: finalCompleted ? "ending" : screen,
      chapterId,
      activityId,
    },
    soundEnabled: raw.soundEnabled !== false,
  };
}

export function loadSave(): SaveLoadResult {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { status: "NO_SAVE" };
    const parsed = JSON.parse(raw);
    const save = normalizeSave(parsed);
    if (!save) return { status: "INVALID_SAVE" };
    return { status: "VALID_SAVE", save };
  } catch {
    return { status: "INVALID_SAVE" };
  }
}

export function writeSave(save: GameSave): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

export function removeSave(): void {
  localStorage.removeItem(SAVE_KEY);
}
