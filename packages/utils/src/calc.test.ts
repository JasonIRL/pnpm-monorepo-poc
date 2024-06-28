import { expect, test } from 'vitest';
import { add, subtract } from './calc';

test('add', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtract', () => {
  expect(subtract(2, 1)).toBe(1);
});
