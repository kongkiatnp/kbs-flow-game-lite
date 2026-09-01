import type { ActivityId } from "../types/game";
import { ConservationLoopEngine } from "./engines/ConservationLoopEngine";
import { StopConditionEngine } from "./engines/StopConditionEngine";
import { SamaesanRobotLoopEngine } from "./engines/SamaesanRobotLoopEngine";

export function Chapter4Activity({
  activityId,
  onComplete,
}: {
  activityId: ActivityId;
  onComplete: () => void;
}) {
  if (activityId === 1) return <ConservationLoopEngine onComplete={onComplete} />;
  if (activityId === 2) return <StopConditionEngine onComplete={onComplete} />;
  return <SamaesanRobotLoopEngine onComplete={onComplete} />;
}
