function readInput(file_path: string) {
  const raw = Deno.readTextFileSync(file_path);
  return raw.split("\n").map((line) => line.split(""));
}

export function solvePartOne(input_path: string) {
  const input = readInput(input_path);

  let num = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const leftToRight = input[y][x] == "X" &&
        x + 3 < input[y].length &&
        input[y]![x + 1]! == "M" &&
        input[y][x + 2] == "A" &&
        input[y][x + 3] == "S";
      const rightToLeft = input[y][x] == "X" &&
        x - 3 >= 0 &&
        input[y][x - 1] == "M" &&
        input[y][x - 2] == "A" &&
        input[y][x - 3] == "S";
      const topToBottom = input[y][x] == "X" &&
        y + 3 < input.length &&
        input[y + 1][x] == "M" &&
        input[y + 2][x] == "A" &&
        input[y + 3][x] == "S";
      const bottomToTop = input[y][x] == "X" &&
        y - 3 >= 0 &&
        input[y - 1][x] == "M" &&
        input[y - 2][x] == "A" &&
        input[y - 3][x] == "S";
      const diagonalTopLeftToBottomRight = input[y][x] == "X" &&
        y + 3 < input.length && x + 3 < input[y].length &&
        input[y + 1][x + 1] == "M" &&
        input[y + 2][x + 2] == "A" &&
        input[y + 3][x + 3] == "S";
      const diagonalTopRightToBottomLeft = input[y][x] == "X" &&
        y + 3 < input.length && x - 3 >= 0 &&
        input[y + 1][x - 1] == "M" &&
        input[y + 2][x - 2] == "A" &&
        input[y + 3][x - 3] == "S";
      const diagonalBottomLeftToTopRight = input[y][x] == "X" &&
        y - 3 >= 0 && x + 3 < input[y].length &&
        input[y - 1][x + 1] == "M" &&
        input[y - 2][x + 2] == "A" &&
        input[y - 3][x + 3] == "S";
      const diagonalBottomRightToTopLeft = input[y][x] == "X" &&
        y - 3 >= 0 && x - 3 >= 0 &&
        input[y - 1][x - 1] == "M" &&
        input[y - 2][x - 2] == "A" &&
        input[y - 3][x - 3] == "S";
      if (leftToRight) num++;
      if (rightToLeft) num++;
      if (topToBottom) num++;
      if (bottomToTop) num++;
      if (diagonalTopLeftToBottomRight) num++;
      if (diagonalTopRightToBottomLeft) num++;
      if (diagonalBottomLeftToTopRight) num++;
      if (diagonalBottomRightToTopLeft) num++;
    }
  }
  return num;
}

export function solvePartTwo(input_path: string) {
  const input = readInput(input_path);
  let num = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (
        y - 1 >= 0 && y + 1 < input.length &&
        x - 1 >= 0 && x + 1 < input[y].length &&
        input[y][x] == "A" &&
        ((
          input[y - 1][x - 1] == "M" &&
          input[y - 1][x + 1] == "M" &&
          input[y + 1][x - 1] == "S" &&
          input[y + 1][x + 1] == "S"
        ) || (
          input[y - 1][x - 1] == "S" &&
          input[y - 1][x + 1] == "M" &&
          input[y + 1][x - 1] == "S" &&
          input[y + 1][x + 1] == "M"
        ) || (
          input[y - 1][x - 1] == "S" &&
          input[y - 1][x + 1] == "S" &&
          input[y + 1][x - 1] == "M" &&
          input[y + 1][x + 1] == "M"
        ) || (
          input[y - 1][x - 1] == "M" &&
          input[y - 1][x + 1] == "S" &&
          input[y + 1][x - 1] == "M" &&
          input[y + 1][x + 1] == "S"
        ))
      ) {
        num++;
      }
    }
  }
  return num;
}

console.log(`
Part One: ${solvePartOne("input_test.txt")}
Part Two: ${solvePartTwo("input_test.txt")}
`);
