function readInput(file_path: string) {
  const input = Deno.readTextFileSync(file_path);
  return input.split("\n").map((line: string) => {
    const [p, v] = line.split(" ");
    const [px, py] = p.split("=")[1].split(",").map(Number);
    const [vx, vy] = v.split("=")[1].split(",").map(Number);
    return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
  });
}

function move(
  robot: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
  },
  time: number,
  width: number,
  height: number,
) {
  robot.position.x = (robot.position.x + robot.velocity.x * time) % width;
  robot.position.y = (robot.position.y + robot.velocity.y * time) % height;
  return robot;
}

export function solvePartOne(
  file_path: string,
  width: number,
  height: number,
  time: number,
) {
  const robots = readInput(file_path);

  robots.map((robot) => {
    const newx = robot.position.x + robot.velocity.x * time;
    robot.position.x = (newx < 0)
      ? (newx % width + width) % width
      : newx % width;

    const newy = robot.position.y + robot.velocity.y * time;
    robot.position.y = (newy < 0)
      ? (newy % height + height) % height
      : newy % height;
    return robot;
  });

  const map: number[][] = new Array(height).fill(0).map(() =>
    new Array(width).fill(0)
  );
  robots.forEach((robot) => {
    map[robot.position.y][robot.position.x] += 1;
  });

  const top = map.slice(0, Math.floor(height / 2));
  const bottom = map.slice(Math.round(height / 2), height);
  const topLeft = top.map((row) => row.slice(0, Math.floor(width / 2)));
  const topRight = top.map((row) => row.slice(Math.round(width / 2), width));
  const bottomLeft = bottom.map((row) => row.slice(0, Math.floor(width / 2)));
  const bottomRight = bottom.map((row) =>
    row.slice(Math.round(width / 2), width)
  );

  printMap(map);

  return [topLeft, topRight, bottomLeft, bottomRight].map(countRobots).reduce(
    (acc, count) => acc * count,
    1,
  );
}

export function solvePartTwo(file_path: string, width: number, height: number) {
  const robots = readInput(file_path);

  for (let t  = 0; t < 300; t++) {
    // found pattern on every 103rd iteration beginning from 33 by looking at the output
    const i = 33+ t*103;
    const new_robot = robots.map((robot) => {
      const newx = robot.position.x + robot.velocity.x * i;
      const x = (newx < 0)
        ? (newx % width + width) % width
        : newx % width;

      const newy = robot.position.y + robot.velocity.y * i;
      const y = (newy < 0)
        ? (newy % height + height) % height
        : newy % height;
      return { position: { x, y }, velocity: robot.velocity };
    });

    const map: number[][] = new Array(height).fill(0).map(() =>
      new Array(width).fill(0)
    );
    new_robot.forEach((robot) => {
      map[robot.position.y][robot.position.x] += 1;
    });
    const image = map.map((row) =>
      row.map((cell) => cell === 0 ? "." : "#").join("")
    ).join("\n");
    Deno.writeTextFileSync(`output/${i}.txt`, image);
  }
}

function countRobots(map: number[][]) {
  return map.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0),
    0,
  );
}

function printMap(map: number[][]) {
  console.debug(
    map.map((row) =>
      row.map((cell) => cell === 0 ? "." : String(cell)).join("")
    ).join("\n"),
  );
}

console.log(solvePartOne("input.txt", 101, 103, 1000));
solvePartTwo("input.txt", 101, 103);
