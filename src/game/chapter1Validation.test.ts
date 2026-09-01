import { describe, expect, it } from "vitest";
import {
  isChoiceCorrect,
  validateFlowOrder,
  validateSymbolMatches,
} from "./chapter1Validation";

describe("Chapter 1 validation", () => {
  it("accepts all five correct symbol matches", () => {
    expect(
      validateSymbolMatches({
        START_END: "START_END",
        PROCESS: "PROCESS",
        INPUT_OUTPUT: "INPUT_OUTPUT",
        DECISION: "DECISION",
        ARROW: "ARROW",
      }),
    ).toBe(true);
  });

  it("rejects an incorrect symbol match", () => {
    expect(
      validateSymbolMatches({
        START_END: "PROCESS",
        PROCESS: "START_END",
        INPUT_OUTPUT: "INPUT_OUTPUT",
        DECISION: "DECISION",
        ARROW: "ARROW",
      }),
    ).toBe(false);
  });

  it("checks situation choices exactly", () => {
    expect(isChoiceCorrect("DECISION", "DECISION")).toBe(true);
    expect(isChoiceCorrect("PROCESS", "DECISION")).toBe(false);
  });

  it("accepts only the canonical first flow order", () => {
    expect(validateFlowOrder(["start", "input", "output", "end"])).toBe(true);
    expect(validateFlowOrder(["start", "output", "input", "end"])).toBe(false);
  });
});
