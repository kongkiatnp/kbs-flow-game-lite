import { describe, expect, it } from "vitest";
import { createNewSave, normalizeSave } from "./saveService";

describe("saveService", () => {
  it("cleans player name", () => {
    const save = createNewSave("  น้อง   ภูมิ  ");
    expect(save.playerName).toBe("น้อง ภูมิ");
  });

  it("rejects unsupported save versions", () => {
    expect(normalizeSave({ saveVersion: 99, playerName: "A" })).toBeNull();
  });

  it("does not trust impossible unlockedChapter values", () => {
    const save = normalizeSave({
      ...createNewSave("A"),
      unlockedChapter: 5,
      chapterProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
    expect(save?.unlockedChapter).toBe(1);
  });
});
