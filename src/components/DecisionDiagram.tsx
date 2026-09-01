export function DecisionDiagram({
  question,
  yesResult,
  noResult,
}: {
  question: string;
  yesResult: string;
  noResult: string;
}) {
  return (
    <div className="decision-diagram">
      <div className="decision-question">
        <strong>{question}</strong>
      </div>
      <div className="decision-branches" aria-label="ทางเลือก ใช่ และ ไม่ใช่">
        <div className="decision-branch yes-branch">
          <span className="branch-label">ใช่</span>
          <div className="branch-line">↙</div>
          <strong>{yesResult}</strong>
        </div>
        <div className="decision-branch no-branch">
          <span className="branch-label">ไม่ใช่</span>
          <div className="branch-line">↘</div>
          <strong>{noResult}</strong>
        </div>
      </div>
    </div>
  );
}
