function readInput(file_path: string) {
  const raw = Deno.readTextFileSync(file_path);
  const lines = raw.split("\n");

  const rules: { [k: number]: number[] } = {};
  lines.slice(0, lines.indexOf("")).forEach((line) => {
    const [key, value] = line.split("|").map(Number);
    rules[key] = rules[key] || [];
    rules[key].push(value);
  });
  const updates = lines.slice(lines.indexOf("") + 1, lines.length).map((line) =>
    line.split(",").map(Number)
  );
  return { rules, updates };
}

function isIncorrect(update: number[], rules: { [k: number]: number[] }) {
  for (let p = 0; p < update.length; p++) {
    if (update.slice(0, p).some((value) => rules[update[p]]?.includes(value))) {
      return true;
    }
  }
  return false;
}

function fix(update: number[], rules: { [k: number]: number[] }) {
  const newUpdate = update.slice();
  for (let p = 0; p < newUpdate.length; p++) {
    for (let i = 0; i < p; i++) {
      if (rules[newUpdate[p]]?.includes(newUpdate[i])) {
        const temp = newUpdate[p];
        newUpdate[p] = newUpdate[i];
        newUpdate[i] = temp;
      }
    }
  }
  return newUpdate;
}

export function solvePartTwo(input_path: string) {
  const input = readInput(input_path);

  const updates = input.updates
    .filter((update) => isIncorrect(update, input.rules))
    .map((update) => fix(update, input.rules));

  return updates
    .map((update) => update[Math.floor(update.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

export function solvePartOne(input_path: string) {
  const input = readInput(input_path);

  return input.updates.filter((update) => {
    for (let p = 0; p < update.length; p++) {
      if (
        update.slice(0, p).some((value) =>
          input.rules[update[p]]?.includes(value)
        )
      ) {
        console.log(
          `${update} includes ${update[p]}|${input.rules[update[p]]}`,
        );
        return false;
      }
    }
    return true;
  }).map((update) => update[Math.floor(update.length / 2)]).reduce(
    (acc, curr) => acc + curr,
    0,
  );
}

console.log(`
Part One: ${solvePartOne("input_test.txt")}
Part Two: ${solvePartTwo("input_test.txt")}
`);
