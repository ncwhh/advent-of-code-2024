import { assertEquals } from "@std/assert";
import { solvePartOne } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne('input_test_1.txt'), 7036);
  assertEquals(solvePartOne('input_test_2.txt'), 11048);
});
