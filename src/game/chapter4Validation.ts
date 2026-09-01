import type { LoopPieceId } from "../data/chapter4";
import { samaesanLoopAnswer } from "../data/chapter4";

export function hasCollectedAllCards(
  collectedIds: string[],
  targetCount: number,
): boolean {
  return new Set(collectedIds).size >= targetCount;
}

export function isStopConditionCorrect(
  selected: string | null,
  expected: string,
): boolean {
  return selected === expected;
}

export function validateLoopAssignments(
  assignments: Record<string, LoopPieceId | undefined>,
): boolean {
  return Object.entries(samaesanLoopAnswer).every(
    ([slot, piece]) => assignments[slot] === piece,
  );
}
