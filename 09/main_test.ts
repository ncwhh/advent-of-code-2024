import { assertEquals } from "@std/assert";
import {solvePartOne, solvePartTwo} from "./main.ts";

Deno.test(function example() {
  const { disk } = solvePartOne("input_example.txt");
  assertEquals(disk, '022111222......');
});

Deno.test(function partOne() {
  const { answer, disk } = solvePartOne("input_test.txt");
  assertEquals(disk, '0099811188827773336446555566..............');
  assertEquals(answer, 1928);
});

Deno.test(function partTwo() {
  const { answer, disk } = solvePartTwo("input_test.txt");
  assertEquals(disk, '00992111777.44.333....5555.6666.....8888..');
  assertEquals(answer, 2858);
});
