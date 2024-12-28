function readInputPartOne(file_path: string) {
  const raw = Deno.readTextFileSync(file_path);
  return raw.match(/mul\([0-9]+,[0-9]+\)/g);
}

function readInputPartTwo(file_path: string) {
  const raw = Deno.readTextFileSync(file_path);
  return raw.match(/(mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\))/g);
}

export function solvePartOne(input_path: string) {
  const instructions = readInputPartOne(input_path);
  let sum = 0;

  instructions?.forEach((instruction) => {
    const [a, b] = instruction.match(/[0-9]+/g)!.map(Number);
    sum += a * b;
  });

  return sum;
}

export function solvePartTwo(input_path: string) {
  const instructions = readInputPartTwo(input_path);
  let enabled = true;
  let sum = 0;

  instructions?.forEach((instruction) => {
    switch (instruction) {
      case "do()":
        enabled = true;
        break;
      case "don't()":
        enabled = false;
        break;
      default:
        if (enabled) {
          const [a, b] = instruction.match(/[0-9]+/g)!.map(Number);
          sum += a * b;
        }
    }
  });

  return sum;
}

console.log(`
Part One: ${solvePartOne("input_test_part_one.txt")}
Part Two: ${solvePartTwo("input_test_part_two.txt")}
`);
