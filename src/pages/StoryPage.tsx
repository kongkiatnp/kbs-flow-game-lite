import { useState } from "react";
import { useGame } from "../state/GameContext";
import { go } from "../app/router";
import { KbsAi } from "../components/KbsAi";

const scenes = [
  {
    title: "โลกการเรียนรู้แห่งสัตหีบ",
    body: "ทุกเส้นทางทำงานอย่างเป็นขั้นตอน ด้วยพลังของ FLOW CORE ที่คอยรักษาลำดับและเหตุผล",
    icon: "🌊",
  },
  {
    title: "พายุ GLITCH ปรากฏขึ้น!",
    body: "พายุข้อมูลป่วนลำดับพัดผ่านสัตหีบ ทำให้ระบบต่าง ๆ เริ่มทำงานสลับขั้นตอน",
    icon: "⚡",
  },
  {
    title: "FLOW CORE แตกออกเป็น 5 ชิ้น",
    body: "Logic Core กระจัดกระจายไปยัง นาจอมเทียน บางเสร่ สัตหีบ แสมสาร และพลูตาหลวง",
    icon: "💎",
  },
  {
    title: "ภารกิจของ KHAOBYSRI FLOW RANGER",
    body: "ร่วมมือกับ KBS-AI เรียนรู้ผังงาน แก้ภารกิจ และกู้ Logic Core ทั้ง 5 ชิ้นกลับคืนมา!",
    icon: "🤖",
  },
];

export function StoryPage() {
  const { dispatch } = useGame();
  const [index, setIndex] = useState(0);
  const scene = scenes[index];

  const finish = () => {
    dispatch({ type: "SET_INTRO_SEEN" });
    go("/map");
  };

  return (
    <main className="page story-page">
      <section className="story-card">
        <div className="story-icon">{scene.icon}</div>
        <div className="story-step">เรื่องราว {index + 1} / {scenes.length}</div>
        <h1>{scene.title}</h1>
        <p>{scene.body}</p>
        <div className="story-progress">
          {scenes.map((_, i) => <span key={i} className={i <= index ? "active" : ""} />)}
        </div>
        <div className="button-row">
          <button className="btn btn-ghost" onClick={finish}>ข้ามเรื่องราว</button>
          {index < scenes.length - 1 ? (
            <button className="btn btn-primary" onClick={() => setIndex(index + 1)}>ถัดไป</button>
          ) : (
            <button className="btn btn-primary" onClick={finish}>ออกเดินทาง!</button>
          )}
        </div>
      </section>
      <KbsAi
        mood={index === scenes.length - 1 ? "celebrate" : "normal"}
        message={index === scenes.length - 1 ? "แผนที่พร้อมแล้ว ไปตามหา Logic Core กัน!" : "ค่อย ๆ ดูเรื่องราวไปทีละฉากนะ"}
      />
    </main>
  );
}
