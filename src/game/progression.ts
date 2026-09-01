import { getChapter } from "../data/chapters";
import type { ActivityId, ChapterId, GameSave } from "../types/game";

export function canOpenChapter(save: GameSave, chapterId: ChapterId): boolean {
  return chapterId <= save.unlockedChapter;
}

export function completeActivity(
  save: GameSave,
  chapterId: ChapterId,
  activityId: ActivityId,
): GameSave {
  // Fail closed: progression functions must not allow a caller to mutate a
  // chapter that has not been unlocked, even if invoked outside the UI guard.
  if (chapterId > save.unlockedChapter) return save;

  const expected = Math.min(save.chapterProgress[chapterId] + 1, 3);
  if (activityId > expected) return save;

  const rawProgress = Math.max(
    save.chapterProgress[chapterId],
    activityId,
  ) as 0 | 1 | 2 | 3;

  // Chapter 5 activity 3 is the Final Challenge. Activities 1–2 may advance
  // Chapter 5 only to progress=2. Final pass performs the completion transaction.
  const nextProgress =
    chapterId === 5 ? (Math.min(rawProgress, 2) as 0 | 1 | 2) : rawProgress;

  const chapterProgress = {
    ...save.chapterProgress,
    [chapterId]: nextProgress,
  };

  const isComplete = chapterId < 5 && nextProgress === 3;
  const completedChapters = isComplete
    ? Array.from(new Set([...save.completedChapters, chapterId])).sort(
        (a, b) => a - b,
      ) as ChapterId[]
    : save.completedChapters;

  const chapter = getChapter(chapterId);
  const logicCores = isComplete
    ? Array.from(new Set([...save.logicCores, chapter.core]))
    : save.logicCores;

  const unlockedChapter = isComplete
    ? (Math.min(5, chapterId + 1) as ChapterId)
    : save.unlockedChapter;

  return {
    ...save,
    chapterProgress,
    completedChapters,
    logicCores,
    unlockedChapter: Math.max(save.unlockedChapter, unlockedChapter) as ChapterId,
    resume: isComplete
      ? { screen: "map" }
      : {
          screen: "activity",
          chapterId,
          activityId: Math.min(3, activityId + 1) as ActivityId,
        },
  };
}

export function completeFinal(save: GameSave): GameSave {
  // Final completion is valid only after Chapters 1–4 are complete and both
  // Chapter 5 preparation activities have been completed. This keeps MASTER
  // CORE fail-closed even if the function is called outside FinalPage.
  const prerequisitesMet =
    save.unlockedChapter === 5 &&
    save.chapterProgress[1] === 3 &&
    save.chapterProgress[2] === 3 &&
    save.chapterProgress[3] === 3 &&
    save.chapterProgress[4] === 3 &&
    save.chapterProgress[5] >= 2;

  if (!prerequisitesMet) return save;

  return {
    ...save,
    chapterProgress: { ...save.chapterProgress, 5: 3 },
    completedChapters: Array.from(
      new Set([...save.completedChapters, 5]),
    ).sort((a, b) => a - b) as ChapterId[],
    logicCores: Array.from(new Set([...save.logicCores, "MASTER"])),
    finalCompleted: true,
    resume: { screen: "ending" },
  };
}
