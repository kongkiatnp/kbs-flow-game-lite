import { useState } from "react";
import {
  chapter1ChoiceQuestions,
  flowSymbols,
  type FlowSymbolId,
} from "../../data/chapter1";
import { FlowSymbol } from "../../components/FlowSymbol";
import { isChoiceCorrect } from "../chapter1Validation";

export function SymbolChoiceEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<FlowSymbolId | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = chapter1ChoiceQuestions[questionIndex];

  const check = () => {
    if (!selected) return;
    const ok = isChoiceCorrect(selected, question.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (questionIndex === chapter1ChoiceQuestions.length - 1) {
      onComplete();
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
    setCorrect(false);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker">ACTIVITY 2 / 3</span>
        <h1>สถานการณ์นี้ใช้สัญลักษณ์อะไร?</h1>
        <p>อ่านสถานการณ์ แล้วเลือกสัญลักษณ์ที่เหมาะสมที่สุด</p>
      </div>

      <div className="question-status">
        ข้อ {questionIndex + 1} / {chapter1ChoiceQuestions.length}
        <div className="mini-progress">
          {chapter1ChoiceQuestions.map((item, index) => (
            <span key={item.id} className={index <= questionIndex ? "active" : ""} />
          ))}
        </div>
      </div>

      <div className="situation-card">
        <span>สถานการณ์</span>
        <strong>{question.prompt}</strong>
      </div>

      <div className="choice-grid">
        {flowSymbols
          .filter((item) => item.id !== "ARROW")
          .map((item) => {
            const chosen = selected === item.id;
            const right = checked && correct && chosen;
            const wrong = checked && !correct && chosen;
            return (
              <button
                key={item.id}
                type="button"
                className={`choice-symbol ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
                onClick={() => {
                  if (correct) return;
                  setSelected(item.id);
                  setChecked(false);
                }}
              >
                <FlowSymbol symbol={item.id} />
                <strong>{item.label}</strong>
              </button>
            );
          })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>เลือกคำตอบ แล้วกด “ตรวจคำตอบ”</p>}
        {checked && !correct && (
          <p><strong>ลองสังเกตอีกนิด:</strong> {question.hint}</p>
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
            {questionIndex === chapter1ChoiceQuestions.length - 1
              ? "ไปกิจกรรม 3"
              : "ข้อต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
