import { assertEquals } from "@std/assert";
import { solvePartOne } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne('input_test.txt'), 2028);
});
