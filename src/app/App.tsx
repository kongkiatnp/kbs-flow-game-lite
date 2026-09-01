import { useEffect, useState } from "react";
import { parseRoute, go } from "./router";
import { useGame } from "../state/GameContext";
import { StartPage } from "../pages/StartPage";
import { StoryPage } from "../pages/StoryPage";
import { MapPage } from "../pages/MapPage";
import { ChapterPage } from "../pages/ChapterPage";
import { ActivityPage } from "../pages/ActivityPage";
import { ChapterCompletePage } from "../pages/ChapterCompletePage";
import { FinalPage } from "../pages/FinalPage";
import { EndingPage } from "../pages/EndingPage";

export function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const { state } = useGame();

  useEffect(() => {
    const handler = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    if (!state.save && route.name !== "start") go("/");
  }, [route.name, state.save]);

  if (state.loadStatus === "INVALID_SAVE" && !state.save) {
    return (
      <main className="fatal-screen">
        <div className="robot-orb">🤖</div>
        <h1>ข้อมูลการผจญภัยดูเหมือนจะสะดุด</h1>
        <p>เพื่อความปลอดภัย KBS-AI จะไม่ใช้ข้อมูลที่อ่านไม่ได้</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.removeItem("kbs_flow_game_save");
            window.location.hash = "/";
            window.location.reload();
          }}
        >
          เริ่มใหม่อย่างปลอดภัย
        </button>
      </main>
    );
  }

  switch (route.name) {
    case "start":
      return <StartPage />;
    case "story":
      return <StoryPage />;
    case "map":
      return <MapPage />;
    case "chapter":
      return <ChapterPage chapterId={route.chapterId} />;
    case "activity":
      return <ActivityPage chapterId={route.chapterId} activityId={route.activityId} />;
    case "chapter-complete":
      return <ChapterCompletePage chapterId={route.chapterId} />;
    case "final":
      return <FinalPage />;
    case "ending":
      return <EndingPage />;
    default:
      go(state.save ? "/map" : "/");
      return null;
  }
}
