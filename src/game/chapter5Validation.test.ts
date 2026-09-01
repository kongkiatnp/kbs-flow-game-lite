import { describe, expect, it } from "vitest";
import {
  isFinalPass,
  isReviewAnswerCorrect,
  validateMasterFlow,
} from "./chapter5Validation";

describe("Chapter 5 validation", () => {
  it("checks review answers exactly", () => {
    expect(isReviewAnswerCorrect("Decision", "Decision")).toBe(true);
    expect(isReviewAnswerCorrect("Process", "Decision")).toBe(false);
  });

  it("accepts the canonical integrated master flow", () => {
    expect(
      validateMasterFlow({
        start: "START",
        input: "INPUT_NAME",
        process: "COLLECT_FRAGMENT",
        decision: "CHECK_THREE",
        no: "NO_REPEAT",
        yes: "YES_OUTPUT",
        end: "END",
      }),
    ).toBe(true);
  });

  it("rejects a master flow with swapped branches", () => {
    expect(
      validateMasterFlow({
        start: "START",
        input: "INPUT_NAME",
        process: "COLLECT_FRAGMENT",
        decision: "CHECK_THREE",
        no: "YES_OUTPUT",
        yes: "NO_REPEAT",
        end: "END",
      }),
    ).toBe(false);
  });

  it("uses 8/10 as the final pass threshold", () => {
    expect(isFinalPass(7)).toBe(false);
    expect(isFinalPass(8)).toBe(true);
    expect(isFinalPass(9)).toBe(true);
    expect(isFinalPass(10)).toBe(true);
  });
});
