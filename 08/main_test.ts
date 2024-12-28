import { assertEquals } from "@std/assert";
import {solvePartOne, solvePartTwo} from "./main.ts";

Deno.test(function partOne() {
    const { answer, map } = solvePartOne("input_test.txt");
    assertEquals(answer, 14);
    assertEquals(map,
`......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.`,
    );
});

Deno.test(function partOne() {
    const { answer, map } = solvePartTwo("input_test.txt");
    assertEquals(answer, 34);
    assertEquals(map,
`##....#....#
.#.#....0...
..#.#0....#.
..##...0....
....0....#..
.#...#A....#
...#..#.....
#....#.#....
..#.....A...
....#....A..
.#........#.
...#......##`)
});


