function readInputPartOne(file_path: string) {
  const input = Deno.readTextFileSync(file_path);
  const [top, bottom] = input.split("\n\n");
  const map = top.split("\n").map((line) => line.split(""));
  const moves = bottom.replaceAll("\n", "").split("");
  const robot = { x: NaN, y: NaN };
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "@") {
        robot.x = x;
        robot.y = y;
      }
    });
  });
  return { map, moves, robot };
}

function readInputPartTwo(file_path: string) {
  const input = Deno.readTextFileSync(file_path);
  const [top, bottom] = input.split("\n\n");
  const map = top.split("\n").map((line) => {
    return line
        .split("")
        .flatMap((cell) => {
          switch (cell) {
            case "@":
              return ["@", "."];
            case "O":
              return ["[", "]"];
            default:
              return [cell, cell];
          }
        });
  });
  const moves = bottom.replaceAll("\n", "").split("");
  const robot = { x: NaN, y: NaN };
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "@") {
        robot.x = x;
        robot.y = y;
      }
    });
  });
  return { map, moves, robot };
}

function getNextCoordinates(location : {x: number, y: number}, direction: string) {
    switch (direction) {
        case "^":
        return { x: location.x, y: location.y - 1 };
        case "v":
        return { x: location.x, y: location.y + 1 };
        case "<":
        return { x: location.x - 1, y: location.y };
        case ">":
        return { x: location.x + 1, y: location.y };
        default:
        return { x: NaN, y: NaN };
    }
}

function move(
  map: string[][],
  direction: string,
  location: { x: number; y: number },
) {
  const target = getNextCoordinates(location, direction);
  switch (map[target.y][target.x]) {
    case ".":
      map[target.y][target.x] = map[location.y][location.x];
      map[location.y][location.x] = ".";
      return true;
    case "O":
      if (move(map, direction, { ...target })) {
        map[target.y][target.x] = map[location.y][location.x];
        map[location.y][location.x] = ".";
        return true;
      } else return false;
    default:
      return false;
  }
}

function calcScore(map: string[][]) {
  let score = 0;
  map.forEach((row,y) => {
    row.forEach((cell, x) => {
      if (cell === "O") score += 100 * y + x
    });
  });
  return score;
}

function printMap(map: string[][]) {
  const str = map.map((row) => row.join("")).join("\n");
  console.log(str);
}

export function solvePartOne(file_path: string) {
  let { map, moves, robot } = readInputPartOne(file_path);
  for (let i = 0; i < moves.length; i++) {
    if (move(map, moves[i], robot)) robot = getNextCoordinates(robot, moves[i]);
  }
  printMap(map);
  return calcScore(map);
}

console.log(`
Part One: ${solvePartOne("input.txt")}
`);
