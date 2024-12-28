function readInput(file_path: string) {
    const input = Deno.readTextFileSync(file_path);
    const map =  input.split('\n').map((line) => line.split(''));
    let start : {x: number, y: number} = {x: NaN, y: NaN};

    map.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char === '^') {
                start = {x, y};
            }
        });
    });
    return {map, start, direction: 'north'};
}

function setDirection(input: { start: { x: number; y: number; }; direction: string; map: string[][]; }) {
    switch (input.direction) {
        case 'north':
            if (input.start.y - 1 >= 0 && input.map[input.start.y - 1][input.start.x] === '#') {
                input.direction = 'east';
            }
            break;
        case 'south':
            if (input.start.y + 1 < input.map.length && input.map[input.start.y + 1][input.start.x] === '#') {
                input.direction = 'west';
            }
            break;
        case 'east':
            if (input.start.x + 1 < input.map[0].length && input.map[input.start.y][input.start.x + 1] === '#') {
                input.direction = 'south';
            }
            break;
        case 'west':
            if (input.start.x - 1 >= 0 && input.map[input.start.y][input.start.x - 1] === '#') {
                input.direction = 'north';
            }
            break;
    }
}

function canMove(input: { start: { x: number; y: number; }; direction: string; map: string[][]; }) {
    setDirection(input);
    return input.start.y >= 0 &&
        input.start.y < input.map.length &&
        input.start.x >= 0 &&
        input.start.x < input.map[0].length;
}

export function solvePartOne(file_path: string) {
    const input = readInput(file_path);
    const steps = input.map.map((line) => line.map(() => 0));

    while (canMove(input)) {
        input.map[input.start.y][input.start.x] = 'X';
        steps[input.start.y][input.start.x]++;
        switch (input.direction) {
            case 'north':
                input.start.y--;
                break;
            case 'south':
                input.start.y++;
                break;
            case 'east':
                input.start.x++;
                break;
            case 'west':
                input.start.x--;
                break;
        }
    }

    return {
        map: input.map.map((line) => line.join('')).join('\n'),
        answer: steps.reduce((acc, line) => acc + line.reduce((acc, step) => acc + (step > 0 ? 1 : 0), 0), 0)
    };
}

const partOne =solvePartOne("input_test.txt")
console.log(`
Part One: ${partOne.answer}
`);
