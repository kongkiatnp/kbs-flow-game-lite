export type SequenceItem = {
  id: string;
  label: string;
  emoji?: string;
};

export type SequenceScenario = {
  id: string;
  title: string;
  context: string;
  items: SequenceItem[];
  answer: string[];
  hint: string;
};

export const chapter2SequenceScenarios: SequenceScenario[] = [
  {
    id: "CH02-A01-S01",
    title: "เตรียมตัวไปโรงเรียน",
    context: "ช่วยเรียงกิจวัตรให้เกิดขึ้นจากก่อน → หลัง",
    items: [
      { id: "wake", label: "ตื่นนอน", emoji: "🌤️" },
      { id: "bag", label: "เตรียมกระเป๋า", emoji: "🎒" },
      { id: "shoes", label: "ใส่รองเท้า", emoji: "👟" },
      { id: "leave", label: "ออกจากบ้าน", emoji: "🏠" },
    ],
    answer: ["wake", "bag", "shoes", "leave"],
    hint: "เริ่มจากสิ่งที่ต้องเกิดก่อนที่สุด แล้วค่อยคิดว่าขั้นตอนใดตามมา",
  },
  {
    id: "CH02-A01-S02",
    title: "ล้างมือก่อนรับประทานอาหาร",
    context: "เรียงขั้นตอนการล้างมืออย่างง่าย",
    items: [
      { id: "water", label: "เปิดน้ำให้มือเปียก", emoji: "💧" },
      { id: "soap", label: "ถูสบู่", emoji: "🧼" },
      { id: "rinse", label: "ล้างสบู่ออก", emoji: "🚿" },
      { id: "dry", label: "เช็ดมือให้แห้ง", emoji: "🧻" },
    ],
    answer: ["water", "soap", "rinse", "dry"],
    hint: "ต้องทำให้มือเปียกก่อนใช้สบู่ และล้างสบู่ออกก่อนเช็ดมือ",
  },
  {
    id: "CH02-A01-S03",
    title: "ส่งงานในห้องเรียน",
    context: "เรียงลำดับก่อนส่งงานให้ครู",
    items: [
      { id: "read", label: "อ่านโจทย์", emoji: "📖" },
      { id: "do", label: "ทำงานตามโจทย์", emoji: "✏️" },
      { id: "check", label: "ตรวจความเรียบร้อย", emoji: "🔎" },
      { id: "submit", label: "ส่งงาน", emoji: "📤" },
    ],
    answer: ["read", "do", "check", "submit"],
    hint: "ก่อนส่งงาน เราควรทำงานให้เสร็จและตรวจความเรียบร้อยก่อน",
  },
];

export type MissingStepQuestion = {
  id: string;
  prompt: string;
  before: string;
  after: string;
  choices: string[];
  correct: string;
  hint: string;
  explanation: string;
};

export const chapter2MissingStepQuestions: MissingStepQuestion[] = [
  {
    id: "CH02-A02-Q01",
    prompt: "ขั้นตอนไหนควรอยู่ตรงกลาง?",
    before: "รับชื่อผู้เล่น",
    after: "สิ้นสุด",
    choices: [
      "แสดงข้อความต้อนรับ",
      "ตรวจว่าฝนตกหรือไม่",
      "กลับไปเริ่มใหม่",
    ],
    correct: "แสดงข้อความต้อนรับ",
    hint: "หลังรับชื่อแล้ว ระบบควรทำอะไรกับผู้เล่นก่อนจบ?",
    explanation: "ถูกต้อง! รับชื่อ → แสดงข้อความต้อนรับ → สิ้นสุด เป็นลำดับที่ต่อเนื่อง",
  },
  {
    id: "CH02-A02-Q02",
    prompt: "ขั้นตอนไหนหายไป?",
    before: "อ่านโจทย์",
    after: "ส่งคำตอบ",
    choices: [
      "เลือกคำตอบ",
      "เปิดเพลง",
      "ปิดเกม",
    ],
    correct: "เลือกคำตอบ",
    hint: "ก่อนส่งคำตอบ เราต้องมีคำตอบให้เลือกก่อน",
    explanation: "ถูกต้อง! อ่านโจทย์ → เลือกคำตอบ → ส่งคำตอบ",
  },
  {
    id: "CH02-A02-Q03",
    prompt: "เลือกขั้นตอนที่เหมาะสมที่สุด",
    before: "เตรียมอุปกรณ์",
    after: "เริ่มทำภารกิจ",
    choices: [
      "ตรวจว่าอุปกรณ์พร้อม",
      "แสดงคะแนนสุดท้าย",
      "จบภารกิจ",
    ],
    correct: "ตรวจว่าอุปกรณ์พร้อม",
    hint: "ก่อนเริ่มทำภารกิจ ควรแน่ใจก่อนว่าอุปกรณ์พร้อมใช้งาน",
    explanation: "ถูกต้อง! เตรียมอุปกรณ์ → ตรวจความพร้อม → เริ่มทำภารกิจ",
  },
];

export const bangSareHarborItems: SequenceItem[] = [
  { id: "mission", label: "รับภารกิจ", emoji: "📜" },
  { id: "check", label: "ตรวจอุปกรณ์", emoji: "🔎" },
  { id: "prepare", label: "เตรียมเรือ", emoji: "⚓" },
  { id: "depart", label: "ออกเดินทาง", emoji: "⛵" },
];

export const bangSareHarborAnswer = [
  "mission",
  "check",
  "prepare",
  "depart",
];
