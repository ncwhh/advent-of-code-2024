import { assertEquals } from "@std/assert";
import { isTolerableSave, solvePartOne, solvePartTwo } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne("input_test_part_one.txt"), 2);
});

Deno.test(function isTolerableSafe() {
  assertEquals(isTolerableSave([1, 2, 3, 42, 6, 8]), true);
  assertEquals(isTolerableSave([42, 2, 3, 4, 5, 6]), true);
  assertEquals(isTolerableSave([1, 2, 3, 4, 5, 42]), true);
  assertEquals(isTolerableSave([1, 2, 3, 4, 42, 42]), false);
  assertEquals(isTolerableSave([1, 2, 3, 4, 5, 42]), true);
});

Deno.test(function partTwo() {
  assertEquals(solvePartTwo("input_test_part_one.txt"), 4);
});
