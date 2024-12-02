const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
let list1;
let list2;
const list = lines.map(line => line.split("   ").map(Number));

list1 = list.map(line => line[0]);
list2 = list.map(line => line[1]);

list1 = list1.sort();
list2 = list2.sort();

let sum = 0;
for (let i = 0; i < list1.length; i++) {
  sum += Math.abs(list1[i] - list2[i]);
}
console.log(sum);