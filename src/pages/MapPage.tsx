import { chapters } from "../data/chapters";
import { useGame } from "../state/GameContext";
import { canOpenChapter } from "../game/progression";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";
import type { ChapterId } from "../types/game";

const positions: Record<ChapterId, { left: string; top: string }> = {
  1: { left: "54%", top: "13%" },
  2: { left: "27%", top: "38%" },
  3: { left: "20%", top: "67%" },
  4: { left: "53%", top: "76%" },
  5: { left: "75%", top: "52%" },
};

export function MapPage() {
  const { state, dispatch } = useGame();
  const save = state.save;
  if (!save) {
    go("/");
    return null;
  }

  const openChapter = (id: ChapterId) => {
    if (!canOpenChapter(save, id)) return;
    dispatch({ type: "SET_RESUME", screen: "chapter", chapterId: id });
    go(`/chapter/${id}`);
  };

  return (
    <main className="page map-page">
      <Hud />
      <section className="map-header">
        <div>
          <span className="eyebrow">MAIN MAP</span>
          <h1>แผนที่การผจญภัย</h1>
          <p>ผ่านตามลำดับ 1 → 2 → 3 → 4 → 5 และย้อนกลับไปเล่นด่านเดิมได้</p>
        </div>
        <button className="btn btn-ghost small" onClick={() => go("/story")}>ดูเรื่องราวอีกครั้ง</button>
      </section>

      <section className="adventure-map" aria-label="แผนที่ 5 ตำบล">
        <div className="sea-label">อ่าวไทย</div>
        <div className="mainland">
          <div className="terrain mountain-a" />
          <div className="terrain mountain-b" />
          <div className="coast-glow" />
        </div>
        <svg className="route-lines" viewBox="0 0 1000 620" aria-hidden="true">
          <path d="M540 100 C460 170 350 195 285 250 S205 360 210 430 S420 510 530 500 S690 390 745 320"
            fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="10" strokeLinecap="round" strokeDasharray="4 24" />
        </svg>

        {chapters.map((chapter) => {
          const locked = !canOpenChapter(save, chapter.id);
          const completed = save.completedChapters.includes(chapter.id);
          return (
            <button
              key={chapter.id}
              className={`stage-node ${chapter.colorClass} ${locked ? "locked" : ""} ${completed ? "completed" : ""}`}
              style={positions[chapter.id]}
              onClick={() => openChapter(chapter.id)}
              disabled={locked}
              aria-label={`${chapter.id} ${chapter.tambon} ${locked ? "ล็อก" : completed ? "ผ่านแล้ว" : "พร้อมเล่น"}`}
            >
              <span className="stage-number">{locked ? "🔒" : completed ? "✓" : chapter.id}</span>
              <strong>{chapter.tambon}</strong>
              <small>{chapter.topic}</small>
            </button>
          );
        })}
      </section>

      <KbsAi
        message={
          save.unlockedChapter === 1
            ? "เริ่มที่นาจอมเทียนก่อนนะ ด่านอื่นจะเปิดเมื่อเรากู้ Logic Core ได้"
            : `ตอนนี้เราไปได้ถึง Chapter ${save.unlockedChapter} แล้ว!`
        }
      />
    </main>
  );
}
