export type DecisionBranch = "YES" | "NO";

export type BranchScenario = {
  id: string;
  question: string;
  yesResult: string;
  noResult: string;
  prompt: string;
  correct: DecisionBranch;
  hint: string;
  explanation: string;
  emoji: string;
};

export const chapter3BranchScenarios: BranchScenario[] = [
  {
    id: "CH03-A01-S01",
    question: "ฝนตกหรือไม่?",
    yesResult: "หยิบร่ม",
    noResult: "เดินทางต่อ",
    prompt: "วันนี้ฝนตก ควรไปทางใด?",
    correct: "YES",
    hint: "เงื่อนไขถามว่า “ฝนตกหรือไม่?” และสถานการณ์บอกว่าฝนตก",
    explanation: "ถูกต้อง! เมื่อเงื่อนไขเป็นจริง เราเลือกทาง “ใช่” แล้วหยิบร่ม",
    emoji: "🌧️",
  },
  {
    id: "CH03-A01-S02",
    question: "มีบัตรผ่านหรือไม่?",
    yesResult: "เปิดประตู",
    noResult: "ไปขอรับบัตร",
    prompt: "ผู้เล่นยังไม่มีบัตรผ่าน ควรไปทางใด?",
    correct: "NO",
    hint: "คำว่า “ยังไม่มี” หมายถึงเงื่อนไข “มีบัตรผ่านหรือไม่?” เป็นเท็จ",
    explanation: "ถูกต้อง! เมื่อยังไม่มีบัตรผ่าน ต้องไปทาง “ไม่ใช่” เพื่อขอรับบัตร",
    emoji: "🎫",
  },
  {
    id: "CH03-A01-S03",
    question: "ตอบถูกหรือไม่?",
    yesResult: "ผ่านภารกิจ",
    noResult: "ลองอีกครั้ง",
    prompt: "ผู้เล่นตอบถูก ควรไปทางใด?",
    correct: "YES",
    hint: "เงื่อนไขตรงกับสถานการณ์พอดี: ผู้เล่น “ตอบถูก”",
    explanation: "ถูกต้อง! เมื่อตอบถูก เงื่อนไขเป็นจริง จึงไปทาง “ใช่”",
    emoji: "✅",
  },
];

export type DecisionQuestionItem = {
  id: string;
  yesResult: string;
  noResult: string;
  choices: string[];
  correct: string;
  hint: string;
  explanation: string;
};

export const chapter3DecisionQuestions: DecisionQuestionItem[] = [
  {
    id: "CH03-A02-Q01",
    yesResult: "ผ่านด่าน",
    noResult: "ลองใหม่",
    choices: ["ผ่านภารกิจแล้วหรือยัง?", "เปิดเพลงหรือไม่?", "ชื่อผู้เล่นคืออะไร?"],
    correct: "ผ่านภารกิจแล้วหรือยัง?",
    hint: "ดูผลลัพธ์ทั้งสองทาง: ผ่านด่าน / ลองใหม่ คำถามควรตรวจเรื่องการผ่านภารกิจ",
    explanation: "ถูกต้อง! คำถาม “ผ่านภารกิจแล้วหรือยัง?” เชื่อมกับผลลัพธ์ทั้งสองทางโดยตรง",
  },
  {
    id: "CH03-A02-Q02",
    yesResult: "เปิดประตู",
    noResult: "ไปหา Logic Key",
    choices: ["มี Logic Key หรือไม่?", "เวลาเท่าไร?", "เรืออยู่ที่ไหน?"],
    correct: "มี Logic Key หรือไม่?",
    hint: "ถ้ามีสิ่งนี้ ประตูจะเปิด ถ้าไม่มีก็ต้องไปค้นหา",
    explanation: "ถูกต้อง! Decision ต้องตรวจว่า “มี Logic Key หรือไม่?”",
  },
  {
    id: "CH03-A02-Q03",
    yesResult: "แสดง “สำเร็จ”",
    noResult: "กลับไปทำภารกิจ",
    choices: ["ทำภารกิจครบหรือยัง?", "ชอบสีอะไร?", "เปิดเสียงหรือไม่?"],
    correct: "ทำภารกิจครบหรือยัง?",
    hint: "ผลลัพธ์ฝั่งไม่ใช่คือ “กลับไปทำภารกิจ” จึงควรถามว่าทำครบแล้วหรือยัง",
    explanation: "ถูกต้อง! คำถามต้องตรวจความครบของภารกิจก่อนเลือกเส้นทาง",
  },
];

export type GateStepId = "START" | "CHECK_KEY" | "YES_OPEN" | "NO_FIND" | "END";
export type GatePiece = {
  id: GateStepId;
  label: string;
  emoji: string;
};

export const sattahipGatePieces: GatePiece[] = [
  { id: "START", label: "เริ่มต้น", emoji: "▶️" },
  { id: "CHECK_KEY", label: "มี Logic Key หรือไม่?", emoji: "◇" },
  { id: "YES_OPEN", label: "ใช่ → เปิดประตู", emoji: "✅" },
  { id: "NO_FIND", label: "ไม่ใช่ → ไปค้นหา Logic Key", emoji: "🔎" },
  { id: "END", label: "สิ้นสุด", emoji: "🏁" },
];

export const sattahipGateAnswer: Record<string, GateStepId> = {
  start: "START",
  decision: "CHECK_KEY",
  yes: "YES_OPEN",
  no: "NO_FIND",
  end: "END",
};
