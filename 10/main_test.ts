import { assertEquals } from "@std/assert";
import { solvePartOne,solvePartTwo } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne('input_test.txt'), 36);
});

Deno.test(function partTwo() {
  assertEquals(solvePartTwo('input_test.txt'), 81);
});
