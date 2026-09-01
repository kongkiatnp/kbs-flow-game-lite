import type { ActivityId, ChapterId } from "../types/game";

export type AppRoute =
  | { name: "start" }
  | { name: "story" }
  | { name: "map" }
  | { name: "chapter"; chapterId: ChapterId }
  | { name: "activity"; chapterId: ChapterId; activityId: ActivityId }
  | { name: "chapter-complete"; chapterId: ChapterId }
  | { name: "final" }
  | { name: "ending" }
  | { name: "not-found" };

const isChapter = (value: number): value is ChapterId =>
  [1, 2, 3, 4, 5].includes(value);
const isActivity = (value: number): value is ActivityId =>
  [1, 2, 3].includes(value);

export function parseRoute(hash: string): AppRoute {
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) return { name: "start" };
  if (parts[0] === "story") return { name: "story" };
  if (parts[0] === "map") return { name: "map" };
  if (parts[0] === "final") return { name: "final" };
  if (parts[0] === "ending") return { name: "ending" };

  if (parts[0] === "chapter") {
    const chapterId = Number(parts[1]);
    if (!isChapter(chapterId)) return { name: "not-found" };

    if (parts[2] === "complete") {
      return { name: "chapter-complete", chapterId };
    }

    if (parts[2] === "activity") {
      const activityId = Number(parts[3]);
      if (!isActivity(activityId)) return { name: "not-found" };
      return { name: "activity", chapterId, activityId };
    }

    if (parts.length === 2) return { name: "chapter", chapterId };
  }

  return { name: "not-found" };
}

export function go(path: string) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}
