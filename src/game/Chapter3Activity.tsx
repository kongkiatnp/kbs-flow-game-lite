import type { ActivityId } from "../types/game";
import { DecisionBranchEngine } from "./engines/DecisionBranchEngine";
import { DecisionQuestionEngine } from "./engines/DecisionQuestionEngine";
import { SattahipGateEngine } from "./engines/SattahipGateEngine";

export function Chapter3Activity({ activityId, onComplete }: { activityId: ActivityId; onComplete: () => void }) {
  if (activityId === 1) return <DecisionBranchEngine onComplete={onComplete} />;
  if (activityId === 2) return <DecisionQuestionEngine onComplete={onComplete} />;
  return <SattahipGateEngine onComplete={onComplete} />;
}
