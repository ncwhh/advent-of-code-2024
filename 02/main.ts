function read_input(file_path: string): number[][] {
  const raw = Deno.readTextFileSync(file_path);
  const reports: number[][] = [];

  raw.split("\n").forEach((report) => {
    const levels = report.split(" ").map(Number);
    reports.push(levels);
  });

  return reports;
}

function isSave(levels: number[]): boolean {
  let increasing = true;
  let decreasing = true;
  let allowedDiff = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    const absDiff = Math.abs(diff);
    increasing &&= diff > 0;
    decreasing &&= diff < 0;
    allowedDiff &&= absDiff >= 1 && absDiff <= 3;
  }
  return (increasing || decreasing) && allowedDiff;
}

export function isTolerableSave(levels: number[], skipped = 0): boolean {
  let increasing = true;
  let decreasing = true;
  let allowedDiff = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    const inc: boolean = increasing && diff > 0;
    const dec: boolean = decreasing && diff < 0;
    const ad: boolean = allowedDiff && Math.abs(diff) >= 1 &&
      Math.abs(diff) <= 3;

    if ((inc || dec) && ad) {
      increasing = inc;
      decreasing = dec;
      allowedDiff = ad;
    } else if (skipped < 1) {
      return isTolerableSave(levels.toSpliced(0, 1), 1) ||
        isTolerableSave(levels.toSpliced(i, 1), 1);
    } else {
      return false;
    }
  }
  return (increasing || decreasing) && allowedDiff;
}

export function solvePartOne(input_path: string) {
  const reports = read_input(input_path);

  return reports.filter((report) => isSave(report)).length;
}

export function solvePartTwo(input_path: string) {
  const reports = read_input(input_path);

  return reports.filter((report) => isTolerableSave(report)).length;
}

console.log(`
Part One: ${solvePartOne("input_test_part_one.txt")}
Part Two: ${solvePartTwo("input_test_part_one.txt")}
`);
