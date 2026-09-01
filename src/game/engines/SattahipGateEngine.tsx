import { useMemo, useState } from "react";
import { sattahipGateAnswer, sattahipGatePieces, type GateStepId } from "../../data/chapter3";
import { validateGateAssignments } from "../chapter3Validation";

type Assignments = Record<string, GateStepId | undefined>;
const slotDefs = [
  { id: "start", label: "จุดเริ่มต้น" },
  { id: "decision", label: "คำถาม Decision" },
  { id: "yes", label: "ทาง ใช่" },
  { id: "no", label: "ทาง ไม่ใช่" },
  { id: "end", label: "จุดสิ้นสุด" },
];

export function SattahipGateEngine({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<GateStepId | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const used = useMemo(() => new Set(Object.values(assignments).filter(Boolean)), [assignments]);
  const pieceById = (id?: GateStepId) => sattahipGatePieces.find((piece) => piece.id === id);

  const assign = (slotId: string, pieceId: GateStepId) => {
    setChecked(false);
    setPassed(false);
    setAssignments((current) => {
      const next = { ...current };
      for (const [key, value] of Object.entries(next)) {
        if (value === pieceId) next[key] = undefined;
      }
      next[slotId] = pieceId;
      return next;
    });
    setSelected(null);
  };

  const check = () => {
    const ok = validateGateAssignments(assignments);
    setChecked(true);
    setPassed(ok);
  };

  return (
    <section className="real-engine gate-engine">
      <div className="mission-heading">
        <span className="mission-kicker decision-kicker">ACTIVITY 3 / 3 • DECISION GATE</span>
        <h1>เปิดประตูพลังงานสัตหีบ</h1>
        <p>วางองค์ประกอบให้ครบ แล้วตรวจว่าเส้นทาง “ใช่ / ไม่ใช่” ตรงกับเงื่อนไข</p>
      </div>

      <div className={`sattahip-bay-scene ${passed ? "gate-open" : ""}`}>
        <div className="bay-sky">☁️　☀️　☁️</div>
        <div className="bay-landmark">🌴　🗼　🌴</div>
        <div className="bay-water">≈ ≈ ≈　⛵　≈ ≈ ≈</div>
        <div className="energy-gate" aria-hidden="true"><div className="gate-ring">{passed ? "OPEN" : "LOCK"}</div></div>
        <div className="gate-status">{passed ? "DECISION GATE: OPEN ✓" : "DECISION GATE: WAITING"}</div>
      </div>

      <div className="gate-builder">
        <section className="gate-piece-bank">
          <h2>บัตรคำสั่ง</h2>
          {sattahipGatePieces.map((piece) => (
            <button
              key={piece.id}
              type="button"
              draggable
              className={`gate-piece ${selected === piece.id ? "selected" : ""} ${used.has(piece.id) ? "used" : ""}`}
              onClick={() => { setSelected(piece.id); setChecked(false); }}
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", piece.id);
                event.dataTransfer.effectAllowed = "move";
              }}
            >
              <span aria-hidden="true">{piece.emoji}</span>
              <strong>{piece.label}</strong>
            </button>
          ))}
        </section>

        <section className="gate-flow-canvas">
          <GateSlot slotId="start" label="จุดเริ่มต้น" piece={pieceById(assignments.start)} selected={selected} wrong={checked && assignments.start !== sattahipGateAnswer.start} onAssign={assign} />
          <div className="gate-down">↓</div>
          <GateSlot slotId="decision" label="คำถาม Decision" piece={pieceById(assignments.decision)} selected={selected} wrong={checked && assignments.decision !== sattahipGateAnswer.decision} onAssign={assign} />
          <div className="gate-branch-caption"><span className="yes-caption">ใช่ ↙</span><span className="no-caption">↘ ไม่ใช่</span></div>
          <div className="gate-branches">
            <GateSlot slotId="yes" label="ทาง ใช่" piece={pieceById(assignments.yes)} selected={selected} wrong={checked && assignments.yes !== sattahipGateAnswer.yes} onAssign={assign} />
            <GateSlot slotId="no" label="ทาง ไม่ใช่" piece={pieceById(assignments.no)} selected={selected} wrong={checked && assignments.no !== sattahipGateAnswer.no} onAssign={assign} />
          </div>
          <div className="gate-merge-arrow">↘　↙</div>
          <GateSlot slotId="end" label="จุดสิ้นสุด" piece={pieceById(assignments.end)} selected={selected} wrong={checked && assignments.end !== sattahipGateAnswer.end} onAssign={assign} />
        </section>
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>วางบัตรทั้ง 5 ใบให้ครบ แล้วเปิดระบบตรวจสอบประตู</p>}
        {checked && !passed && <p><strong>ประตูยังไม่เปิด</strong> ตรวจว่า “มี Logic Key หรือไม่?” ต้องเป็น Decision และทางใช่ต้อง “เปิดประตู”</p>}
        {passed && <p><strong>✓ ประตูพลังงานเปิดแล้ว!</strong> Decision Core ปรากฏและเส้นทางสู่แสมสารถูกปลดล็อก</p>}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button className="btn btn-primary" onClick={check} disabled={Object.values(assignments).filter(Boolean).length < 5}>เปิดระบบตรวจสอบประตู</button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>รับ DECISION CORE</button>
        )}
      </div>
    </section>
  );
}

function GateSlot({
  slotId,
  label,
  piece,
  selected,
  wrong,
  onAssign,
}: {
  slotId: string;
  label: string;
  piece?: (typeof sattahipGatePieces)[number];
  selected: GateStepId | null;
  wrong: boolean;
  onAssign: (slotId: string, pieceId: GateStepId) => void;
}) {
  return (
    <button
      type="button"
      className={`gate-slot ${piece ? "filled" : ""} ${wrong ? "wrong" : ""}`}
      onClick={() => selected && onAssign(slotId, selected)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain") as GateStepId;
        if (sattahipGatePieces.some((candidate) => candidate.id === id)) onAssign(slotId, id);
      }}
    >
      <small>{label}</small>
      {piece ? (
        <span className="gate-slot-piece"><span aria-hidden="true">{piece.emoji}</span><strong>{piece.label}</strong></span>
      ) : (
        <span className="empty-slot">แตะหรือลากบัตรมาวาง</span>
      )}
    </button>
  );
}
