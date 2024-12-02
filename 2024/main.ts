const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
let list1 = []; 
let list2 = [];

const list = lines.map(line => line.split("   ").map(Number));
list1 = list.map(line => line[0]);
list2 = list.map(line => line[1]);

let count = list2.reduce(function (value: any, value2: any) {
  return (
      value[value2] ? ++value[value2] :(value[value2] = 1),
      value
  );
}, {});

let sum = 0;
for (let i = 0; i < list1.length; i++) {
  if (count[list1[i]]) {
    sum += list1[i] * count[list1[i]];
  }
}
console.log(sum);