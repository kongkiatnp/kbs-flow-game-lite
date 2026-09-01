import type { DecisionBranch, GateStepId } from "../data/chapter3";
import { sattahipGateAnswer } from "../data/chapter3";

export function isBranchCorrect(selected: DecisionBranch | null, expected: DecisionBranch): boolean {
  return selected === expected;
}

export function isDecisionQuestionCorrect(selected: string | null, expected: string): boolean {
  return selected === expected;
}

export function validateGateAssignments(assignments: Record<string, GateStepId | undefined>): boolean {
  return Object.entries(sattahipGateAnswer).every(([slot, piece]) => assignments[slot] === piece);
}
