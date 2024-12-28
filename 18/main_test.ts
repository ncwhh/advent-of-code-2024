import { assertEquals } from "@std/assert";
import { solvePartOne } from "./main.ts";

Deno.test(function partOne() {
  assertEquals(solvePartOne('input_test.txt', 7, 7, 12), 22);
});
