import { useMemo, useState } from "react";
import { conservationCards } from "../../data/chapter4";
import { hasCollectedAllCards } from "../chapter4Validation";

export function ConservationLoopEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [collected, setCollected] = useState<string[]>([]);
  const [showConcept, setShowConcept] = useState(false);

  const count = new Set(collected).size;
  const complete = hasCollectedAllCards(collected, conservationCards.length);

  const remainingCards = useMemo(
    () => conservationCards.filter((card) => !collected.includes(card.id)),
    [collected],
  );

  const collect = (id: string) => {
    if (collected.includes(id)) return;
    setCollected((current) => [...current, id]);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker loop-kicker">ACTIVITY 1 / 3</span>
        <h1>เก็บการ์ดอนุรักษ์ให้ครบ 5 ใบ</h1>
        <p>
          ทำงานเดิมซ้ำทีละรอบ แล้วตรวจทุกครั้งว่า “ครบ 5 ใบหรือยัง?”
        </p>
      </div>

      <div className="loop-counter-panel">
        <div className="loop-counter-ring">
          <strong>{count}</strong>
          <span>/ 5</span>
        </div>
        <div className="loop-counter-copy">
          <span>LOOP COUNTER</span>
          <strong>
            {complete ? "ครบแล้ว — ออกจาก Loop" : "ยังไม่ครบ — ทำซ้ำต่อ"}
          </strong>
        </div>
      </div>

      <div className="loop-trace" aria-label="ลำดับการทำซ้ำ">
        <div className="loop-trace-step process">เก็บการ์ด 1 ใบ</div>
        <div className="loop-trace-arrow">↓</div>
        <div className="loop-trace-step decision">ครบ 5 ใบหรือยัง?</div>
        <div className="loop-trace-branches">
          <span className={!complete ? "active-no" : ""}>
            ไม่ใช่ ↩ ทำซ้ำ
          </span>
          <span className={complete ? "active-yes" : ""}>
            ใช่ → จบ
          </span>
        </div>
      </div>

      <div className="conservation-grid">
        {conservationCards.map((card, index) => {
          const done = collected.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              className={`conservation-card ${done ? "collected" : ""}`}
              disabled={done || complete}
              onClick={() => collect(card.id)}
            >
              <span className="conservation-card-number">
                {done ? "✓" : index + 1}
              </span>
              <span className="conservation-emoji" aria-hidden="true">
                {card.emoji}
              </span>
              <strong>{card.label}</strong>
              <small>{done ? "เก็บแล้ว" : card.note}</small>
            </button>
          );
        })}
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!complete && count === 0 && (
          <p>เริ่มเก็บการ์ดใบแรก แล้วสังเกต Counter 0/5 → 1/5</p>
        )}
        {!complete && count > 0 && (
          <p>
            <strong>รอบที่ {count} สำเร็จ</strong>{" "}
            ยังไม่ครบ 5 ใบ จึงต้องวนกลับไปทำซ้ำอีกครั้ง
          </p>
        )}
        {complete && (
          <p>
            <strong>✓ ครบ 5/5!</strong>{" "}
            ตอนนี้เงื่อนไขเป็นจริง จึงออกจาก Loop ได้
          </p>
        )}
      </div>

      <div className="engine-actions">
        {complete && !showConcept && (
          <button
            className="btn btn-primary"
            onClick={() => setShowConcept(true)}
          >
            ดูหลักการ Loop
          </button>
        )}

        {complete && showConcept && (
          <div className="loop-concept-summary">
            <strong>ทำซ้ำ + ตรวจเงื่อนไข + จุดหยุด</strong>
            <p>
              ในภารกิจนี้ เราเก็บการ์ดทีละใบและตรวจ “ครบ 5 ใบหรือยัง?”
              จนกว่าคำตอบจะเป็น “ใช่”
            </p>
            <button className="btn btn-primary" onClick={onComplete}>
              ไปกิจกรรม 2
            </button>
          </div>
        )}
      </div>

      {remainingCards.length === 0 && <span className="sr-only">เก็บครบทุกใบแล้ว</span>}
    </section>
  );
}
