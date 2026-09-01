import { useState } from "react";
import { chapter3DecisionQuestions } from "../../data/chapter3";
import { DecisionDiagram } from "../../components/DecisionDiagram";
import { isDecisionQuestionCorrect } from "../chapter3Validation";

export function DecisionQuestionEngine({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const question = chapter3DecisionQuestions[index];

  const check = () => {
    if (!selected) return;
    const ok = isDecisionQuestionCorrect(selected, question.correct);
    setChecked(true);
    setCorrect(ok);
  };

  const next = () => {
    if (index === chapter3DecisionQuestions.length - 1) {
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
        <span className="mission-kicker decision-kicker">ACTIVITY 2 / 3</span>
        <h1>เติมคำถามใน Decision</h1>
        <p>ดูผลลัพธ์ทาง “ใช่” และ “ไม่ใช่” แล้วเลือกคำถามที่เหมาะกับ Decision</p>
      </div>

      <div className="question-status">
        ข้อ {index + 1} / {chapter3DecisionQuestions.length}
        <div className="mini-progress">
          {chapter3DecisionQuestions.map((item, qIndex) => (
            <span key={item.id} className={qIndex <= index ? "active decision-active" : ""} />
          ))}
        </div>
      </div>

      <DecisionDiagram question="?" yesResult={question.yesResult} noResult={question.noResult} />

      <div className="decision-question-choices">
        {question.choices.map((choice) => {
          const chosen = selected === choice;
          const right = checked && correct && chosen;
          const wrong = checked && !correct && chosen;
          return (
            <button
              key={choice}
              type="button"
              className={`decision-text-choice ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
              onClick={() => {
                if (correct) return;
                setSelected(choice);
                setChecked(false);
              }}
            >
              <span className="mini-diamond" aria-hidden="true">◇</span>
              <strong>{choice}</strong>
            </button>
          );
        })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>เลือกคำถามที่เชื่อมโยงกับผลลัพธ์ทั้งสองทาง</p>}
        {checked && !correct && <p><strong>ลองมองผลลัพธ์อีกครั้ง:</strong> {question.hint}</p>}
        {checked && correct && <p><strong>✓ {question.explanation}</strong></p>}
      </div>

      <div className="engine-actions">
        {!correct ? (
          <button className="btn btn-primary" onClick={check} disabled={!selected}>ตรวจคำตอบ</button>
        ) : (
          <button className="btn btn-primary" onClick={next}>
            {index === chapter3DecisionQuestions.length - 1 ? "ไปกิจกรรม 3" : "ข้อต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
