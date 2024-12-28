function readInput(file_path: string) {
  const raw = Deno.readTextFileSync(file_path);
  const left: number[] = [];
  const right: number[] = [];

  raw.split("\n").forEach((line) => {
    const [l, r] = line.split("   ").map(Number);
    left.push(l);
    right.push(r);
  });

  return { left, right };
}

function distanceSum(a: number[], b: number[]) {
  return a.reduce((sum, val, i) => sum + Math.abs(val - b[i]), 0);
}

function similarityScore(a: number[], b: number[]) {
  return a.reduce(
    (sum, val) => sum + val * b.filter((bv) => val === bv).length,
    0,
  );
}

export function solvePartOne(input_path: string) {
  const input = readInput(input_path);

  input.left.sort();
  input.right.sort();

  return distanceSum(input.left, input.right);
}

export function solvePartTwo(input_path: string) {
  const input = readInput(input_path);
  return similarityScore(input.left, input.right);
}

console.log(`
Part One: ${solvePartOne("input_test.txt")}
Part Two: ${solvePartTwo("input_test.txt")}
`);
