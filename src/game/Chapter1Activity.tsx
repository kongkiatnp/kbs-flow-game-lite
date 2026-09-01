import type { ActivityId } from "../types/game";
import { MatchSymbolsEngine } from "./engines/MatchSymbolsEngine";
import { SymbolChoiceEngine } from "./engines/SymbolChoiceEngine";
import { FlowBuildEngine } from "./engines/FlowBuildEngine";

export function Chapter1Activity({
  activityId,
  onComplete,
}: {
  activityId: ActivityId;
  onComplete: () => void;
}) {
  if (activityId === 1) return <MatchSymbolsEngine onComplete={onComplete} />;
  if (activityId === 2) return <SymbolChoiceEngine onComplete={onComplete} />;
  return <FlowBuildEngine onComplete={onComplete} />;
}
