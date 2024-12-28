type Point = { x: number, y: number, direction: string };
type Node = { point: Point, g: number, h: number, f: number, parent: Node | null };

function heuristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    const map = input.split("\n").map((line: string) => line.split(""));
    const start: Point = { x: NaN, y: NaN, direction: "east" };
    const end: Point = { x: NaN, y: NaN, direction: "east" };
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

function findPath(map: string[][], start: Point, end: Point): { score: number, path: Point[] } {
    const openList: Node[] = [];
    const closedList: Node[] = [];
    const startNode: Node = { point: start, g: 0, h: heuristic(start, end), f: 0, parent: null };
    startNode.f = startNode.g + startNode.h;
    openList.push(startNode);

    const directions = [
        { x: 1, y: 0, direction: "east" },
        { x: -1, y: 0, direction: "west" },
        { x: 0, y: 1, direction: "south" },
        { x: 0, y: -1, direction: "north" }
    ];

    while (openList.length > 0) {
        openList.sort((a, b) => a.f - b.f);
        const currentNode = openList.shift()!;
        closedList.push(currentNode);

        if (currentNode.point.x === end.x && currentNode.point.y === end.y) {
            const path: Point[] = [];
            let current: Node | null = currentNode;
            while (current) {
                path.push(current.point);
                current = current.parent;
            }
            return { score: currentNode.g, path: path.reverse() };
        }

        for (const dir of directions) {
            const newX = currentNode.point.x + dir.x;
            const newY = currentNode.point.y + dir.y;
            if (map[newY][newX] === "#" || closedList.find(node => node.point.x === newX && node.point.y === newY)) {
                continue;
            }

            const newDirection = dir.direction;
            const turnCost = currentNode.point.direction !== newDirection ? 1000 : 0;
            const g = currentNode.g + 1 + turnCost;
            const h = heuristic({ x: newX, y: newY, direction: newDirection }, end);
            const f = g + h;

            const existingNode = openList.find(node => node.point.x === newX && node.point.y === newY);
            if (existingNode && g < existingNode.g) {
                existingNode.g = g;
                existingNode.f = f;
                existingNode.parent = currentNode;
            } else if (!existingNode) {
                openList.push({ point: { x: newX, y: newY, direction: newDirection }, g, h, f, parent: currentNode });
            }
        }
    }

    return { score: -1, path: [] };
}

export function solvePartOne(file_path: string) {
    const { map, start, end } = readInput(file_path);
    const result = findPath(map, start, end);
    return result.score;
}

solvePartOne("input.txt");