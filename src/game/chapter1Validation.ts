import type { FlowSymbolId } from "../data/chapter1";
import { chapter1FlowAnswer } from "../data/chapter1";

export function validateSymbolMatches(
  assignments: Record<string, FlowSymbolId | undefined>,
): boolean {
  const expected: Record<string, FlowSymbolId> = {
    START_END: "START_END",
    PROCESS: "PROCESS",
    INPUT_OUTPUT: "INPUT_OUTPUT",
    DECISION: "DECISION",
    ARROW: "ARROW",
  };

  return Object.entries(expected).every(
    ([targetId, symbolId]) => assignments[targetId] === symbolId,
  );
}

export function isChoiceCorrect(
  selected: FlowSymbolId | null,
  expected: FlowSymbolId,
): boolean {
  return selected === expected;
}

export function validateFlowOrder(
  slots: Array<string | null>,
): boolean {
  return (
    slots.length === chapter1FlowAnswer.length &&
    slots.every((pieceId, index) => pieceId === chapter1FlowAnswer[index])
  );
}
