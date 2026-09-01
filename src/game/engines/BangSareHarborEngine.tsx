import { useState } from "react";
import {
  bangSareHarborAnswer,
  bangSareHarborItems,
} from "../../data/chapter2";
import { SequenceBoard } from "../../components/SequenceBoard";
import { validateExactOrder } from "../chapter2Validation";

export function BangSareHarborEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [slots, setSlots] = useState<Array<string | null>>([null, null, null, null]);
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const place = (index: number, id: string) => {
    setChecked(false);
    setPassed(false);
    setSlots((current) => {
      const next = current.map((value) => (value === id ? null : value));
      next[index] = id;
      return next;
    });
    setSelected(null);
  };

  const check = () => {
    const ok = validateExactOrder(slots, bangSareHarborAnswer);
    setChecked(true);
    setPassed(ok);
  };

  return (
    <section className="real-engine harbor-engine">
      <div className="mission-heading">
        <span className="mission-kicker">ACTIVITY 3 / 3 • HARBOR MISSION</span>
        <h1>กู้ระบบท่าเรือบางเสร่</h1>
        <p>
          พายุ GLITCH ทำให้คำสั่งท่าเรือสลับกัน
          เรียงขั้นตอนใหม่เพื่อให้เรือออกเดินทางอย่างถูกลำดับ
        </p>
      </div>

      <div className={`harbor-scene ${passed ? "harbor-online" : ""}`}>
        <div className="harbor-sky">☁️　☀️　☁️</div>
        <div className="harbor-village">🏠 🏠　🎣　🏠</div>
        <div className="harbor-water">≈ ≈ ≈　⛵　≈ ≈ ≈</div>
        <div className="harbor-status">
          {passed ? "SEQUENCE SYSTEM: ONLINE ✓" : "SEQUENCE SYSTEM: GLITCH"}
        </div>
      </div>

      <SequenceBoard
        items={bangSareHarborItems}
        slots={slots}
        selected={selected}
        checked={checked}
        expected={bangSareHarborAnswer}
        onSelect={(id) => {
          setSelected(id);
          setChecked(false);
        }}
        onPlace={place}
      />

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>คิดว่าอะไรต้องเกิดก่อนเรือจะออกจากท่า?</p>}
        {checked && !passed && (
          <p>
            <strong>ระบบยังไม่พร้อมออกเรือ</strong>
            {" "}เริ่มจากรับภารกิจ แล้วตรวจอุปกรณ์ก่อนเตรียมเรือ
          </p>
        )}
        {passed && (
          <p>
            <strong>✓ ระบบท่าเรือกลับมาทำงานแล้ว!</strong>
            {" "}ลำดับถูกต้องและ Sequence Core ปรากฏขึ้น
          </p>
        )}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={slots.some((value) => value === null)}
          >
            เปิดระบบท่าเรือ
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>
            รับ SEQUENCE CORE
          </button>
        )}
      </div>
    </section>
  );
}
