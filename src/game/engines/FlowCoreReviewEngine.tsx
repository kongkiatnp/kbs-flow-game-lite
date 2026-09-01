import { useState } from "react";
import { flowCoreReviewQuestions } from "../../data/chapter5";
import { isReviewAnswerCorrect } from "../chapter5Validation";

export function FlowCoreReviewEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = flowCoreReviewQuestions[index];

  const check = () => {
    if (!selected) return;
    const ok = isReviewAnswerCorrect(selected, question.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (index === flowCoreReviewQuestions.length - 1) {
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
        <span className="mission-kicker master-kicker">ACTIVITY 1 / 3</span>
        <h1>FLOW CORE REVIEW</h1>
        <p>
          ทบทวน 4 พลังหลักก่อนเข้าสู่ศูนย์บัญชาการ FLOW CORE
        </p>
      </div>

      <div className="core-review-strip">
        {["SYMBOL", "SEQUENCE", "DECISION", "LOOP"].map((domain, qIndex) => (
          <div
            key={domain}
            className={`review-core ${qIndex < index ? "done" : ""} ${qIndex === index ? "active" : ""}`}
          >
            <span>{qIndex < index ? "✓" : qIndex + 1}</span>
            <strong>{domain}</strong>
          </div>
        ))}
      </div>

      <div className="master-review-card">
        <span className="master-review-icon" aria-hidden="true">{question.icon}</span>
        <small>{question.domain}</small>
        <strong>{question.prompt}</strong>
      </div>

      <div className="master-choice-grid">
        {question.choices.map((choice) => {
          const chosen = selected === choice;
          const right = checked && correct && chosen;
          const wrong = checked && !correct && chosen;
          return (
            <button
              key={choice}
              type="button"
              className={`master-choice ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
              onClick={() => {
                if (correct) return;
                setSelected(choice);
                setChecked(false);
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>เลือกคำตอบ แล้วตรวจความพร้อมของ Logic Core</p>}
        {checked && !correct && (
          <p><strong>ลองทบทวนอีกนิด:</strong> {question.hint}</p>
        )}
        {checked && correct && (
          <p><strong>✓ {question.explanation}</strong></p>
        )}
      </div>

      <div className="engine-actions">
        {!correct ? (
          <button className="btn btn-primary" onClick={check} disabled={!selected}>
            ตรวจคำตอบ
          </button>
        ) : (
          <button className="btn btn-primary" onClick={next}>
            {index === flowCoreReviewQuestions.length - 1
              ? "ไป Master Flow Mission"
              : "พลังถัดไป"}
          </button>
        )}
      </div>
    </section>
  );
}
