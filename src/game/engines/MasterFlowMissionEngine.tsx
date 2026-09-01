import { useMemo, useState } from "react";
import {
  masterFlowAnswer,
  masterFlowPieces,
  type MasterPieceId,
} from "../../data/chapter5";
import { validateMasterFlow } from "../chapter5Validation";

type Assignments = Record<string, MasterPieceId | undefined>;

const slotCount = 7;

export function MasterFlowMissionEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<MasterPieceId | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const used = useMemo(
    () => new Set(Object.values(assignments).filter(Boolean)),
    [assignments],
  );

  const assign = (slotId: string, pieceId: MasterPieceId) => {
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

  const pieceById = (id?: MasterPieceId) =>
    masterFlowPieces.find((piece) => piece.id === id);

  const check = () => {
    const ok = validateMasterFlow(assignments);
    setChecked(true);
    setPassed(ok);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker master-kicker">
          ACTIVITY 2 / 3 • MASTER FLOW MISSION
        </span>
        <h1>เปิดศูนย์บัญชาการโรงเรียนบ้านเขาบายศรี</h1>
        <p>
          รวม Symbols + Sequence + Decision + Loop
          เพื่อสร้างผังงานกู้พลัง FLOW CORE
        </p>
      </div>

      <div className={`school-command-scene ${passed ? "command-online" : ""}`}>
        <div className="school-sky">☁️　☀️　☁️</div>
        <div className="school-building">
          <span>🇹🇭</span>
          <strong>โรงเรียนบ้านเขาบายศรี</strong>
          <span>🏫</span>
        </div>
        <div className="school-ground">🌳　🌿　🧒　🤖　🌿　🌳</div>
        <div className="command-status">
          {passed ? "FLOW COMMAND: ONLINE ✓" : "FLOW COMMAND: LOCKED"}
        </div>
      </div>

      <div className="master-builder">
        <section className="master-piece-bank">
          <h2>บัตร Flow</h2>
          {masterFlowPieces.map((piece) => (
            <button
              key={piece.id}
              type="button"
              draggable
              className={`master-piece ${selected === piece.id ? "selected" : ""} ${used.has(piece.id) ? "used" : ""}`}
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

        <section className="master-flow-canvas">
          <MasterSlot
            slotId="start"
            label="Start / End"
            piece={pieceById(assignments.start)}
            selected={selected}
            wrong={checked && assignments.start !== masterFlowAnswer.start}
            onAssign={assign}
          />
          <div className="master-arrow">↓</div>

          <MasterSlot
            slotId="input"
            label="Input / Output"
            piece={pieceById(assignments.input)}
            selected={selected}
            wrong={checked && assignments.input !== masterFlowAnswer.input}
            onAssign={assign}
          />
          <div className="master-arrow">↓</div>

          <MasterSlot
            slotId="process"
            label="Process"
            piece={pieceById(assignments.process)}
            selected={selected}
            wrong={checked && assignments.process !== masterFlowAnswer.process}
            onAssign={assign}
          />
          <div className="master-arrow">↓</div>

          <MasterSlot
            slotId="decision"
            label="Decision"
            piece={pieceById(assignments.decision)}
            selected={selected}
            wrong={checked && assignments.decision !== masterFlowAnswer.decision}
            onAssign={assign}
            decision
          />

          <div className="master-branch-labels">
            <span>ไม่ใช่ ↙</span>
            <span>↘ ใช่</span>
          </div>

          <div className="master-branches">
            <MasterSlot
              slotId="no"
              label="Loop Back"
              piece={pieceById(assignments.no)}
              selected={selected}
              wrong={checked && assignments.no !== masterFlowAnswer.no}
              onAssign={assign}
            />
            <MasterSlot
              slotId="yes"
              label="Output"
              piece={pieceById(assignments.yes)}
              selected={selected}
              wrong={checked && assignments.yes !== masterFlowAnswer.yes}
              onAssign={assign}
            />
          </div>

          <div className="master-return">
            <span>↖ ทำซ้ำ “เก็บ Logic Fragment 1 ชิ้น”</span>
            <span>ไปต่อ ↓</span>
          </div>

          <MasterSlot
            slotId="end"
            label="Start / End"
            piece={pieceById(assignments.end)}
            selected={selected}
            wrong={checked && assignments.end !== masterFlowAnswer.end}
            onAssign={assign}
          />
        </section>
      </div>

      <div className="master-domain-summary">
        <span>◯ START/END</span>
        <span>▱ INPUT/OUTPUT</span>
        <span>▭ PROCESS</span>
        <span>◇ DECISION</span>
        <span>↻ LOOP</span>
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && (
          <p>วางให้ครบ 7 จุด แล้วตรวจ Master Flow</p>
        )}
        {checked && !passed && (
          <p>
            <strong>Flow ยังไม่สมบูรณ์</strong>{" "}
            จำไว้ว่าเมื่อ “ยังไม่ครบ 3 ชิ้น” ต้องวนกลับไปเก็บอีก
            และเมื่อครบแล้วจึงแสดงผลก่อน END
          </p>
        )}
        {passed && (
          <p>
            <strong>✓ Master Flow พร้อม!</strong>{" "}
            Symbols, Sequence, Decision และ Loop ทำงานร่วมกันถูกต้อง
          </p>
        )}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={Object.values(assignments).filter(Boolean).length < slotCount}
          >
            ตรวจ Master Flow
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>
            เข้าสู่ Final Challenge
          </button>
        )}
      </div>
    </section>
  );
}

function MasterSlot({
  slotId,
  label,
  piece,
  selected,
  wrong,
  onAssign,
  decision = false,
}: {
  slotId: string;
  label: string;
  piece?: (typeof masterFlowPieces)[number];
  selected: MasterPieceId | null;
  wrong: boolean;
  onAssign: (slotId: string, pieceId: MasterPieceId) => void;
  decision?: boolean;
}) {
  return (
    <button
      type="button"
      className={`master-slot ${piece ? "filled" : ""} ${wrong ? "wrong" : ""} ${decision ? "decision-slot" : ""}`}
      onClick={() => selected && onAssign(slotId, selected)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain") as MasterPieceId;
        if (masterFlowPieces.some((candidate) => candidate.id === id)) {
          onAssign(slotId, id);
        }
      }}
    >
      <small>{label}</small>
      {piece ? (
        <span className="master-slot-piece">
          <span aria-hidden="true">{piece.emoji}</span>
          <strong>{piece.label}</strong>
        </span>
      ) : (
        <span className="empty-slot">แตะหรือลากบัตรมาวาง</span>
      )}
    </button>
  );
}
