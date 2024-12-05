const input = Deno.readTextFileSync("./day5/input.txt");

const lines = input.split("\n");
const splitIndex = lines.findIndex((line) => line === "");
const updateNumbers = lines.splice(splitIndex).filter((line) => line !== "");
const rules = lines.filter((line) => line !== "");
const update = updateNumbers.map((row) => row.split(","));

let sum = 0;
let incorrect = [];

for (let i = 0; i < update.length; i++) {
  let rulesCopy = rules.filter((rule) => {
    const bothNumber = rule.split("|");
    if (
      update[i].find((number) => number === bothNumber[0]) &&
      update[i].find((number) => number === bothNumber[1])
    ) {
      return true;
    } else {
      return false;
    }
  });

  let valid = true;
  for (let j = 0; j < update[i].length; j++) {
    if (rulesCopy.length === 0) break;
    if (!rulesCopy.find((rule) => rule.endsWith(update[i][j]))) {
      rulesCopy = rulesCopy.filter((rule) => !rule.startsWith(update[i][j]));
    } else {
      valid = false;
      break;
    }
  }
  if (valid) {
    sum += parseInt(update[i][Math.floor(update[i].length / 2)]);
  } else {
    incorrect.push(update[i]);
  }
}

console.log("Part 1 answer: " + sum);

sum = 0;
for (let i = 0; i < incorrect.length; i++) {
  let rulesCopy = rules.filter((rule) => {
    const bothNumber = rule.split("|");
    if (
      incorrect[i].find((number) => number === bothNumber[0]) &&
      incorrect[i].find((number) => number === bothNumber[1])
    ) {
      return true;
    } else {
      return false;
    }
  });

  let correct: string[] = [];
  let valid = true;
  for (let j = 0; j < incorrect[i].length; j++) {
    if (rulesCopy.length === 0) {
      let value = incorrect[i].find((v) => !correct.find((c) => v = c));
      if (value) {
        correct.push(value);
      }
    }
    const index = incorrect[i].findIndex((number) => {
      if (correct.find((n) => n == number)) return false;
      if (!rulesCopy.find((rule) => rule.endsWith(number))) {
        return true;
      }
      return false;
    });
    correct.push(incorrect[i][index]);
    rulesCopy = rulesCopy.filter((rule) =>
      !rule.startsWith(correct[correct.length - 1])
    );
  }
  if (valid) {
    sum += parseInt(correct[Math.floor(correct.length / 2)]);
  }
}

console.log("Part 2: " + sum);
