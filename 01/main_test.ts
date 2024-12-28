import { assertEquals } from "@std/assert";
import { solvePartOne, solvePartTwo } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne("input_test_part_one.txt"), 11);
});

Deno.test(function partTwo() {
  assertEquals(solvePartTwo("input_test_part_one.txt"), 31);
});
