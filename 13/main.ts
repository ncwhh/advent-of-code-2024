function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    return input.split('\n\n').map(m => {
        const [a, b, p] = m.split('\n')
        const [ax, ay] = (a?.match(/(\d+)/g) || []).map(Number)
        const [bx, by] = (b?.match(/(\d+)/g) || []).map(Number)
        const [px, py] = (p?.match(/(\d+)/g) || []).map(Number)
        return {
            button_a: {x: ax, y: ay},
            button_b: {x: bx, y: by},
            price: {x: px, y: py}
        }
    })
}

// Thx ChatGPT :D
function determineTokens(button_a: { x: number, y: number }, button_b: { x: number, y: number }, price: { x: number, y: number }) {
    const coefficients = [
        [button_a.x, button_b.x],
        [button_a.y, button_b.y]
    ];
    const constants = [price.x, price.y];

    // Helper function to calculate determinant of a 2x2 matrix
    const determinant = (matrix: number[][]): number => {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    };

    // Determinant of the coefficient matrix
    const detCoefficientMatrix = determinant(coefficients);
    if (detCoefficientMatrix === 0) {
        throw new Error("The system of equations has no unique solution.");
    }

    const matrixWithPriceX = [
        [constants[0], coefficients[0][1]],
        [constants[1], coefficients[1][1]]
    ];

    const matrixWithPriceY = [
        [coefficients[0][0], constants[0]],
        [coefficients[1][0], constants[1]]
    ];

    const detMatrixWithPriceX = determinant(matrixWithPriceX);
    const detMatrixWithPriceY = determinant(matrixWithPriceY);

    return {
        a: detMatrixWithPriceX / detCoefficientMatrix,
        b: detMatrixWithPriceY / detCoefficientMatrix
    };
}

export function solvePartOne(file_path: string) {
    const machines = readInput(file_path)
    const tokens = machines
        .map(m => determineTokens(m.button_a, m.button_b, m.price))
        .filter(t => Number.isInteger(t.a) && Number.isInteger(t.b))

    return tokens
        .map(t => t.a*3 + t.b)
        .reduce((acc, t) => acc + t, 0)
}

export function solvePartTwo(file_path: string) {
    const machines = readInput(file_path)
    const tokens = machines
        .map(m => determineTokens(
            m.button_a,
            m.button_b,
            { x: m.price.x + 10000000000000, y: m.price.y + 10000000000000 }
        ))
        .filter(t => Number.isInteger(t.a) && Number.isInteger(t.b))

    return tokens.map(t => t.a*3 + t.b)
        .reduce((acc, t) => acc + t, 0)
}

console.log(`
Part One: ${solvePartOne('input.txt')}
Part Two: ${solvePartTwo('input.txt')}
`)