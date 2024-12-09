const input = Deno.readTextFileSync("./day7/input.txt");

const lines = input.split("\n");

const ekvations = lines.map((line) => line.split(":"));

let sum = 0;
for (let i = 0; i < ekvations.length - 1; i++) {
  const numbers = ekvations[i][1].trim().split(" ").map(Number);
  const result = parseInt(ekvations[i][0]);
  if (calcPossible(result, numbers)) {
    sum += result;
  }
}

function calcPossible(result: number, numbers: number[]): boolean {
  for (let i = 0; i < 10000; i++) {
    let previous = numbers[0];
    for (let j = 1; j < numbers.length; j++) {
      previous = randomPlusMult(previous, numbers[j]);
    }
    //console.log(previous, result);
    if (previous === result) {
      return true;
    }
  }
  return false;
}

function randomPlusMult(num1: number, num2: number): number {
  const random = Math.ceil(Math.random() * 10);
  if (random > 5) {
    return num1 + num2;
  } else {
    return num1 * num2;
  }
}

console.log(sum);
