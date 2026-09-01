import { useGame } from "../state/GameContext";
import { getChapter } from "../data/chapters";
import { canOpenChapter } from "../game/progression";
import { go } from "../app/router";
import { Hud } from "../components/Hud";
import { KbsAi } from "../components/KbsAi";
import { Chapter1Activity } from "../game/Chapter1Activity";
import { Chapter2Activity } from "../game/Chapter2Activity";
import { Chapter3Activity } from "../game/Chapter3Activity";
import { Chapter4Activity } from "../game/Chapter4Activity";
import { Chapter5Activity } from "../game/Chapter5Activity";
import type { ActivityId, ChapterId } from "../types/game";

export function ActivityPage({
  chapterId,
  activityId,
}: {
  chapterId: ChapterId;
  activityId: ActivityId;
}) {
  const { state, dispatch } = useGame();
  const save = state.save;

  if (!save || !canOpenChapter(save, chapterId)) {
    go("/map");
    return null;
  }

  const progress = save.chapterProgress[chapterId];

  // Chapter 5 activity 3 is the dedicated Final Challenge route.
  // Never render a placeholder /chapter/5/activity/3 screen.
  if (chapterId === 5 && activityId === 3) {
    if (progress >= 2) go("/final");
    else go("/chapter/5");
    return null;
  }

  // Completed chapters may be replayed freely.
  // Unfinished chapters may only enter their next allowed activity.
  if (progress < 3 && activityId > Math.min(progress + 1, 3)) {
    go(`/chapter/${chapterId}`);
    return null;
  }

  const chapter = getChapter(chapterId);

  const completeCurrent = () => {
    dispatch({ type: "COMPLETE_ACTIVITY", chapterId, activityId });

    if (chapterId === 5 && activityId === 2) {
      dispatch({ type: "SET_RESUME", screen: "final", chapterId: 5 });
      go("/final");
      return;
    }

    if (activityId === 3) {
      go(`/chapter/${chapterId}/complete`);
      return;
    }

    go(`/chapter/${chapterId}/activity/${activityId + 1}`);
  };

  const isRealChapter = chapterId <= 5;

  return (
    <main className={`page activity-page ${chapter.colorClass}`}>
      <Hud />

      <section className={`activity-shell ${isRealChapter ? "real-chapter-shell" : ""}`}>
        <div className="activity-topbar">
          <div>
            <span>Chapter {chapterId}</span>
            <strong>{chapter.tambon}</strong>
          </div>
          <div className="activity-progress">
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= activityId ? "active" : ""} />
            ))}
          </div>
          <span>กิจกรรม {activityId}/3</span>
        </div>

        {chapterId === 1 ? (
          <Chapter1Activity
            key={`ch1-${activityId}`}
            activityId={activityId}
            onComplete={completeCurrent}
          />
        ) : chapterId === 2 ? (
          <Chapter2Activity
            key={`ch2-${activityId}`}
            activityId={activityId}
            onComplete={completeCurrent}
          />
        ) : chapterId === 3 ? (
          <Chapter3Activity
            key={`ch3-${activityId}`}
            activityId={activityId}
            onComplete={completeCurrent}
          />
        ) : chapterId === 4 ? (
          <Chapter4Activity
            key={`ch4-${activityId}`}
            activityId={activityId}
            onComplete={completeCurrent}
          />
        ) : chapterId === 5 ? (
          <Chapter5Activity
            key={`ch5-${activityId}`}
            activityId={activityId}
            onComplete={completeCurrent}
          />
        ) : (
          <div className="engine-placeholder">
            <div className="placeholder-icon">🧩</div>
            <h1>{chapter.topic}</h1>
            <p>
              Chapters 1–5 ใช้ Activity Engine จริงแล้ว
              Engine ใน Stage ถัดไป
            </p>
            {import.meta.env.DEV ? (
              <button className="btn btn-primary" onClick={completeCurrent}>
                DEV: จำลองผ่านกิจกรรมนี้
              </button>
            ) : (
              <div className="stage-notice">
                กิจกรรม Chapter นี้ยังไม่เปิดใช้งานใน ALT-10
              </div>
            )}
          </div>
        )}

        <div className="activity-actions">
          <button
            className="btn btn-ghost"
            onClick={() => {
              if (
                window.confirm(
                  "กลับไปหน้า Chapter หรือไม่? กิจกรรมที่ยังไม่ผ่านจะเริ่มใหม่",
                )
              ) {
                go(`/chapter/${chapterId}`);
              }
            }}
          >
            ออกจากกิจกรรม
          </button>
        </div>
      </section>

      <KbsAi
        mood={isRealChapter ? "hint" : "think"}
        message={
          chapterId === 5
            ? "ด่านสุดท้ายจะรวมทุกอย่างที่เราเรียนมา ค่อย ๆ มอง Symbol, ลำดับ, เงื่อนไข และเส้นทางวนซ้ำทีละส่วน"
            : chapterId === 4
              ? "Loop คือการทำงานซ้ำโดยต้องมีเงื่อนไขหยุดนะ ถ้ายังไม่ครบให้วนกลับ ถ้าครบแล้วจึงออกจาก Loop"
              : chapterId === 3
              ? "Decision คือการถามเงื่อนไขก่อนเลือกทางนะ ลองดูว่าเมื่อคำตอบเป็นจริงควรไปทาง “ใช่” หรือ “ไม่ใช่”"
              : chapterId === 2
              ? "ผังงานแบบลำดับไม่มีทางลัดนะ คิดว่าอะไรต้องเกิดก่อน แล้วค่อยเรียงสิ่งที่ตามมา"
              : chapterId === 1
              ? "ถ้าติดตรงไหนไม่เป็นไรนะ ลองสังเกตรูปร่างและคำสำคัญ แล้วลองใหม่ได้เสมอ"
              : "Chapter นี้ยังเป็น Core Shell และจะได้รับ Engine จริงใน Stage ถัดไป"
        }
      />
    </main>
  );
}
