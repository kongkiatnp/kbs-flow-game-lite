import { useMemo, useState } from "react";
import {
  samaesanLoopAnswer,
  samaesanLoopPieces,
  type LoopPieceId,
} from "../../data/chapter4";
import { validateLoopAssignments } from "../chapter4Validation";

type Assignments = Record<string, LoopPieceId | undefined>;

const flowSlots = [
  { id: "start", label: "จุดเริ่มต้น" },
  { id: "process", label: "สิ่งที่ทำซ้ำ" },
  { id: "decision", label: "เงื่อนไขตรวจสอบ" },
  { id: "no", label: "ทาง ไม่ใช่ — ทำซ้ำ" },
  { id: "yes", label: "ทาง ใช่ — ออกจาก Loop" },
  { id: "end", label: "จุดสิ้นสุด" },
];

export function SamaesanRobotLoopEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<LoopPieceId | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const used = useMemo(
    () => new Set(Object.values(assignments).filter(Boolean)),
    [assignments],
  );

  const assign = (slotId: string, pieceId: LoopPieceId) => {
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
    const ok = validateLoopAssignments(assignments);
    setChecked(true);
    setPassed(ok);
  };

  const pieceById = (id?: LoopPieceId) =>
    samaesanLoopPieces.find((piece) => piece.id === id);

  return (
    <section className="real-engine robot-loop-engine">
      <div className="mission-heading">
        <span className="mission-kicker loop-kicker">
          ACTIVITY 3 / 3 • LOOP REPAIR
        </span>
        <h1>ซ่อมหุ่นยนต์แสมสาร</h1>
        <p>
          หุ่นยนต์ต้องเก็บการ์ดซ้ำจนกว่าจะครบ 5 ใบ
          วาง Flow ให้มีเส้นทางวนกลับและเงื่อนไขออกจาก Loop
        </p>
      </div>

      <div className={`samaesan-ocean-scene ${passed ? "robot-online" : ""}`}>
        <div className="samaesan-sky">☁️　☀️　☁️</div>
        <div className="samaesan-islands">⛰️　🌴　⛰️</div>
        <div className="samaesan-sea">≈ 🐠 ≈ 🐢 ≈ 🪸 ≈</div>
        <div className="sea-robot" aria-hidden="true">
          <span>🤖</span>
          <strong>{passed ? "ONLINE" : "LOOP?"}</strong>
        </div>
        <div className="robot-status">
          {passed ? "LOOP SYSTEM: STABLE ✓" : "LOOP SYSTEM: NEEDS REPAIR"}
        </div>
      </div>

      <div className="loop-builder">
        <section className="loop-piece-bank">
          <h2>บัตร Flow</h2>
          {samaesanLoopPieces.map((piece) => (
            <button
              key={piece.id}
              type="button"
              draggable
              className={`loop-piece ${selected === piece.id ? "selected" : ""} ${used.has(piece.id) ? "used" : ""}`}
              onClick={() => {
                setSelected(piece.id);
                setChecked(false);
              }}
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

        <section className="loop-flow-canvas">
          <LoopSlot
            slotId="start"
            label="จุดเริ่มต้น"
            piece={pieceById(assignments.start)}
            selected={selected}
            wrong={checked && assignments.start !== samaesanLoopAnswer.start}
            onAssign={assign}
          />
          <div className="loop-down">↓</div>

          <LoopSlot
            slotId="process"
            label="สิ่งที่ทำซ้ำ"
            piece={pieceById(assignments.process)}
            selected={selected}
            wrong={checked && assignments.process !== samaesanLoopAnswer.process}
            onAssign={assign}
          />
          <div className="loop-down">↓</div>

          <LoopSlot
            slotId="decision"
            label="เงื่อนไข"
            piece={pieceById(assignments.decision)}
            selected={selected}
            wrong={checked && assignments.decision !== samaesanLoopAnswer.decision}
            onAssign={assign}
            diamond
          />

          <div className="loop-branch-labels">
            <span className="no-label">ไม่ใช่ ↙</span>
            <span className="yes-label">↘ ใช่</span>
          </div>

          <div className="loop-branch-slots">
            <LoopSlot
              slotId="no"
              label="ทำซ้ำ"
              piece={pieceById(assignments.no)}
              selected={selected}
              wrong={checked && assignments.no !== samaesanLoopAnswer.no}
              onAssign={assign}
            />
            <LoopSlot
              slotId="yes"
              label="ออกจาก Loop"
              piece={pieceById(assignments.yes)}
              selected={selected}
              wrong={checked && assignments.yes !== samaesanLoopAnswer.yes}
              onAssign={assign}
            />
          </div>

          <div className="loop-return-visual">
            <span>↖ กลับไป “เก็บการ์ด 1 ใบ”</span>
            <span>ไปต่อ ↓</span>
          </div>

          <LoopSlot
            slotId="end"
            label="จุดสิ้นสุด"
            piece={pieceById(assignments.end)}
            selected={selected}
            wrong={checked && assignments.end !== samaesanLoopAnswer.end}
            onAssign={assign}
          />
        </section>
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && (
          <p>
            จุดสำคัญคือ “ไม่ใช่” ต้องวนกลับไปทำงานเดิม
            ส่วน “ใช่” จึงออกจาก Loop
          </p>
        )}
        {checked && !passed && (
          <p>
            <strong>หุ่นยนต์ยังวนไม่ถูกทาง</strong>{" "}
            ตรวจว่าเงื่อนไขคือ “ครบ 5 ใบหรือยัง?” และทาง “ไม่ใช่”
            ต้องย้อนกลับไปเก็บต่อ
          </p>
        )}
        {passed && (
          <p>
            <strong>✓ ซ่อม Loop สำเร็จ!</strong>{" "}
            หุ่นยนต์ทำซ้ำจนถึงเป้าหมายและหยุดได้ถูกจังหวะ
          </p>
        )}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={Object.values(assignments).filter(Boolean).length < flowSlots.length}
          >
            ทดสอบ Loop
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>
            รับ LOOP CORE
          </button>
        )}
      </div>
    </section>
  );
}

function LoopSlot({
  slotId,
  label,
  piece,
  selected,
  wrong,
  onAssign,
  diamond = false,
}: {
  slotId: string;
  label: string;
  piece?: (typeof samaesanLoopPieces)[number];
  selected: LoopPieceId | null;
  wrong: boolean;
  onAssign: (slotId: string, pieceId: LoopPieceId) => void;
  diamond?: boolean;
}) {
  return (
    <button
      type="button"
      className={`loop-slot ${piece ? "filled" : ""} ${wrong ? "wrong" : ""} ${diamond ? "diamond-slot" : ""}`}
      onClick={() => selected && onAssign(slotId, selected)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain") as LoopPieceId;
        if (samaesanLoopPieces.some((candidate) => candidate.id === id)) {
          onAssign(slotId, id);
        }
      }}
    >
      <small>{label}</small>
      {piece ? (
        <span className="loop-slot-piece">
          <span aria-hidden="true">{piece.emoji}</span>
          <strong>{piece.label}</strong>
        </span>
      ) : (
        <span className="empty-slot">แตะหรือลากบัตรมาวาง</span>
      )}
    </button>
  );
}
