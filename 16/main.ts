function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    const map = input.split("\n").map((line: string) => line.split(""));
    const start: { x: number, y: number, direction : string } = { x: NaN, y: NaN, direction: "east" };
    const end: { x: number, y: number } = { x: NaN, y: NaN };
    map.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char === "S") {
                start.x = x;
                start.y = y;
            } else if (char === "E") {
                end.x = x;
                end.y = y;
            }
        });
    });
    return { map, start, end };
}

function findPath(
    map: string[][],
    current: { x: number, y: number, direction:string },
    visited: { x: number, y: number, direction:string }[],
    score:number
): { score: number, path: { x: number, y: number, direction:string }[]}[] {
    const vis = [...visited, {...current, score}]

    if (map[current.y][current.x] === "E") return [{score, path: vis}]

    score += 1
    let paths :{ score: number, path: { x: number, y: number, direction:string }[]}[]  = [];

    if (map[current.y][current.x + 1] !== "#" && !vis.find((v) => v.x === current.x + 1 && v.y === current.y)) {
      paths = paths.concat(findPath(map, { ...current, x: current.x + 1, direction: "east" }, vis, (current.direction !== "east") ? score + 1000: score))
    }
    if (map[current.y][current.x - 1] !== "#" && !vis.find((v) => v.x === current.x - 1 && v.y === current.y)) {
      paths = paths.concat(findPath(map, { ...current, x: current.x - 1, direction: "west" }, vis, (current.direction !== "west") ? score + 1000: score))
    }
    if (map[current.y + 1][current.x] !== "#" && !vis.find((v) => v.x === current.x && v.y === current.y + 1)) {
      paths = paths.concat(findPath(map, { ...current, y: current.y + 1, direction: "south"}, vis, (current.direction !== "south") ? score + 1000: score))
    }
    if (map[current.y - 1][current.x] !== "#" && !vis.find((v) => v.x === current.x && v.y === current.y - 1)) {
      paths = paths.concat(findPath(map, { ...current, y: current.y - 1, direction: "north" }, vis, (current.direction !== "north") ? score + 1000: score))
    }
    return paths
}

export function solvePartOne(file_path: string) {
    const { map, start} = readInput(file_path);
    const paths = findPath(map, start, [], 0);
    // get path with lowest score
    const path = paths.sort((a, b) => a.score - b.score)[0]
    return path.score;
}
