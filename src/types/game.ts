export type ChapterId = 1 | 2 | 3 | 4 | 5;
export type ActivityId = 1 | 2 | 3;

export type CoreId =
  | "SYMBOL"
  | "SEQUENCE"
  | "DECISION"
  | "LOOP"
  | "MASTER";

export type ResumeScreen =
  | "story"
  | "map"
  | "chapter"
  | "activity"
  | "final"
  | "ending";

export type ChapterProgress = Record<ChapterId, 0 | 1 | 2 | 3>;

export type GameSave = {
  saveVersion: 1;
  playerName: string;
  introSeen: boolean;
  unlockedChapter: ChapterId;
  completedChapters: ChapterId[];
  chapterProgress: ChapterProgress;
  logicCores: CoreId[];
  finalCompleted: boolean;
  resume: {
    screen: ResumeScreen;
    chapterId?: ChapterId;
    activityId?: ActivityId;
  };
  soundEnabled: boolean;
};

export type SaveLoadResult =
  | { status: "VALID_SAVE"; save: GameSave }
  | { status: "NO_SAVE" }
  | { status: "INVALID_SAVE" };
