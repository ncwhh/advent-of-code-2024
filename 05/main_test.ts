import { assertEquals } from "@std/assert";
import { solvePartOne, solvePartTwo } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne("input_test.txt"), 143);
});

Deno.test(function partOne() {
  assertEquals(solvePartTwo("input_test.txt"), 123);
});
