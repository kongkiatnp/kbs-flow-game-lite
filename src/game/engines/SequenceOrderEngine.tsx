import { useState } from "react";
import { chapter2SequenceScenarios } from "../../data/chapter2";
import { SequenceBoard } from "../../components/SequenceBoard";
import { validateExactOrder } from "../chapter2Validation";

export function SequenceOrderEngine({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [slots, setSlots] = useState<Array<string | null>>([null, null, null, null]);
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const scenario = chapter2SequenceScenarios[scenarioIndex];

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
    const ok = validateExactOrder(slots, scenario.answer);
    setChecked(true);
    setPassed(ok);
  };

  const nextScenario = () => {
    if (scenarioIndex === chapter2SequenceScenarios.length - 1) {
      onComplete();
      return;
    }
    setScenarioIndex((value) => value + 1);
    setSelected(null);
    setSlots([null, null, null, null]);
    setChecked(false);
    setPassed(false);
  };

  return (
    <section className="real-engine">
      <div className="mission-heading">
        <span className="mission-kicker">ACTIVITY 1 / 3</span>
        <h1>เรียงให้ถูก</h1>
        <p>ผังงานแบบลำดับต้องทำจากก่อน → หลัง ลองจัดบัตรให้ถูกต้อง</p>
      </div>

      <div className="question-status">
        สถานการณ์ {scenarioIndex + 1} / {chapter2SequenceScenarios.length}
        <div className="mini-progress">
          {chapter2SequenceScenarios.map((item, index) => (
            <span key={item.id} className={index <= scenarioIndex ? "active sequence-active" : ""} />
          ))}
        </div>
      </div>

      <div className="sequence-context">
        <span>{scenario.title}</span>
        <strong>{scenario.context}</strong>
      </div>

      <SequenceBoard
        items={scenario.items}
        slots={slots}
        selected={selected}
        checked={checked}
        expected={scenario.answer}
        onSelect={(id) => {
          setSelected(id);
          setChecked(false);
        }}
        onPlace={place}
      />

      <div className="engine-feedback" aria-live="polite">
        {!checked && <p>วางให้ครบทุกขั้นตอน แล้วกด “ตรวจลำดับ”</p>}
        {checked && !passed && (
          <p><strong>ยังมีบางขั้นตอนสลับกันอยู่</strong> {scenario.hint}</p>
        )}
        {passed && (
          <p><strong>✓ ลำดับถูกต้อง!</strong> ทุกขั้นตอนทำงานต่อเนื่องแล้ว</p>
        )}
      </div>

      <div className="engine-actions">
        {!passed ? (
          <button
            className="btn btn-primary"
            onClick={check}
            disabled={slots.some((value) => value === null)}
          >
            ตรวจลำดับ
          </button>
        ) : (
          <button className="btn btn-primary" onClick={nextScenario}>
            {scenarioIndex === chapter2SequenceScenarios.length - 1
              ? "ไปกิจกรรม 2"
              : "สถานการณ์ต่อไป"}
          </button>
        )}
      </div>
    </section>
  );
}
