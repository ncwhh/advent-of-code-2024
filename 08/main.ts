function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    const antennas :{ [key: string]: { x: number, y:number}[]} = {}
    const map = input.split('\n').map((line) => line.split(''))
    map.forEach(
        (line, y) => line.forEach(
            (char, x) => antennas[char] ? char != '.' && antennas[char].push({x, y}) : antennas[char] = [{x, y}]
        )
    )
    return {
        antennas,
        width: input.split('\n')[0].length,
        height: input.split('\n').length,
        map
    }
}

function onMap(location: { x: number, y:number}, width: number, height: number) {
    return location.x >= 0 && location.x < width && location.y >= 0 && location.y < height
}

function getAntidotesPartOne(a:{ x: number, y:number}, b:{x:number, y:number}, width: number, height: number) {
    const anti1 = { x: a.x - (b.x - a.x), y: a.y - (b.y - a.y)}
    const anti2 = { x: b.x + (b.x - a.x), y: b.y + (b.y - a.y)}
    return [anti1, anti2].filter((antidote) => onMap(antidote, width, height))
}

function getAntidotesPartTwo(a:{ x: number, y:number}, b:{x:number, y:number}, width: number, height: number) {
    const anti :{ x: number, y:number}[] = []
    //cheating a bit here, but it works
    for (let i = - width; i < width; i++) {
        anti.push({ x: a.x + i * (b.x - a.x), y: a.y + i * (b.y - a.y)})
    }
    return anti.filter((antidote) => onMap(antidote, width, height))
}

export function solvePartOne(file_path: string) {
    const input = readInput(file_path);
    const antidotes: { x: number, y:number}[] = []
    for (const [_, value] of Object.entries(input.antennas)) {
        for (let i = 0; i < value.length; i++) {
            for (let n = i + 1; n < value.length; n++) {
                antidotes.push(...getAntidotesPartOne(value[i], value[n], input.width, input.height))
            }
        }
    }

    for (const antidote of antidotes) {
        if (input.map[antidote.y][antidote.x] === '.') input.map[antidote.y][antidote.x] = '#'
    }

    return {
        map: input.map.map((line) => line.join('')).join('\n'),
        answer: new Set(antidotes.map(({x, y}) => `${x},${y}`)).size
    }
}

export function solvePartTwo(file_path: string) {
    const input = readInput(file_path);
    const antidotes: { x: number, y:number}[] = []
    for (const [_, value] of Object.entries(input.antennas)) {
        for (let i = 0; i < value.length; i++) {
            for (let n = i + 1; n < value.length; n++) {
                antidotes.push(...getAntidotesPartTwo(value[i], value[n], input.width, input.height))
            }
        }
    }

    for (const antidote of antidotes) {
        if (input.map[antidote.y][antidote.x] === '.') input.map[antidote.y][antidote.x] = '#'
    }

    return {
        map: input.map.map((line) => line.join('')).join('\n'),
        answer: new Set(antidotes.map(({x, y}) => `${x},${y}`)).size
    }
}


console.log(`
Part One: ${solvePartOne("input.txt").answer}
Part Two: ${solvePartTwo("input.txt").answer}
`);
