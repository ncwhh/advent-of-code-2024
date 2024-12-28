function readInputPartOne(file_path: string) {
    const diskMap = Deno.readTextFileSync(file_path).split('').map(Number);
    let  disk :string[] = []
    let is_file = true
    let file_id = 0
    for (let i = 0; i < diskMap.length; i++) {
      const block = is_file ? Array(diskMap[i]).fill(file_id.toString()) : Array(diskMap[i]).fill('.')
      disk = disk.concat(block)
      is_file = !is_file
      if (is_file) file_id++
    }
    return disk
}

function readInputPartTwo(file_path: string) {
    const diskMap = Deno.readTextFileSync(file_path).split('').map(Number);
    const disk :string[][] = []
    let is_file = true
    let file_id = 0
    for (let i = 0; i < diskMap.length; i++) {
      const block= is_file ? Array(diskMap[i]).fill(file_id.toString()) : Array(diskMap[i]).fill('.')
      disk.push(block)
      is_file = !is_file
      if (is_file) file_id++
    }
    return disk
}

function getChecksum(input: string[]) {
  let checksum = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== '.') checksum += Number(input[i]) * i
  }
  return checksum
}

export function solvePartOne(file_path: string) {
  const input = readInputPartOne(file_path);
  let put_index = 0
  let take_index = input.length - 1

  do {
    while (input[put_index] !== '.') put_index++
    while (input[take_index] === '.') take_index--
    if (put_index < take_index) {
      input[put_index] = input[take_index]
      input[take_index] = '.'
    }
  } while (put_index < take_index)

  return {
    answer: getChecksum(input),
    disk: input.join('')
  }
}

export function solvePartTwo(file_path: string) {
  const input = readInputPartTwo(file_path);
  for (let i = input.length - 1; i >= 0; i--) {
    if (!input[i].includes('.')) {
        const file_length = input[i].length
        for (let n = 0; n < i; n++) {
            if (input[n].includes('.') && input[n].length >= file_length) {
                const space_length = input[n].length
                input.splice(n, 1, input[i])
                input.splice(i, 1, Array(file_length).fill('.'))
                if (space_length > file_length) input.splice(n+1, 0, Array(space_length - file_length).fill('.'))
                break
            }
        }
    }
  }

  return {
    answer: getChecksum(input.flat()),
    disk: input.flat().join('')
  }
}

console.log(`
Part One: ${solvePartOne("input.txt").answer}
Part Two: ${solvePartTwo("input.txt").answer}
`);
