import { useMemo, useState } from "react";
import {
  chapter1FlowPieces,
  type FlowBuildPiece,
} from "../../data/chapter1";
import { FlowSymbol } from "../../components/FlowSymbol";
import { validateFlowOrder } from "../chapter1Validation";

export function FlowBuildEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [slots, setSlots] = useState<Array<string | null>>([null, null, null, null]);
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const used = useMemo(
    () => new Set(slots.filter((value): value is string => Boolean(value))),
    [slots],
  );

  const place = (slotIndex: number, pieceId: string) => {
    setChecked(false);
    setPassed(false);
    setSlots((current) => {
      const next = current.map((value) => (value === pieceId ? null : value));
      next[slotIndex] = pieceId;
      return next;
    });
    setSelected(null);
  };

  const pieceById = (pieceId: string | null): FlowBuildPiece | undefined =>
    chapter1FlowPieces.find((piece) => piece.id === pieceId);

  const check = () => {
    const ok = validateFlowOrder(slots);
    setChecked(true);
    setPassed(ok);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker">ACTIVITY 3 / 3 • MINI MISSION</span>
        <h1>ซ่อมผังงานแรก</h1>
        <p>
          เรียงบล็อกทั้ง 4 จากบนลงล่าง เพื่อให้ระบบต้อนรับผู้เล่นกลับมาทำงาน
        </p>
      </div>

      <div className="flow-build-layout">
        <div className="flow-piece-bank">
          <h2>บล็อกคำสั่ง</h2>
          {chapter1FlowPieces.map((piece) => (
            <button
              key={piece.id}
              type="button"
              className={`flow-piece ${selected === piece.id ? "selected" : ""} ${used.has(piece.id) ? "used" : ""}`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", piece.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              onClick={() => setSelected(piece.id)}
            >
              <FlowSymbol symbol={piece.symbol} compact />
              <strong>{piece.label}</strong>
            </button>
          ))}
        </div>

        <div className="flow-canvas" aria-label="พื้นที่สร้างผังงาน">
          {slots.map((pieceId, index) => {
            const piece = pieceById(pieceId);
            const expected = ["เริ่มต้น", "รับข้อมูล", "แสดงผล", "สิ้นสุด"][index];
            const isWrong =
              checked &&
              pieceId !== ["start", "input", "output", "end"][index];

            return (
              <div key={index} className="flow-slot-wrap">
                <button
                  type="button"
                  className={`flow-slot ${piece ? "filled" : ""} ${isWrong ? "wrong" : ""}`}
                  onClick={() => selected && place(index, selected)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const value = event.dataTransfer.getData("text/plain");
                    if (chapter1FlowPieces.some((candidate) => candidate.id === value)) {
                      place(index, value);
                    }
                  }}
                >
                  <span className="slot-number">{index + 1}</span>
                  {piece ? (
                    <span className="slot-piece">
                      <FlowSymbol symbol={piece.symbol} compact />
                      <strong>{piece.label}</strong>
                    </span>
                  ) : (
                    <span className="empty-slot">ขั้นตอนที่ {index + 1} • {expected}</span>
                  )}
                </button>
                {index < slots.length - 1 && <div className="flow-arrow">↓</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>วางให้ครบ 4 ขั้นตอน แล้วตรวจผังงาน</p>}
        {checked && !passed && (
          <p>
            <strong>ยังมีบางขั้นตอนสลับกันอยู่</strong> ลองคิดว่าเกมควร
            “เริ่ม” ก่อน แล้วจึง “รับชื่อ” และ “แสดงข้อความ”
          </p>
        )}
        {passed && (
          <p>
            <strong>✓ สำเร็จ!</strong> ผังงานแรกกลับมาทำงาน และ Symbol Core ปรากฏแล้ว
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
            ตรวจผังงาน
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>
            รับ SYMBOL CORE
          </button>
        )}
      </div>
    </section>
  );
}
