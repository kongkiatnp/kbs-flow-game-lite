import { describe, expect, it } from "vitest";
import {
  hasCollectedAllCards,
  isStopConditionCorrect,
  validateLoopAssignments,
} from "./chapter4Validation";

describe("Chapter 4 validation", () => {
  it("requires five unique collected cards", () => {
    expect(hasCollectedAllCards(["a", "b", "c", "d"], 5)).toBe(false);
    expect(hasCollectedAllCards(["a", "b", "c", "d", "e"], 5)).toBe(true);
    expect(hasCollectedAllCards(["a", "a", "b", "c", "d"], 5)).toBe(false);
  });

  it("checks the stop condition exactly", () => {
    expect(
      isStopConditionCorrect(
        "เก็บครบ 5 ใบหรือยัง?",
        "เก็บครบ 5 ใบหรือยัง?",
      ),
    ).toBe(true);
    expect(
      isStopConditionCorrect(
        "การ์ดใบนี้สีอะไร?",
        "เก็บครบ 5 ใบหรือยัง?",
      ),
    ).toBe(false);
  });

  it("accepts the canonical Samaesan loop flow", () => {
    expect(
      validateLoopAssignments({
        start: "START",
        process: "COLLECT",
        decision: "CHECK_FIVE",
        no: "NO_REPEAT",
        yes: "YES_END",
        end: "END",
      }),
    ).toBe(true);
  });

  it("rejects swapped yes/no loop branches", () => {
    expect(
      validateLoopAssignments({
        start: "START",
        process: "COLLECT",
        decision: "CHECK_FIVE",
        no: "YES_END",
        yes: "NO_REPEAT",
        end: "END",
      }),
    ).toBe(false);
  });
});
