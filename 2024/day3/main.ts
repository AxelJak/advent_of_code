const input = await Deno.readTextFile("./day3/input.txt");

const dos: string[] = input.split("do()");
const dood = dos.map((str) => str.split("don't()"));
const doit: string[] = dood.map((doit) => doit[0]);
const lines: string[] = doit.map((str) => str.split("mul(")).flat();

const completeSplit = lines.map((muls) => muls.split(")"));
const valuesList = completeSplit.map((split) => split[0]);

const validList: string[] = valuesList.filter((value) =>
  RegExp(/(^[0-9]{1,3},[0-9]{1,3}$)/).test(value),
);

let sum = 0;
validList
  .map((value) => {
    const mulValues: number[] = value.split(",").map(Number);
    return mulValues[0] * mulValues[1];
  })
  .map((tot) => (sum += tot));

console.log(sum);
