import { useMemo, useState } from "react";
import {
  flowSymbols,
  type FlowSymbolId,
} from "../../data/chapter1";
import { FlowSymbol } from "../../components/FlowSymbol";
import { validateSymbolMatches } from "../chapter1Validation";

type Assignments = Record<string, FlowSymbolId | undefined>;

export function MatchSymbolsEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<FlowSymbolId | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const assignedSymbols = useMemo(
    () => new Set(Object.values(assignments).filter(Boolean)),
    [assignments],
  );

  const assign = (targetId: FlowSymbolId, symbolId: FlowSymbolId) => {
    setChecked(false);
    setPassed(false);
    setAssignments((current) => {
      const next = { ...current };
      for (const [key, value] of Object.entries(next)) {
        if (value === symbolId) next[key] = undefined;
      }
      next[targetId] = symbolId;
      return next;
    });
    setSelected(null);
  };

  const check = () => {
    const ok = validateSymbolMatches(assignments);
    setChecked(true);
    setPassed(ok);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker">ACTIVITY 1 / 3</span>
        <h1>จับคู่สัญลักษณ์กับความหมาย</h1>
        <p>
          ลากสัญลักษณ์ไปวาง หรือแตะสัญลักษณ์แล้วแตะช่องความหมายที่ตรงกัน
        </p>
      </div>

      <div className="match-layout">
        <div className="symbol-bank" aria-label="สัญลักษณ์ที่เลือกได้">
          <h2>สัญลักษณ์</h2>
          {flowSymbols.map((item) => {
            const used = assignedSymbols.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`symbol-card ${selected === item.id ? "selected" : ""} ${used ? "used" : ""}`}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", item.id);
                  event.dataTransfer.effectAllowed = "move";
                }}
                onClick={() => setSelected(item.id)}
                aria-pressed={selected === item.id}
              >
                <FlowSymbol symbol={item.id} />
                <strong>{item.shortLabel}</strong>
                <small>{used ? "วางแล้ว • แตะเพื่อย้าย" : "แตะหรือลาก"}</small>
              </button>
            );
          })}
        </div>

        <div className="meaning-bank">
          <h2>ความหมาย</h2>
          {flowSymbols.map((target) => {
            const assigned = assignments[target.id];
            const isWrong = checked && assigned !== target.id;
            const isRight = checked && assigned === target.id;
            const assignedDef = flowSymbols.find((x) => x.id === assigned);

            return (
              <button
                key={target.id}
                type="button"
                className={`meaning-target ${isWrong ? "wrong" : ""} ${isRight ? "right" : ""}`}
                onClick={() => selected && assign(target.id, selected)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const value = event.dataTransfer.getData("text/plain") as FlowSymbolId;
                  if (flowSymbols.some((item) => item.id === value)) {
                    assign(target.id, value);
                  }
                }}
              >
                <span className="target-copy">{target.meaning}</span>
                <span className="target-slot">
                  {assignedDef ? (
                    <>
                      <FlowSymbol symbol={assignedDef.id} compact />
                      <strong>{assignedDef.shortLabel}</strong>
                    </>
                  ) : (
                    <span className="empty-slot">วางสัญลักษณ์ที่นี่</span>
                  )}
                </span>
                {isWrong && <small className="inline-hint">{target.hint}</small>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="engine-feedback" aria-live="polite">
        {!checked && (
          <p>จับคู่ให้ครบทั้ง 5 สัญลักษณ์ แล้วกด “ตรวจคำตอบ”</p>
        )}
        {checked && !passed && (
          <p><strong>ลองอีกครั้งนะ</strong> KBS-AI ทำเครื่องหมายช่องที่ควรตรวจดูให้แล้ว</p>
        )}
        {passed && (
          <p><strong>✓ เยี่ยมมาก!</strong> Symbol Library กลับมาออนไลน์แล้ว</p>
        )}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={Object.values(assignments).filter(Boolean).length < 5}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onComplete}>
            ไปกิจกรรม 2
          </button>
        )}
      </div>
    </section>
  );
}
