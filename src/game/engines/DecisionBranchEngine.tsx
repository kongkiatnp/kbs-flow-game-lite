import { useState } from "react";
import { chapter3BranchScenarios, type DecisionBranch } from "../../data/chapter3";
import { DecisionDiagram } from "../../components/DecisionDiagram";
import { isBranchCorrect } from "../chapter3Validation";

export function DecisionBranchEngine({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<DecisionBranch | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const scenario = chapter3BranchScenarios[index];

  const check = () => {
    if (!selected) return;
    const ok = isBranchCorrect(selected, scenario.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (index === chapter3BranchScenarios.length - 1) {
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
    setCorrect(false);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker decision-kicker">ACTIVITY 1 / 3</span>
        <h1>เลือกเส้นทาง ใช่ / ไม่ใช่</h1>
        <p>อ่านเงื่อนไข แล้วเลือก Branch ที่ตรงกับสถานการณ์</p>
      </div>

      <div className="question-status">
        สถานการณ์ {index + 1} / {chapter3BranchScenarios.length}
        <div className="mini-progress">
          {chapter3BranchScenarios.map((item, qIndex) => (
            <span key={item.id} className={qIndex <= index ? "active decision-active" : ""} />
          ))}
        </div>
      </div>

      <div className="decision-situation-card">
        <span aria-hidden="true">{scenario.emoji}</span>
        <strong>{scenario.prompt}</strong>
      </div>

      <DecisionDiagram question={scenario.question} yesResult={scenario.yesResult} noResult={scenario.noResult} />

      <div className="branch-choice-row">
        {(["YES", "NO"] as DecisionBranch[]).map((branch) => {
          const chosen = selected === branch;
          const right = checked && correct && chosen;
          const wrong = checked && !correct && chosen;
          return (
            <button
              key={branch}
              type="button"
              className={`branch-choice ${branch === "YES" ? "yes" : "no"} ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
              onClick={() => {
                if (correct) return;
                setSelected(branch);
                setChecked(false);
              }}
            >
              <span>{branch === "YES" ? "✓" : "×"}</span>
              <strong>{branch === "YES" ? "ใช่" : "ไม่ใช่"}</strong>
            </button>
          );
        })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>เลือก Branch แล้วกด “ตรวจเส้นทาง”</p>}
        {checked && !correct && <p><strong>ลองอีกครั้งนะ:</strong> {scenario.hint}</p>}
        {checked && correct && <p><strong>✓ {scenario.explanation}</strong></p>}
      </div>

      <div className="engine-actions">
        {!correct ? (
          <button className="btn btn-primary" onClick={check} disabled={!selected}>ตรวจเส้นทาง</button>
        ) : (
          <button className="btn btn-primary" onClick={next}>
            {index === chapter3BranchScenarios.length - 1 ? "ไปกิจกรรม 2" : "สถานการณ์ต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
