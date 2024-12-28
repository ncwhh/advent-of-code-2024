import { assertEquals } from "@std/assert";
import {blink, blinkOptimized, solvePartOne} from "./main.ts";

Deno.test(function testBlink() {
  const input = ["125", "17"];
  for (let i = 0; i < 6; i++) blink(input)
  assertEquals(input, [
    "2097446912",
    "14168",
    "4048",
    "2",
    "0",
    "2",
    "4",
    "40",
    "48",
    "2024",
    "40",
    "48",
    "80",
    "96",
    "2",
    "8",
    "6",
    "7",
    "6",
    "0",
    "3",
    "2",
  ]);
});

Deno.test(function testBlinkOptimized() {
    assertEquals(["125", "17"].map((i) => blinkOptimized(i, 25)).reduce((a, b) => a + b), 55312);
})

Deno.test(function partOne() {
    assertEquals(solvePartOne("input_test.txt"), 55312);
})