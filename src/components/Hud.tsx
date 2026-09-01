import { useGame } from "../state/GameContext";
import { go } from "../app/router";

export function Hud() {
  const { state, dispatch } = useGame();
  if (!state.save) return null;

  return (
    <header className="hud">
      <button className="hud-brand" onClick={() => go("/map")}>
        KBS FLOW
      </button>
      <div className="hud-player">Ranger {state.save.playerName}</div>
      <div className="core-dots" aria-label={`Logic Core ${state.save.logicCores.length} จาก 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= state.save!.logicCores.length ? "core-dot filled" : "core-dot"} />
        ))}
      </div>
      <button
        className="icon-btn"
        aria-label="เปิดหรือปิดเสียง"
        onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
      >
        {state.save.soundEnabled ? "🔊" : "🔇"}
      </button>
    </header>
  );
}
