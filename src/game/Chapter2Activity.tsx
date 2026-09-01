import type { ActivityId } from "../types/game";
import { SequenceOrderEngine } from "./engines/SequenceOrderEngine";
import { MissingStepEngine } from "./engines/MissingStepEngine";
import { BangSareHarborEngine } from "./engines/BangSareHarborEngine";

export function Chapter2Activity({
  activityId,
  onComplete,
}: {
  activityId: ActivityId;
  onComplete: () => void;
}) {
  if (activityId === 1) return <SequenceOrderEngine onComplete={onComplete} />;
  if (activityId === 2) return <MissingStepEngine onComplete={onComplete} />;
  return <BangSareHarborEngine onComplete={onComplete} />;
}
