import { describe, expect, it } from "vitest";
import { createNewSave } from "../services/saveService";
import { canOpenChapter, completeActivity, completeFinal } from "./progression";

describe("progression", () => {
  it("starts with chapter 1 unlocked only", () => {
    const save = createNewSave("ภูมิ");
    expect(canOpenChapter(save, 1)).toBe(true);
    expect(canOpenChapter(save, 2)).toBe(false);
  });

  it("unlocks chapter 2 after all 3 chapter 1 activities", () => {
    let save = createNewSave("ภูมิ");
    save = completeActivity(save, 1, 1);
    save = completeActivity(save, 1, 2);
    save = completeActivity(save, 1, 3);
    expect(save.chapterProgress[1]).toBe(3);
    expect(save.unlockedChapter).toBe(2);
    expect(save.logicCores).toContain("SYMBOL");
  });

  it("does not duplicate cores", () => {
    let save = createNewSave("ภูมิ");
    save = completeActivity(save, 1, 1);
    save = completeActivity(save, 1, 2);
    save = completeActivity(save, 1, 3);
    save = completeActivity(save, 1, 3);
    expect(save.logicCores.filter((x) => x === "SYMBOL")).toHaveLength(1);
  });

  it("keeps chapter 5 incomplete after activities 1–2 until final passes", () => {
    let save = createNewSave("ภูมิ");
    save = {
      ...save,
      unlockedChapter: 5,
      chapterProgress: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 0 },
      completedChapters: [1, 2, 3, 4],
      logicCores: ["SYMBOL", "SEQUENCE", "DECISION", "LOOP"],
    };
    save = completeActivity(save, 5, 1);
    save = completeActivity(save, 5, 2);
    expect(save.chapterProgress[5]).toBe(2);
    expect(save.completedChapters).not.toContain(5);
    expect(save.logicCores).not.toContain("MASTER");

    save = completeFinal(save);
    expect(save.chapterProgress[5]).toBe(3);
    expect(save.completedChapters).toContain(5);
    expect(save.logicCores).toContain("MASTER");
  });

  it("final completion grants MASTER once after prerequisites", () => {
    let save = createNewSave("ภูมิ");
    save = {
      ...save,
      unlockedChapter: 5,
      chapterProgress: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 },
      completedChapters: [1, 2, 3, 4],
      logicCores: ["SYMBOL", "SEQUENCE", "DECISION", "LOOP"],
    };
    save = completeFinal(save);
    save = completeFinal(save);
    expect(save.finalCompleted).toBe(true);
    expect(save.logicCores.filter((x) => x === "MASTER")).toHaveLength(1);
  });

  it("rejects final completion before prerequisites", () => {
    const save = createNewSave("ภูมิ");
    const result = completeFinal(save);
    expect(result.finalCompleted).toBe(false);
    expect(result.logicCores).not.toContain("MASTER");
  });
});
