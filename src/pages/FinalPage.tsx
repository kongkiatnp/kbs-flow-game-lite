import { useState } from "react";
import { useGame } from "../state/GameContext";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";
import {
  FINAL_PASS_SCORE,
  finalQuestions,
} from "../data/chapter5";
import { isFinalPass } from "../game/chapter5Validation";

export function FinalPage() {
  const { state, dispatch } = useGame();
  const save = state.save;

  if (!save || save.unlockedChapter < 5 || save.chapterProgress[5] < 2) {
    go("/map");
    return null;
  }

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = finalQuestions[questionIndex];
  const selectedCorrect = selected === question.correct;

  const check = () => {
    if (!selected || checked) return;
    setChecked(true);
    if (selected === question.correct) {
      setScore((current) => current + 1);
    }
  };

  const next = () => {
    if (questionIndex === finalQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelected(null);
    setChecked(false);
  };

  const finalScore = score;
  const passed = isFinalPass(finalScore);

  const retry = () => {
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  const finishGame = () => {
    if (!passed) return;
    dispatch({ type: "COMPLETE_FINAL" });
    go("/ending");
  };

  if (finished) {
    return (
      <main className="page final-page chapter-purple">
        <Hud />
        <section className={`final-result-card ${passed ? "pass" : "retry"}`}>
          <div className="final-result-core" aria-hidden="true">
            {passed ? "💎" : "🤖"}
          </div>
          <span className="eyebrow">MASTER FLOW CHALLENGE</span>
          <h1>{passed ? "MISSION COMPLETE!" : "เกือบสำเร็จแล้ว!"}</h1>
          <div className="final-score">
            <strong>{finalScore}</strong>
            <span>/ 10</span>
          </div>
          <p>
            {passed
              ? `ผ่านเกณฑ์ ${FINAL_PASS_SCORE}/10 แล้ว Master Core พร้อมรวมพลัง!`
              : `ต้องได้อย่างน้อย ${FINAL_PASS_SCORE}/10 ลองทบทวนแล้วกลับมาท้าทายใหม่ได้เสมอ`}
          </p>

          {passed ? (
            <button className="btn btn-primary" onClick={finishGame}>
              รวม FLOW CORE และดูฉากจบ
            </button>
          ) : (
            <div className="button-row">
              <button className="btn btn-primary" onClick={retry}>
                ลอง Final อีกครั้ง
              </button>
              <button className="btn btn-ghost" onClick={() => go("/chapter/5")}>
                กลับไปทบทวน
              </button>
            </div>
          )}
        </section>
        <KbsAi
          mood={passed ? "celebrate" : "hint"}
          message={
            passed
              ? "ยอดเยี่ยม! เราได้ Master Core แล้ว ไปคืนพลัง FLOW CORE กัน!"
              : "ไม่เป็นไรนะ ลองดูว่าข้อไหนใช้ Symbol, Sequence, Decision หรือ Loop แล้วกลับมาลองใหม่"
          }
        />
      </main>
    );
  }

  return (
    <main className="page final-page chapter-purple">
      <Hud />
      <section className="final-card real-final-card">
        <div className="final-header">
          <div>
            <span className="eyebrow">ACTIVITY 3 / 3</span>
            <h1>MASTER FLOW CHALLENGE</h1>
            <p>10 ข้อ • ผ่านเมื่อได้อย่างน้อย 8/10</p>
          </div>
          <div className="final-live-score">
            <small>คะแนนขณะนี้</small>
            <strong>{score}</strong>
          </div>
        </div>

        <div className="final-progress-row" aria-label={`ข้อ ${questionIndex + 1} จาก 10`}>
          {finalQuestions.map((item, index) => (
            <span
              key={item.id}
              className={
                index < questionIndex
                  ? "done"
                  : index === questionIndex
                    ? "current"
                    : ""
              }
            >
              {index + 1}
            </span>
          ))}
        </div>

        <div className="final-domain-badge">{question.domain}</div>

        <div className="final-question-box">
          <small>ข้อ {questionIndex + 1} / 10</small>
          <strong>{question.prompt}</strong>
        </div>

        <div className="final-choice-list">
          {question.choices.map((choice, index) => {
            const chosen = selected === choice;
            const right = checked && choice === question.correct;
            const wrong = checked && chosen && !selectedCorrect;

            return (
              <button
                key={choice}
                type="button"
                className={`final-choice ${chosen ? "selected" : ""} ${right ? "right" : ""} ${wrong ? "wrong" : ""}`}
                disabled={checked}
                onClick={() => setSelected(choice)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <strong>{choice}</strong>
              </button>
            );
          })}
        </div>

        <div className="engine-feedback" aria-live="polite">
          {!checked && <p>เลือก 1 คำตอบ แล้วกดตรวจคำตอบ</p>}
          {checked && selectedCorrect && (
            <p><strong>✓ ถูกต้อง!</strong> {question.explanation}</p>
          )}
          {checked && !selectedCorrect && (
            <p>
              <strong>คำตอบที่ถูกคือ “{question.correct}”</strong>{" "}
              {question.explanation}
            </p>
          )}
        </div>

        <div className="engine-actions">
          {!checked ? (
            <button
              className="btn btn-primary"
              onClick={check}
              disabled={!selected}
            >
              ตรวจคำตอบ
            </button>
          ) : (
            <button className="btn btn-primary" onClick={next}>
              {questionIndex === finalQuestions.length - 1
                ? "ดูผล Final"
                : "ข้อต่อไป"}
            </button>
          )}
        </div>
      </section>

      <KbsAi
        mood="hint"
        message="Final จะนับคะแนนรอบนี้เท่านั้น ไม่เก็บประวัติคะแนน ตอบทีละข้อแล้วไปต่อได้เลย"
      />
    </main>
  );
}
