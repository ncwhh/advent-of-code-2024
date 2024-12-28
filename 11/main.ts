function readInput(file_path: string) {
  const input = Deno.readTextFileSync(file_path);
  return input.split(" ");
}

export function blink(input: string[]): string[] {
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "0") {
      input[i] = "1";
    } else if (input[i].length % 2 === 0) {
      const half = input[i].length / 2;
      input.splice(i + 1, 0, String(Number.parseInt(input[i].slice(half))));
      input.splice(i, 1, input[i].slice(0, half));
      i++;
    } else {
      input[i] = String(Number.parseInt(input[i]) * 2024);
    }
  }
  return input;
}

export function blinkOptimized(input: string, blinks: number): number {
  if (blinks === 0) return 1;
  else if (input === "0") {
    return blinkOptimized("1", blinks - 1);
  } else if (input.length % 2 === 0) {
    const half = input.length / 2;
    return blinkOptimized(input.slice(0, half), blinks - 1)
        + blinkOptimized(String(Number.parseInt(input.slice(half))), blinks - 1);
  } else {
    return blinkOptimized(String(Number.parseInt(input) * 2024), blinks - 1);
  }
}

export function solvePartOne(file_path: string) {
  const input = readInput(file_path);
  return input.map((i) => blinkOptimized(i, 25)).reduce((a, b) => a + b);
}


console.log(`
Part One: ${solvePartOne("input.txt")}
`);
