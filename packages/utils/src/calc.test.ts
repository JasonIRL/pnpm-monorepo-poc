import { expect, test } from "vitest";
import { add } from "./calc";

test("add", () => {
  expect(add(1, 2)).toBe(3);
});
