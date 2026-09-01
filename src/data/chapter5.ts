export type ReviewDomain = "SYMBOL" | "SEQUENCE" | "DECISION" | "LOOP";

export type ReviewQuestion = {
  id: string;
  domain: ReviewDomain;
  prompt: string;
  choices: string[];
  correct: string;
  hint: string;
  explanation: string;
  icon: string;
};

export const flowCoreReviewQuestions: ReviewQuestion[] = [
  {
    id: "CH05-A01-R01",
    domain: "SYMBOL",
    prompt: "สัญลักษณ์ใดใช้สำหรับคำถามหรือเงื่อนไข?",
    choices: ["Decision", "Process", "Start / End"],
    correct: "Decision",
    hint: "มองหารูปสี่เหลี่ยมข้าวหลามตัดที่ใช้แยกเส้นทาง",
    explanation: "ถูกต้อง! Decision ใช้ตรวจเงื่อนไขก่อนเลือกเส้นทาง",
    icon: "◇",
  },
  {
    id: "CH05-A01-R02",
    domain: "SEQUENCE",
    prompt: "ถ้าต้องทำ A → B → C ตามลำดับ แนวคิดนี้คืออะไร?",
    choices: ["Sequence", "Loop", "Decision"],
    correct: "Sequence",
    hint: "ทุกขั้นตอนทำต่อกันจากก่อน → หลัง โดยไม่แยกทาง",
    explanation: "ถูกต้อง! Sequence คือการทำงานเรียงต่อกันทีละขั้นตอน",
    icon: "1→2→3",
  },
  {
    id: "CH05-A01-R03",
    domain: "DECISION",
    prompt: "คำถาม “ผ่านภารกิจแล้วหรือยัง?” ควรมีทางออกแบบใด?",
    choices: ["ใช่ / ไม่ใช่", "ทำซ้ำอย่างเดียว", "ไม่มีทางออก"],
    correct: "ใช่ / ไม่ใช่",
    hint: "Decision ต้องมีผลลัพธ์ตามคำตอบของเงื่อนไข",
    explanation: "ถูกต้อง! Decision แยกเส้นทางตามผลของเงื่อนไข เช่น ใช่ / ไม่ใช่",
    icon: "YES/NO",
  },
  {
    id: "CH05-A01-R04",
    domain: "LOOP",
    prompt: "ถ้ายังเก็บของไม่ครบตามจำนวน ควรทำอย่างไร?",
    choices: ["ทำซ้ำต่อ", "จบทันที", "ข้ามเงื่อนไข"],
    correct: "ทำซ้ำต่อ",
    hint: "Loop จะย้อนกลับไปทำงานเดิมจนกว่าเงื่อนไขหยุดจะเป็นจริง",
    explanation: "ถูกต้อง! เมื่อยังไม่ครบ เราต้องวนกลับไปทำซ้ำอีกครั้ง",
    icon: "↻",
  },
];

export type MasterPieceId =
  | "START"
  | "INPUT_NAME"
  | "COLLECT_FRAGMENT"
  | "CHECK_THREE"
  | "NO_REPEAT"
  | "YES_OUTPUT"
  | "END";

export type MasterPiece = {
  id: MasterPieceId;
  label: string;
  symbol: "TERMINAL" | "INPUT_OUTPUT" | "PROCESS" | "DECISION" | "LOOP_BRANCH";
  emoji: string;
};

export const masterFlowPieces: MasterPiece[] = [
  { id: "START", label: "เริ่มต้น", symbol: "TERMINAL", emoji: "▶️" },
  {
    id: "INPUT_NAME",
    label: "รับชื่อผู้เล่น",
    symbol: "INPUT_OUTPUT",
    emoji: "⌨️",
  },
  {
    id: "COLLECT_FRAGMENT",
    label: "เก็บ Logic Fragment 1 ชิ้น",
    symbol: "PROCESS",
    emoji: "💠",
  },
  {
    id: "CHECK_THREE",
    label: "ครบ 3 ชิ้นหรือยัง?",
    symbol: "DECISION",
    emoji: "◇",
  },
  {
    id: "NO_REPEAT",
    label: "ไม่ใช่ → กลับไปเก็บอีก 1 ชิ้น",
    symbol: "LOOP_BRANCH",
    emoji: "↩️",
  },
  {
    id: "YES_OUTPUT",
    label: "ใช่ → แสดง “FLOW CORE พร้อม!”",
    symbol: "INPUT_OUTPUT",
    emoji: "✨",
  },
  { id: "END", label: "สิ้นสุด", symbol: "TERMINAL", emoji: "🏁" },
];

export const masterFlowAnswer: Record<string, MasterPieceId> = {
  start: "START",
  input: "INPUT_NAME",
  process: "COLLECT_FRAGMENT",
  decision: "CHECK_THREE",
  no: "NO_REPEAT",
  yes: "YES_OUTPUT",
  end: "END",
};

export type FinalDomain =
  | "SYMBOL"
  | "SEQUENCE"
  | "DECISION"
  | "LOOP"
  | "INTEGRATED";

export type FinalQuestion = {
  id: string;
  domain: FinalDomain;
  prompt: string;
  choices: string[];
  correct: string;
  explanation: string;
};

export const finalQuestions: FinalQuestion[] = [
  {
    id: "FIN-01",
    domain: "SYMBOL",
    prompt: "ต้องการตรวจว่า “คะแนนถึง 8 หรือไม่?” ควรใช้สัญลักษณ์ใด?",
    choices: ["Decision", "Process", "Start / End", "Arrow"],
    correct: "Decision",
    explanation: "การตรวจเงื่อนไขใช้ Decision หรือสี่เหลี่ยมข้าวหลามตัด",
  },
  {
    id: "FIN-02",
    domain: "SYMBOL",
    prompt: "คำสั่ง “แสดงคำว่า ยินดีด้วย!” ควรใช้สัญลักษณ์ใด?",
    choices: ["Input / Output", "Decision", "Process", "Arrow"],
    correct: "Input / Output",
    explanation: "การแสดงข้อความเป็น Output จึงใช้ Input / Output",
  },
  {
    id: "FIN-03",
    domain: "SEQUENCE",
    prompt: "ถ้าต้อง “รับข้อมูล” แล้วจึง “แสดงผล” ขั้นตอนไหนควรมาก่อน?",
    choices: ["รับข้อมูล", "แสดงผล", "ทำพร้อมกัน", "ข้ามทั้งสองขั้นตอน"],
    correct: "รับข้อมูล",
    explanation: "ผังงานแบบลำดับต้องรับข้อมูลก่อน จึงนำข้อมูลไปแสดงผลได้",
  },
  {
    id: "FIN-04",
    domain: "SEQUENCE",
    prompt: "ลำดับใดถูกต้องที่สุด?",
    choices: [
      "START → รับภารกิจ → ทำภารกิจ → END",
      "END → ทำภารกิจ → START",
      "ทำภารกิจ → START → END",
      "รับภารกิจ → END → START",
    ],
    correct: "START → รับภารกิจ → ทำภารกิจ → END",
    explanation: "Sequence เริ่มจาก START แล้วทำตามขั้นตอนก่อนถึง END",
  },
  {
    id: "FIN-05",
    domain: "DECISION",
    prompt: "ถ้าเงื่อนไขคือ “ตอบถูกหรือไม่?” และผู้เล่นตอบถูก ควรไปทางใด?",
    choices: ["ใช่", "ไม่ใช่", "ย้อนกลับเสมอ", "ไม่มีทางออก"],
    correct: "ใช่",
    explanation: "เมื่อตอบถูก เงื่อนไขเป็นจริง จึงเลือกทาง “ใช่”",
  },
  {
    id: "FIN-06",
    domain: "DECISION",
    prompt: "ข้อใดเหมาะเป็นข้อความในสัญลักษณ์ Decision มากที่สุด?",
    choices: [
      "ครบ 5 ชิ้นหรือยัง?",
      "แสดงคำว่า สำเร็จ",
      "รับชื่อผู้เล่น",
      "เริ่มต้น",
    ],
    correct: "ครบ 5 ชิ้นหรือยัง?",
    explanation: "Decision ควรเป็นคำถามหรือเงื่อนไขที่นำไปสู่ทางเลือก",
  },
  {
    id: "FIN-07",
    domain: "LOOP",
    prompt: "ต้องเก็บของ 5 ชิ้น ตอนนี้เก็บได้ 3 ชิ้น ควรทำอย่างไร?",
    choices: ["ทำซ้ำต่อ", "จบ Loop", "ข้ามไป END", "ลบของที่เก็บแล้ว"],
    correct: "ทำซ้ำต่อ",
    explanation: "ยังไม่ครบเป้าหมาย จึงต้องทำงานซ้ำต่อ",
  },
  {
    id: "FIN-08",
    domain: "LOOP",
    prompt: "เมื่อเก็บของครบ 5/5 แล้วควรทำอย่างไร?",
    choices: ["ออกจาก Loop", "ทำซ้ำตลอดไป", "เริ่มใหม่ทุกครั้ง", "ลบ Counter"],
    correct: "ออกจาก Loop",
    explanation: "เมื่อเงื่อนไขหยุดเป็นจริง เราจึงออกจาก Loop",
  },
  {
    id: "FIN-09",
    domain: "INTEGRATED",
    prompt: "ในผังงาน START → รับคะแนน → “คะแนน ≥ 8 ?” ส่วน “คะแนน ≥ 8 ?” คือแนวคิดใด?",
    choices: ["Decision", "Sequence เท่านั้น", "Start / End", "Arrow"],
    correct: "Decision",
    explanation: "แม้อยู่ในผังงานหลายขั้นตอน แต่จุดที่ตรวจคะแนนเป็น Decision",
  },
  {
    id: "FIN-10",
    domain: "INTEGRATED",
    prompt: "ภารกิจให้เก็บการ์ดซ้ำจนกว่าจะครบ แล้วแสดง “สำเร็จ” ใช้แนวคิดใดร่วมกัน?",
    choices: [
      "Loop + Decision + Output",
      "Start / End อย่างเดียว",
      "Sequence อย่างเดียว",
      "Arrow อย่างเดียว",
    ],
    correct: "Loop + Decision + Output",
    explanation: "ต้องทำซ้ำ ตรวจเงื่อนไข และแสดงผลเมื่อสำเร็จ จึงใช้หลายแนวคิดร่วมกัน",
  },
];

export const FINAL_PASS_SCORE = 8;
