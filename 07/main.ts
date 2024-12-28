function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    return input.split('\n').map((line) => {
        const [result , rest] = line.split(': ')
        const operands = rest.split(' ').map(Number)
        return { result: Number.parseInt(result), operands};
    })
}

export function getCombinationsPartOne(interim: number, operands:number[], operators:string[], result:number):string[][] {
    if (operands.length === 0 || interim > result) {
        return interim === result ? [operators] : [];
    } else {
        const [first, ...rest] = operands;
        const multiplication_interim = interim * first;
        const addition_interim = interim + first;
        return getCombinationsPartOne(multiplication_interim, rest, [...operators, '*'], result)
            .concat(getCombinationsPartOne(addition_interim, rest, [...operators, '+'], result))
    }
}

export function getCombinationsPartTwo(interim: number, operands:number[], operators:string[], result:number):string[][] {
    if (operands.length === 0 || interim > result) {
        return interim === result ? [operators] : [];
    } else {
        const [first, ...rest] = operands;
        const multiplication_interim = interim * first;
        const addition_interim = interim + first;
        const concat_interim = Number.parseInt(interim.toString() + first.toString());
        return getCombinationsPartTwo(multiplication_interim, rest, [...operators, '*'], result)
            .concat(getCombinationsPartTwo(addition_interim, rest, [...operators, '+'], result))
            .concat(getCombinationsPartTwo(concat_interim, rest, [...operators, '||'], result))
    }
}

export function isSolvablePartOne(result: number, operands: number[]):boolean {
    return getCombinationsPartOne(operands[0], operands.slice(1), [], result).length > 0
}

export function isSolvablePartTwo(result: number, operands: number[]):boolean {
    return getCombinationsPartTwo(operands[0], operands.slice(1), [], result).length > 0
}

export function solvePartOne(file_path: string) {
    const input = readInput(file_path);
    return input
        .filter(({ result, operands}) => isSolvablePartOne(result, operands))
        .reduce((acc, { result, operands}) => acc + result, 0)

}

export function solvePartTwo(file_path: string) {
    const input = readInput(file_path);
    return input
        .filter(({ result, operands}) => isSolvablePartTwo(result, operands))
        .reduce((acc, { result, operands}) => acc + result, 0)
}

console.log(`
Part One: ${solvePartOne("input_test.txt")}
Part Two: ${solvePartTwo("input_test.txt")}
`);
