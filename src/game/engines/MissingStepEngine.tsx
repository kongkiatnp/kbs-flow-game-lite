import { useState } from "react";
import { chapter2MissingStepQuestions } from "../../data/chapter2";
import { isMissingStepCorrect } from "../chapter2Validation";

export function MissingStepEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = chapter2MissingStepQuestions[index];

  const check = () => {
    if (!selected) return;
    const ok = isMissingStepCorrect(selected, question.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (index === chapter2MissingStepQuestions.length - 1) {
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
        <span className="mission-kicker">ACTIVITY 2 / 3</span>
        <h1>ขั้นตอนไหนหายไป?</h1>
        <p>ดูสิ่งที่เกิดก่อนและหลัง แล้วเติมขั้นตอนตรงกลางให้เหมาะสม</p>
      </div>

      <div className="question-status">
        ข้อ {index + 1} / {chapter2MissingStepQuestions.length}
        <div className="mini-progress">
          {chapter2MissingStepQuestions.map((item, qIndex) => (
            <span key={item.id} className={qIndex <= index ? "active sequence-active" : ""} />
          ))}
        </div>
      </div>

      <div className="missing-flow">
        <div className="missing-flow-step fixed">
          <small>ก่อนหน้า</small>
          <strong>{question.before}</strong>
        </div>
        <div className="missing-flow-arrow">↓</div>
        <div className="missing-flow-step mystery">
          <small>ขั้นตอนที่หายไป</small>
          <strong>?</strong>
        </div>
        <div className="missing-flow-arrow">↓</div>
        <div className="missing-flow-step fixed">
          <small>ถัดไป</small>
          <strong>{question.after}</strong>
        </div>
      </div>

      <h2 className="choice-heading">{question.prompt}</h2>
      <div className="text-choice-grid">
        {question.choices.map((choice) => {
          const chosen = selected === choice;
          const right = checked && correct && chosen;
          const wrong = checked && !correct && chosen;
          return (
            <button
              key={choice}
              type="button"
              className={`text-choice ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
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
        {!checked && <p>เลือกขั้นตอนที่เหมาะสมที่สุด แล้วตรวจคำตอบ</p>}
        {checked && !correct && (
          <p><strong>ลองอีกครั้งนะ:</strong> {question.hint}</p>
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
            {index === chapter2MissingStepQuestions.length - 1
              ? "ไปกิจกรรม 3"
              : "ข้อต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
