import type { SequenceItem } from "../data/chapter2";

export function SequenceBoard({
  items,
  slots,
  selected,
  checked,
  expected,
  onSelect,
  onPlace,
}: {
  items: SequenceItem[];
  slots: Array<string | null>;
  selected: string | null;
  checked: boolean;
  expected: string[];
  onSelect: (id: string) => void;
  onPlace: (slotIndex: number, id: string) => void;
}) {
  const used = new Set(slots.filter((value): value is string => Boolean(value)));
  const byId = (id: string | null) => items.find((item) => item.id === id);

  return (
    <div className="sequence-board">
      <section className="sequence-bank">
        <h2>บัตรขั้นตอน</h2>
        <div className="sequence-bank-list">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              draggable
              className={`sequence-piece ${selected === item.id ? "selected" : ""} ${used.has(item.id) ? "used" : ""}`}
              onClick={() => onSelect(item.id)}
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", item.id);
                event.dataTransfer.effectAllowed = "move";
              }}
            >
              <span className="sequence-emoji" aria-hidden="true">
                {item.emoji ?? "🔹"}
              </span>
              <strong>{item.label}</strong>
              <small>{used.has(item.id) ? "วางแล้ว • แตะเพื่อย้าย" : "แตะหรือลาก"}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="sequence-canvas">
        <h2>ลำดับของคุณ</h2>
        {slots.map((itemId, index) => {
          const item = byId(itemId);
          const wrong = checked && itemId !== expected[index];

          return (
            <div key={index} className="sequence-slot-wrap">
              <button
                type="button"
                className={`sequence-slot ${item ? "filled" : ""} ${wrong ? "wrong" : ""}`}
                onClick={() => selected && onPlace(index, selected)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const id = event.dataTransfer.getData("text/plain");
                  if (items.some((candidate) => candidate.id === id)) {
                    onPlace(index, id);
                  }
                }}
              >
                <span className="sequence-number">{index + 1}</span>
                {item ? (
                  <span className="sequence-slot-content">
                    <span aria-hidden="true">{item.emoji ?? "🔹"}</span>
                    <strong>{item.label}</strong>
                  </span>
                ) : (
                  <span className="empty-slot">วางขั้นตอนที่ {index + 1}</span>
                )}
              </button>
              {index < slots.length - 1 && (
                <div className="sequence-arrow" aria-hidden="true">↓</div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
