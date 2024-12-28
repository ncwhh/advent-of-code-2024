import { assertEquals } from "@std/assert";
import { solvePartOne } from "./main.ts";

Deno.test(function partOne() {
  const {map, answer} = solvePartOne("input_test.txt");
  assertEquals(map,`....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..`);
  assertEquals(answer, 41);
});