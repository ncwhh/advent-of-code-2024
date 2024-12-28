import { assertEquals } from "@std/assert";
import {solvePartOne, solvePartTwo, getCombinationsPartOne, getCombinationsPartTwo} from "./main.ts";

Deno.test(function findCombinationsPartOne() {
  assertEquals(getCombinationsPartOne(19, [10], [], 190), [['*']]);
  assertEquals(getCombinationsPartOne(81, [40, 27], [], 3267), [['*', '+'],['+', '*']]);
  assertEquals(getCombinationsPartOne(11, [6, 16, 20], [], 292), [['+','*', '+']]);
});

Deno.test(function findCombinationsPartTwo() {
  assertEquals(getCombinationsPartTwo(15, [6], [], 156), [['||']]);
  assertEquals(getCombinationsPartTwo(6, [8, 6, 15], [], 7290), [['*', '||', '*']]);
  assertEquals(getCombinationsPartTwo(17, [8, 14], [], 192), [['||', '+']]);
});

Deno.test(function partOne() {
  assertEquals(solvePartOne("input_test.txt"), 3749);
});

Deno.test(function partOne() {
  assertEquals(solvePartTwo("input_test.txt"), 11387);
});
