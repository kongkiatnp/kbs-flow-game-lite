import { useState } from "react";
import { useGame } from "../state/GameContext";
import { cleanPlayerName } from "../services/saveService";
import { go } from "../app/router";
import { KbsAi } from "../components/KbsAi";

export function StartPage() {
  const { state, dispatch } = useGame();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const startNew = () => {
    const clean = cleanPlayerName(name);
    if (!clean) {
      setError("บอกชื่อให้ฉันรู้ก่อนนะ แล้วเราออกเดินทางกัน!");
      return;
    }
    dispatch({ type: "NEW_GAME", playerName: clean });
    go("/story");
  };

  const continueGame = () => {
    const save = state.save;
    if (!save) return;
    const r = save.resume;
    if (save.finalCompleted || r.screen === "ending") return go("/ending");
    if (r.screen === "activity" && r.chapterId && r.activityId) {
      return go(`/chapter/${r.chapterId}/activity/${r.activityId}`);
    }
    if (r.screen === "chapter" && r.chapterId) return go(`/chapter/${r.chapterId}`);
    if (r.screen === "final") return go("/final");
    if (r.screen === "story" && !save.introSeen) return go("/story");
    go("/map");
  };

  return (
    <main className="page start-page">
      <section className="hero-panel">
        <div className="hero-art" aria-hidden="true">
          <div className="ranger-avatar">🧭</div>
          <div className="ranger-label">KHAOBYSRI<br />FLOW RANGER</div>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">เกมการเรียนรู้สำหรับนักเรียน ป.5</span>
          <h1>เกมผังงาน <strong>สัตหีบ</strong></h1>
          <h2>ผจญภัย 5 ตำบล พิชิตภารกิจผังงาน</h2>
          <p>
            ร่วมกับ KBS-AI ตามหา Logic Core ทั้ง 5 ชิ้น
            และคืนพลัง FLOW CORE ให้สัตหีบ!
          </p>

          {state.save ? (
            <div className="continue-card">
              <h3>ยินดีต้อนรับกลับมา Ranger {state.save.playerName}!</h3>
              <button className="btn btn-primary" onClick={continueGame}>เล่นต่อ</button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  if (window.confirm("เริ่มการผจญภัยใหม่และลบความคืบหน้าเดิมหรือไม่?")) {
                    dispatch({ type: "RESET_GAME" });
                  }
                }}
              >
                เริ่มการผจญภัยใหม่
              </button>
            </div>
          ) : (
            <div className="name-card">
              <label htmlFor="playerName">ใส่ชื่อผู้เล่น</label>
              <input
                id="playerName"
                value={name}
                maxLength={20}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="พิมพ์ชื่อเล่นของคุณ..."
                onKeyDown={(e) => e.key === "Enter" && startNew()}
              />
              {error && <p className="form-hint">{error}</p>}
              <button className="btn btn-primary" onClick={startNew}>เริ่มผจญภัย</button>
              <p className="privacy-note">
                ไม่ต้องสมัครสมาชิก • ไม่ใช้รหัสผ่าน • บันทึกความคืบหน้าในเครื่องนี้เท่านั้น
              </p>
            </div>
          )}
        </div>
      </section>
      <KbsAi message="พร้อมเมื่อไร เรียกฉันได้เลย! ฉันจะช่วยใบ้และพาไปทีละภารกิจ" />
      <footer className="version">Alternative Simple Play Mode • v0.1.0 • ALT-07 Scaffold</footer>
    </main>
  );
}
