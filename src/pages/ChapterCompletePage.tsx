import { getChapter } from "../data/chapters";
import { useGame } from "../state/GameContext";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";
import type { ChapterId } from "../types/game";

export function ChapterCompletePage({ chapterId }: { chapterId: ChapterId }) {
  const { state } = useGame();
  const save = state.save;
  if (!save || save.chapterProgress[chapterId] < 3) {
    go(`/chapter/${chapterId}`);
    return null;
  }
  const chapter = getChapter(chapterId);

  return (
    <main className={`page complete-page ${chapter.colorClass}`}>
      <Hud />
      <section className="complete-card">
        <div className="core-crystal">💎</div>
        <span className="eyebrow">CHAPTER COMPLETE</span>
        <h1>{chapter.tambon} กลับมาเป็นปกติแล้ว!</h1>
        <h2>{chapter.core} CORE</h2>
        <p>Logic Core ชิ้นนี้ถูกบันทึกไว้แล้ว และเส้นทางถัดไปถูกปลดล็อก</p>
        <button className="btn btn-primary" onClick={() => go("/map")}>กลับสู่แผนที่</button>
      </section>
      <KbsAi mood="celebrate" message="เยี่ยมมาก! กลับไปดูบนแผนที่กันว่าด่านไหนเปิดแล้ว" />
    </main>
  );
}
