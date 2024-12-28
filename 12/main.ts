function readInput(file_path: string): string[][] {
    const input = Deno.readTextFileSync(file_path);
    return input.split('\n').map(line => line.split(''));
}

function findRegion(input:string[][], current:{x:number, y:number}, region:Set<string>) {
  region.add(JSON.stringify(current))
  if (current.x - 1 >= 0
      && input[current.y][current.x - 1] === input[current.y][current.x]
      && !region.has(JSON.stringify({x: current.x - 1, y: current.y}))
  )
    region = region.union(findRegion(input, {x: current.x - 1, y: current.y}, region))
  if (current.x + 1 < input[current.y].length
      && input[current.y][current.x + 1] === input[current.y][current.x]
      && !region.has(JSON.stringify({x: current.x + 1, y: current.y}))
  )
    region = region.union(findRegion(input, {x: current.x + 1, y: current.y}, region))
  if (current.y - 1 >= 0
      && input[current.y - 1][current.x] === input[current.y][current.x]
      && !region.has(JSON.stringify({x: current.x, y: current.y - 1}))
  )
    region = region.union(findRegion(input, {x: current.x, y: current.y - 1}, region))
  if (current.y + 1 < input.length
      && input[current.y + 1][current.x] === input[current.y][current.x]
      && !region.has(JSON.stringify({x: current.x, y: current.y + 1}))
  )
    region = region.union(findRegion(input, {x: current.x, y: current.y + 1}, region))
  return region
}

function deduplicateStringSets(arrayOfSets: Set<string>[]): Set<string>[] {
    const uniqueSets = new Set<string>();
    const result: Set<string>[] = [];

    arrayOfSets.forEach(set => {
        const sortedSet = Array.from(set).sort().join(',');
        if (!uniqueSets.has(sortedSet)) {
            uniqueSets.add(sortedSet);
            result.push(set);
        }
    });

    return result;
}

function countFences(region: Set<string>) {
  const fields : { x:number, y:number}[] = Array.from(region).map(region => JSON.parse(region))
  let fences = 0
  for (const f of fields) {
    if (!region.has(JSON.stringify({x: f.x - 1, y: f.y}))) fences++
    if (!region.has(JSON.stringify({x: f.x + 1, y: f.y}))) fences++
    if (!region.has(JSON.stringify({x: f.x, y: f.y - 1}))) fences++
    if (!region.has(JSON.stringify({x: f.x, y: f.y + 1}))) fences++
  }
  return fences * fields.length
}

function insert(map: Map<string, number[]>, key :string, val: number) {
    if (!map.has(key)) map.set(key, [])
    map.get(key)?.push(val)
}

function countGapsAndSort(array: number[]) {
    // Array aufsteigend sortieren
    array.sort((a, b) => a - b);
    let gapCount = 1;

    // Lücken zählen
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + 1] - array[i] > 1) {
            gapCount++
        }
    }

    return gapCount
}

function countSides(input:string[][], region: Set<string>) {
  const fields : { x:number, y:number}[] = Array.from(region).map(region => JSON.parse(region))
  const sides = new Map<string, number[]>()
  for (const f of fields) {
    if (!region.has(JSON.stringify({x: f.x - 1, y: f.y}))) insert(sides, `N${f.x-1}`, f.y)
    if (!region.has(JSON.stringify({x: f.x + 1, y: f.y}))) insert(sides, `S${f.x+1}`, f.y)
    if (!region.has(JSON.stringify({x: f.x, y: f.y - 1}))) insert(sides, `W${f.y-1}`, f.x)
    if (!region.has(JSON.stringify({x: f.x, y: f.y + 1}))) insert(sides, `E${f.y+1}`, f.x)
  }
  const num_sides = sides.values().map(v => countGapsAndSort(v)).reduce((a, b) => a + b, 0)
  return num_sides * fields.length
}

export function solvePartOne(file_path: string) {
    const input = readInput(file_path);
    const regions :Set<string>[] = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            regions.push(findRegion(input, {x, y}, new Set<string>()))
        }
    }
    const uniqueRegions = deduplicateStringSets(regions)
    return uniqueRegions.map(region => countFences(region)).reduce((a, b) => a + b, 0)
}
export function solvePartTwo(file_path: string) {
    const input = readInput(file_path);
    const regions :Set<string>[] = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            regions.push(findRegion(input, {x, y}, new Set<string>()))
        }
    }
    const uniqueRegions = deduplicateStringSets(regions)
    return uniqueRegions.map(region => countSides(input, region)).reduce((a, b) => a + b, 0)
}

console.log(`
Part One: ${solvePartOne("input.txt")}
Part Two: ${solvePartTwo("input.txt")}
`)