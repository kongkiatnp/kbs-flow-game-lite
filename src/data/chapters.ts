import type { ChapterId, CoreId } from "../types/game";

export type ChapterDefinition = {
  id: ChapterId;
  tambon: string;
  subtitle: string;
  topic: string;
  core: CoreId;
  colorClass: string;
  story: string;
  learningPoints: string[];
};

export const chapters: ChapterDefinition[] = [
  {
    id: 1,
    tambon: "นาจอมเทียน",
    subtitle: "THE LOST SYMBOL",
    topic: "สัญลักษณ์ผังงาน",
    core: "SYMBOL",
    colorClass: "chapter-gold",
    story: "ป้ายคำสั่งของระบบหายไป ช่วย KBS-AI กู้คืนความหมายของสัญลักษณ์ผังงาน",
    learningPoints: [
      "Start / End",
      "Process",
      "Input / Output",
      "Decision",
      "Arrow",
    ],
  },
  {
    id: 2,
    tambon: "บางเสร่",
    subtitle: "THE MIXED-UP HARBOR",
    topic: "ผังงานแบบลำดับ",
    core: "SEQUENCE",
    colorClass: "chapter-coral",
    story: "ระบบท่าเรือทำงานผิดลำดับ ต้องจัดขั้นตอนให้กลับมาถูกต้อง",
    learningPoints: ["ก่อน–หลัง", "ลูกศร", "ลำดับขั้นตอน", "เติมขั้นตอนที่หายไป"],
  },
  {
    id: 3,
    tambon: "สัตหีบ",
    subtitle: "THE TWO PATHS",
    topic: "การตัดสินใจ (If–Else)",
    core: "DECISION",
    colorClass: "chapter-blue",
    story: "ประตูพลังงานไม่รู้ว่าจะเลือกทางใด เรียนรู้เงื่อนไข ใช่ / ไม่ใช่ เพื่อเปิดเส้นทาง",
    learningPoints: ["Decision", "เงื่อนไข", "ใช่", "ไม่ใช่"],
  },
  {
    id: 4,
    tambon: "แสมสาร",
    subtitle: "THE ENDLESS LOOP",
    topic: "การวนซ้ำ (Loop)",
    core: "LOOP",
    colorClass: "chapter-green",
    story: "หุ่นยนต์ทะเลทำงานซ้ำไม่หยุด ต้องค้นหาเงื่อนไขที่จะทำให้ Loop สิ้นสุด",
    learningPoints: ["ทำซ้ำ", "ตัวนับ", "เงื่อนไขหยุด", "ออกจาก Loop"],
  },
  {
    id: 5,
    tambon: "พลูตาหลวง",
    subtitle: "THE FINAL FLOW",
    topic: "ทบทวนครบทุกเรื่อง",
    core: "MASTER",
    colorClass: "chapter-purple",
    story: "เดินทางเข้าสู่โรงเรียนบ้านเขาบายศรี รวบรวมทุกความรู้เพื่อปลุก Master Core",
    learningPoints: ["Symbols", "Sequence", "Decision", "Loop"],
  },
];

export const getChapter = (id: ChapterId) =>
  chapters.find((chapter) => chapter.id === id)!;
