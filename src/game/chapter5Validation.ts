import type { MasterPieceId } from "../data/chapter5";
import {
  FINAL_PASS_SCORE,
  masterFlowAnswer,
} from "../data/chapter5";

export function isReviewAnswerCorrect(
  selected: string | null,
  expected: string,
): boolean {
  return selected === expected;
}

export function validateMasterFlow(
  assignments: Record<string, MasterPieceId | undefined>,
): boolean {
  return Object.entries(masterFlowAnswer).every(
    ([slot, piece]) => assignments[slot] === piece,
  );
}

export function isFinalPass(score: number): boolean {
  return score >= FINAL_PASS_SCORE;
}
