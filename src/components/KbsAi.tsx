export function KbsAi({
  message,
  mood = "normal",
}: {
  message: string;
  mood?: "normal" | "think" | "hint" | "correct" | "celebrate";
}) {
  const faces = {
    normal: "◕‿◕",
    think: "•́‿•̀",
    hint: "✦‿✦",
    correct: "ᵔ▽ᵔ",
    celebrate: "★▽★",
  };
  return (
    <aside className="kbs-ai">
      <div className="kbs-ai-robot" aria-label="KBS-AI">
        <span className="antenna">●</span>
        <span className="robot-face">{faces[mood]}</span>
        <small>KBS-AI</small>
      </div>
      <div className="speech-bubble">{message}</div>
    </aside>
  );
}
