export type FlowSymbolId =
  | "START_END"
  | "PROCESS"
  | "INPUT_OUTPUT"
  | "DECISION"
  | "ARROW";

export type FlowSymbolDefinition = {
  id: FlowSymbolId;
  label: string;
  shortLabel: string;
  meaning: string;
  hint: string;
};

export const flowSymbols: FlowSymbolDefinition[] = [
  {
    id: "START_END",
    label: "เริ่มต้น / สิ้นสุด",
    shortLabel: "Start / End",
    meaning: "ใช้แสดงจุดเริ่มต้นหรือจุดสิ้นสุดของผังงาน",
    hint: "มองหารูปวงรี ใช้ตอนเริ่มและตอนจบของผังงาน",
  },
  {
    id: "PROCESS",
    label: "กระบวนการ",
    shortLabel: "Process",
    meaning: "ใช้แสดงการทำงานหรือคำสั่งที่ต้องทำ",
    hint: "รูปสี่เหลี่ยมผืนผ้า มักเป็นขั้นตอนที่ต้องลงมือทำ",
  },
  {
    id: "INPUT_OUTPUT",
    label: "รับข้อมูล / แสดงผล",
    shortLabel: "Input / Output",
    meaning: "ใช้รับข้อมูลเข้าสู่ระบบ หรือแสดงผลลัพธ์ออกมา",
    hint: "รูปสี่เหลี่ยมด้านขนาน ใช้กับการรับข้อมูลหรือแสดงผล",
  },
  {
    id: "DECISION",
    label: "การตัดสินใจ",
    shortLabel: "Decision",
    meaning: "ใช้ตรวจเงื่อนไขหรือคำถามที่อาจแยกเป็นหลายทาง",
    hint: "รูปสี่เหลี่ยมข้าวหลามตัด มักมีคำถาม เช่น ใช่ / ไม่ใช่",
  },
  {
    id: "ARROW",
    label: "ลูกศร",
    shortLabel: "Arrow",
    meaning: "ใช้บอกทิศทางและลำดับการไหลของผังงาน",
    hint: "ลูกศรทำหน้าที่เชื่อมแต่ละขั้นตอนและบอกว่าจะไปทางไหนต่อ",
  },
];

export type SymbolChoiceQuestion = {
  id: string;
  prompt: string;
  correct: FlowSymbolId;
  hint: string;
  explanation: string;
};

export const chapter1ChoiceQuestions: SymbolChoiceQuestion[] = [
  {
    id: "CH01-A02-Q01",
    prompt: "“รับชื่อผู้เล่น” ควรใช้สัญลักษณ์ใด?",
    correct: "INPUT_OUTPUT",
    hint: "คำว่า “รับ” หมายถึงมีข้อมูลเข้าสู่ระบบ",
    explanation: "ถูกต้อง! การรับชื่อเป็น Input จึงใช้สัญลักษณ์ Input / Output",
  },
  {
    id: "CH01-A02-Q02",
    prompt: "“ผ่านภารกิจแล้วหรือยัง?” ควรใช้สัญลักษณ์ใด?",
    correct: "DECISION",
    hint: "ประโยคนี้เป็นคำถามที่ต้องตรวจเงื่อนไขก่อนเลือกทาง",
    explanation: "ถูกต้อง! คำถามที่มีผลลัพธ์ เช่น ใช่ / ไม่ใช่ ใช้ Decision",
  },
  {
    id: "CH01-A02-Q03",
    prompt: "“แสดงข้อความว่า ภารกิจสำเร็จ!” ควรใช้สัญลักษณ์ใด?",
    correct: "INPUT_OUTPUT",
    hint: "คำว่า “แสดงข้อความ” คือการส่งผลลัพธ์ออกให้ผู้เล่นเห็น",
    explanation: "ถูกต้อง! การแสดงข้อความเป็น Output จึงใช้ Input / Output",
  },
];

export type FlowBuildPiece = {
  id: string;
  symbol: FlowSymbolId;
  label: string;
};

export const chapter1FlowPieces: FlowBuildPiece[] = [
  { id: "start", symbol: "START_END", label: "เริ่มต้น" },
  { id: "input", symbol: "INPUT_OUTPUT", label: "รับชื่อผู้เล่น" },
  { id: "output", symbol: "INPUT_OUTPUT", label: "แสดง “ยินดีต้อนรับ”" },
  { id: "end", symbol: "START_END", label: "สิ้นสุด" },
];

export const chapter1FlowAnswer = ["start", "input", "output", "end"];
