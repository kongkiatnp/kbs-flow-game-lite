export function validateExactOrder(
  current: Array<string | null>,
  expected: string[],
): boolean {
  return (
    current.length === expected.length &&
    current.every((value, index) => value === expected[index])
  );
}

export function isMissingStepCorrect(
  selected: string | null,
  expected: string,
): boolean {
  return selected === expected;
}
