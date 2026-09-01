import { useGame } from "../state/GameContext";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";

export function EndingPage() {
  const { state, dispatch } = useGame();
  if (!state.save || !state.save.finalCompleted) {
    go("/map");
    return null;
  }

  return (
    <main className="page ending-page">
      <Hud />
      <section className="ending-card rich-ending">
        <div className="ending-school" aria-hidden="true">
          <span>🌴</span>
          <div>
            <small>FLOW CORE COMMAND CENTER</small>
            <strong>โรงเรียนบ้านเขาบายศรี</strong>
            <span>🏫 🇹🇭</span>
          </div>
          <span>🌴</span>
        </div>

        <div className="five-core-row" aria-label="Logic Core ครบทั้ง 5 ชิ้น">
          <span>💛<small>SYMBOL</small></span>
          <span>🧡<small>SEQUENCE</small></span>
          <span>💙<small>DECISION</small></span>
          <span>💚<small>LOOP</small></span>
          <span>💜<small>MASTER</small></span>
        </div>

        <div className="flow-core final-glow">💎</div>
        <span className="eyebrow">MISSION COMPLETE</span>
        <h1>KHAOBYSRI FLOW MASTER</h1>
        <p className="ending-message">
          FLOW CORE กลับมาสมบูรณ์แล้ว ระบบต่าง ๆ ของสัตหีบกลับมาทำงาน
          อย่างเป็นขั้นตอนอีกครั้ง
        </p>
        <blockquote>
          “ทุกปัญหาแก้ได้ เมื่อเราคิดอย่างเป็นขั้นตอน”
        </blockquote>

        <div className="button-row">
          <button className="btn btn-primary" onClick={() => go("/map")}>
            กลับสู่แผนที่
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              if (window.confirm("เริ่มการผจญภัยใหม่หรือไม่?")) {
                dispatch({ type: "RESET_GAME" });
                go("/");
              }
            }}
          >
            เล่นใหม่
          </button>
        </div>
      </section>
      <KbsAi
        mood="celebrate"
        message="สำเร็จแล้ว! เราไม่ได้แค่กู้ FLOW CORE แต่ยังเรียนรู้วิธีคิดอย่างเป็นขั้นตอนด้วย"
      />
    </main>
  );
}
