import { useState } from "react";
import { stopConditionQuestions } from "../../data/chapter4";
import { isStopConditionCorrect } from "../chapter4Validation";

export function StopConditionEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = stopConditionQuestions[index];

  const check = () => {
    if (!selected) return;
    const ok = isStopConditionCorrect(selected, question.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (index === stopConditionQuestions.length - 1) {
      onComplete();
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
    setChecked(false);
    setCorrect(false);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker loop-kicker">ACTIVITY 2 / 3</span>
        <h1>เงื่อนไขหยุดคืออะไร?</h1>
        <p>
          Loop ที่ดีต้องรู้ว่า “เมื่อไรควรหยุด” เลือกเงื่อนไขที่ตรงกับเป้าหมาย
        </p>
      </div>

      <div className="question-status">
        ข้อ {index + 1} / {stopConditionQuestions.length}
        <div className="mini-progress">
          {stopConditionQuestions.map((item, qIndex) => (
            <span
              key={item.id}
              className={qIndex <= index ? "active loop-active" : ""}
            />
          ))}
        </div>
      </div>

      <div className="loop-situation-card">
        <span className="loop-icon" aria-hidden="true">↻</span>
        <div>
          <small>เป้าหมาย</small>
          <strong>{question.situation}</strong>
          <p>สิ่งที่ทำซ้ำ: {question.repeatedAction}</p>
        </div>
      </div>

      <div className="stop-condition-visual">
        <div className="stop-process">{question.repeatedAction}</div>
        <div className="stop-arrow">↓</div>
        <div className="stop-diamond">?</div>
        <div className="stop-branches">
          <span>ไม่ใช่ ↩ ทำซ้ำ</span>
          <span>ใช่ → หยุด</span>
        </div>
      </div>

      <div className="decision-question-choices">
        {question.choices.map((choice) => {
          const chosen = selected === choice;
          const right = checked && correct && chosen;
          const wrong = checked && !correct && chosen;

          return (
            <button
              key={choice}
              type="button"
              className={`decision-text-choice loop-choice ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
              onClick={() => {
                if (correct) return;
                setSelected(choice);
                setChecked(false);
              }}
            >
              <span className="mini-loop" aria-hidden="true">↻</span>
              <strong>{choice}</strong>
            </button>
          );
        })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>เลือกคำถามที่จะใช้ตรวจว่า Loop ควรหยุดหรือทำซ้ำต่อ</p>}
        {checked && !correct && (
          <p><strong>ลองอีกครั้งนะ:</strong> {question.hint}</p>
        )}
        {checked && correct && (
          <p><strong>✓ {question.explanation}</strong></p>
        )}
      </div>

      <div className="engine-actions">
        {!correct ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={!selected}
          >
            ตรวจเงื่อนไข
          </button>
        ) : (
          <button className="btn btn-primary" onClick={next}>
            {index === stopConditionQuestions.length - 1
              ? "ไปกิจกรรม 3"
              : "ข้อต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
