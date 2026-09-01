import type { FlowSymbolId } from "../data/chapter1";

export function FlowSymbol({
  symbol,
  label,
  compact = false,
}: {
  symbol: FlowSymbolId;
  label?: string;
  compact?: boolean;
}) {
  return (
    <span className={`flow-symbol flow-symbol-${symbol.toLowerCase()} ${compact ? "compact" : ""}`}>
      <span className="flow-symbol-shape">
        {symbol === "ARROW" && <span className="arrow-glyph">→</span>}
      </span>
      {label && <span className="flow-symbol-label">{label}</span>}
    </span>
  );
}
