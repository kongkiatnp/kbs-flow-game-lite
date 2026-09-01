export type ConservationCard = {
  id: string;
  label: string;
  emoji: string;
  note: string;
};

export const conservationCards: ConservationCard[] = [
  {
    id: "turtle",
    label: "การ์ดเต่าทะเล",
    emoji: "🐢",
    note: "เรียนรู้การดูแลสัตว์ทะเล",
  },
  {
    id: "coral",
    label: "การ์ดปะการัง",
    emoji: "🪸",
    note: "ช่วยกันรักษาระบบนิเวศแนวปะการัง",
  },
  {
    id: "fish",
    label: "การ์ดฝูงปลา",
    emoji: "🐠",
    note: "สังเกตความหลากหลายของสิ่งมีชีวิต",
  },
  {
    id: "clean",
    label: "การ์ดทะเลสะอาด",
    emoji: "♻️",
    note: "ลดขยะและรักษาความสะอาดชายฝั่ง",
  },
  {
    id: "seagrass",
    label: "การ์ดหญ้าทะเล",
    emoji: "🌿",
    note: "แหล่งอาหารและที่อยู่อาศัยของสัตว์ทะเล",
  },
];

export type StopConditionQuestion = {
  id: string;
  situation: string;
  repeatedAction: string;
  choices: string[];
  correct: string;
  hint: string;
  explanation: string;
};

export const stopConditionQuestions: StopConditionQuestion[] = [
  {
    id: "CH04-A02-Q01",
    situation: "ต้องรดน้ำต้นไม้ให้ครบ 3 กระถาง",
    repeatedAction: "รดน้ำต้นไม้ทีละ 1 กระถาง",
    choices: [
      "รดครบ 3 กระถางหรือยัง?",
      "วันนี้อากาศดีหรือไม่?",
      "ชอบต้นไม้สีอะไร?",
    ],
    correct: "รดครบ 3 กระถางหรือยัง?",
    hint: "เงื่อนไขหยุดต้องตรวจจำนวนที่ภารกิจกำหนดไว้",
    explanation: "ถูกต้อง! เมื่อรดครบ 3 กระถาง Loop จึงหยุดได้",
  },
  {
    id: "CH04-A02-Q02",
    situation: "ต้องเก็บการ์ดอนุรักษ์ให้ครบ 5 ใบ",
    repeatedAction: "เก็บการ์ดทีละ 1 ใบ",
    choices: [
      "เก็บครบ 5 ใบหรือยัง?",
      "การ์ดใบนี้สีอะไร?",
      "เปิดเสียงอยู่หรือไม่?",
    ],
    correct: "เก็บครบ 5 ใบหรือยัง?",
    hint: "ลองถามว่าเมื่อใดเราจึงถือว่าภารกิจเก็บการ์ดสำเร็จ",
    explanation: "ถูกต้อง! เมื่อครบ 5/5 เราจึงออกจากการทำซ้ำ",
  },
  {
    id: "CH04-A02-Q03",
    situation: "ต้องจัดหนังสือขึ้นชั้นให้ครบ 4 เล่ม",
    repeatedAction: "หยิบหนังสือขึ้นชั้นทีละ 1 เล่ม",
    choices: [
      "จัดครบ 4 เล่มหรือยัง?",
      "หนังสือเล่มไหนสวย?",
      "ชั้นหนังสืออยู่ที่ไหน?",
    ],
    correct: "จัดครบ 4 เล่มหรือยัง?",
    hint: "เงื่อนไขหยุดควรสัมพันธ์กับเป้าหมาย “ครบ 4 เล่ม”",
    explanation: "ถูกต้อง! ทำซ้ำจนจัดหนังสือครบ 4 เล่ม แล้วจึงหยุด",
  },
];

export type LoopPieceId =
  | "START"
  | "COLLECT"
  | "CHECK_FIVE"
  | "NO_REPEAT"
  | "YES_END"
  | "END";

export type LoopPiece = {
  id: LoopPieceId;
  label: string;
  role: "TERMINAL" | "PROCESS" | "DECISION" | "NO_BRANCH" | "YES_BRANCH";
  emoji: string;
};

export const samaesanLoopPieces: LoopPiece[] = [
  { id: "START", label: "เริ่มต้น", role: "TERMINAL", emoji: "▶️" },
  { id: "COLLECT", label: "เก็บการ์ด 1 ใบ", role: "PROCESS", emoji: "🃏" },
  {
    id: "CHECK_FIVE",
    label: "ครบ 5 ใบหรือยัง?",
    role: "DECISION",
    emoji: "◇",
  },
  {
    id: "NO_REPEAT",
    label: "ไม่ใช่ → กลับไปเก็บอีก 1 ใบ",
    role: "NO_BRANCH",
    emoji: "↩️",
  },
  {
    id: "YES_END",
    label: "ใช่ → ออกจาก Loop",
    role: "YES_BRANCH",
    emoji: "✅",
  },
  { id: "END", label: "สิ้นสุด", role: "TERMINAL", emoji: "🏁" },
];

export const samaesanLoopAnswer: Record<string, LoopPieceId> = {
  start: "START",
  process: "COLLECT",
  decision: "CHECK_FIVE",
  no: "NO_REPEAT",
  yes: "YES_END",
  end: "END",
};
