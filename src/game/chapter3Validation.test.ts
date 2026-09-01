import { describe, expect, it } from "vitest";
import { isBranchCorrect, isDecisionQuestionCorrect, validateGateAssignments } from "./chapter3Validation";

describe("Chapter 3 validation", () => {
  it("checks yes/no branches exactly", () => {
    expect(isBranchCorrect("YES", "YES")).toBe(true);
    expect(isBranchCorrect("NO", "YES")).toBe(false);
  });

  it("checks decision question choices exactly", () => {
    expect(isDecisionQuestionCorrect("มี Logic Key หรือไม่?", "มี Logic Key หรือไม่?")).toBe(true);
    expect(isDecisionQuestionCorrect("เปิดเพลงหรือไม่?", "มี Logic Key หรือไม่?")).toBe(false);
  });

  it("accepts the canonical Sattahip decision gate", () => {
    expect(validateGateAssignments({
      start: "START",
      decision: "CHECK_KEY",
      yes: "YES_OPEN",
      no: "NO_FIND",
      end: "END",
    })).toBe(true);
  });

  it("rejects swapped yes/no branches", () => {
    expect(validateGateAssignments({
      start: "START",
      decision: "CHECK_KEY",
      yes: "NO_FIND",
      no: "YES_OPEN",
      end: "END",
    })).toBe(false);
  });
});
