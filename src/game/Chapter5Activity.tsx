import type { ActivityId } from "../types/game";
import { FlowCoreReviewEngine } from "./engines/FlowCoreReviewEngine";
import { MasterFlowMissionEngine } from "./engines/MasterFlowMissionEngine";

export function Chapter5Activity({
  activityId,
  onComplete,
}: {
  activityId: ActivityId;
  onComplete: () => void;
}) {
  if (activityId === 1) return <FlowCoreReviewEngine onComplete={onComplete} />;
  if (activityId === 2) return <MasterFlowMissionEngine onComplete={onComplete} />;

  return (
    <div className="stage-notice">
      Activity 3 ของ Chapter 5 คือ Final Challenge และเปิดผ่านหน้า /final
    </div>
  );
}
