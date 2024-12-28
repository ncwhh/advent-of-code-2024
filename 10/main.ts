function readInput(file_path: string) {
  return Deno
      .readTextFileSync(file_path)
      .split('\n')
      .map(line => line.split('').map(Number));
}

function findTrailheads(input: number[][]) {
    const trailheads = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 0) {
                trailheads.push({x: x, y: y})
            }
        }
    }
    return trailheads
}

function findTrailends(input: number[][], current: {x: number, y: number}) : {x: number, y: number}[] {
    if (input[current.y][current.x] === 9) {
        return [{x: current.x, y: current.y}]
    }
    const next : {x: number, y: number}[] = []

    if (current.x-1 >= 0 && input[current.y][current.x-1] - input[current.y][current.x] === 1) {
        next.push({x: current.x-1, y: current.y})
    }
    if (current.x+1 < input[current.y].length && input[current.y][current.x+1] - input[current.y][current.x] === 1) {
        next.push({x: current.x+1, y: current.y})
    }
    if (current.y-1 >= 0 && input[current.y-1][current.x] - input[current.y][current.x] === 1) {
        next.push({x: current.x, y: current.y-1})
    }
    if (current.y+1 < input.length && input[current.y+1][current.x] - input[current.y][current.x] === 1) {
        next.push({x: current.x, y: current.y+1})
    }
    return next.map(next => findTrailends(input, next)).flat()
}

function getTrailheadScore(input: number[][], trailhead: {x: number, y: number}) {
    return Array.from(new Map(findTrailends(input, trailhead)
        .map(item => [`${item.x},${item.y}`, item]))
        .values()
    ).length
}

export function solvePartOne(file_path: string) {
    const input = readInput(file_path);
    const trailheads = findTrailheads(input);
    let sum = 0

    for (let i = 0; i < trailheads.length; i++) {
        sum += getTrailheadScore(input, trailheads[i])
    }
    return sum
}

export function solvePartTwo(file_path: string) {
    const input = readInput(file_path);
    const trailheads = findTrailheads(input);
    let sum = 0

    for (let i = 0; i < trailheads.length; i++) {
        sum += findTrailends(input, trailheads[i]).length
    }
    return sum
}


console.log(`
Part One: ${solvePartOne('input.txt')}
Part Two: ${solvePartTwo('input.txt')}
`);