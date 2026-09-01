import { getChapter } from "../data/chapters";
import { useGame } from "../state/GameContext";
import { canOpenChapter } from "../game/progression";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";
import type { ChapterId } from "../types/game";

export function ChapterPage({ chapterId }: { chapterId: ChapterId }) {
  const { state, dispatch } = useGame();
  const save = state.save;
  if (!save || !canOpenChapter(save, chapterId)) {
    go("/map");
    return null;
  }

  const chapter = getChapter(chapterId);
  const progress = save.chapterProgress[chapterId];
  const nextActivity = progress === 3 ? 1 : Math.min(3, progress + 1);

  const start = () => {
    if (chapterId === 5 && save.finalCompleted) {
      dispatch({
        type: "SET_RESUME",
        screen: "activity",
        chapterId: 5,
        activityId: 1,
      });
      go("/chapter/5/activity/1");
      return;
    }

    if (chapterId === 5 && progress >= 2) {
      dispatch({ type: "SET_RESUME", screen: "final", chapterId });
      go("/final");
      return;
    }

    dispatch({
      type: "SET_RESUME",
      screen: "activity",
      chapterId,
      activityId: nextActivity as 1 | 2 | 3,
    });
    go(`/chapter/${chapterId}/activity/${nextActivity}`);
  };

  return (
    <main className={`page chapter-page ${chapter.colorClass}`}>
      <Hud />
      <section className="chapter-hero">
        <div className="chapter-badge">CHAPTER {chapter.id}</div>
        <h1>{chapter.tambon}</h1>
        <h2>{chapter.subtitle}</h2>
        <p className="chapter-topic">{chapter.topic}</p>
        <p>{chapter.story}</p>
      </section>

      <section className="learn-card">
        <div>
          <span className="eyebrow">เรียนรู้ก่อนออกภารกิจ</span>
          <h3>สิ่งสำคัญในบทนี้</h3>
        </div>
        <div className="learning-pills">
          {chapter.learningPoints.map((point) => <span key={point}>{point}</span>)}
        </div>
        <div className="activity-dots">
          {[1, 2, 3].map((n) => (
            <span key={n} className={n <= progress ? "done" : ""}>
              {n <= progress ? "✓" : n}
            </span>
          ))}
        </div>
        <button className="btn btn-primary" onClick={start}>
          {progress === 0 ? "เริ่มกิจกรรม 1" : progress < 3 ? `เล่นกิจกรรม ${nextActivity}` : "เล่นด่านนี้อีกครั้งตั้งแต่กิจกรรม 1"}
        </button>
        <button className="btn btn-ghost" onClick={() => go("/map")}>กลับแผนที่</button>
      </section>

      <KbsAi message="หนึ่ง Chapter มีเพียง 3 กิจกรรม ทำทีละกิจกรรมแล้วเราจะได้ Logic Core!" />
    </main>
  );
}
