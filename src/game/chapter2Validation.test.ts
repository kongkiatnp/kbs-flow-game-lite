import { describe, expect, it } from "vitest";
import {
  isMissingStepCorrect,
  validateExactOrder,
} from "./chapter2Validation";

describe("Chapter 2 validation", () => {
  it("accepts the exact sequence", () => {
    expect(
      validateExactOrder(
        ["wake", "bag", "shoes", "leave"],
        ["wake", "bag", "shoes", "leave"],
      ),
    ).toBe(true);
  });

  it("rejects a swapped sequence", () => {
    expect(
      validateExactOrder(
        ["wake", "shoes", "bag", "leave"],
        ["wake", "bag", "shoes", "leave"],
      ),
    ).toBe(false);
  });

  it("checks missing steps exactly", () => {
    expect(
      isMissingStepCorrect("แสดงข้อความต้อนรับ", "แสดงข้อความต้อนรับ"),
    ).toBe(true);
    expect(
      isMissingStepCorrect("เปิดเพลง", "แสดงข้อความต้อนรับ"),
    ).toBe(false);
  });
});
