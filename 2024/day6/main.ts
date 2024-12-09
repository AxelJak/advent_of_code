const input = Deno.readTextFileSync("./day6/test.txt");

const lines = input.split("\n");
lines.pop();

const startY = lines.findIndex((str: string) => str.includes("^"));
const startX = lines[startY].indexOf("^");

const map = lines.map((line) => line.split(""));

const guard = {
  position: [startY, startX],
  direction: "north",
};
const distinctPositions = new Set();

function isInbound(posistion: number[]): boolean {
  if (posistion[0] < 0) {
    return false;
  }
  if (posistion[0] > map[0].length - 1) {
    return false;
  }
  if (posistion[1] < 0) {
    return false;
  }
  if (posistion[1] > map.length - 1) {
    return false;
  }
  return true;
}

function checkAndGo() {
  switch (guard.direction) {
    case "west":
      if (!isInbound([guard.position[0], guard.position[1] - 1])) {
        guard.position = [guard.position[0], guard.position[1] - 1];
        break;
      }
      if (map[guard.position[0]][guard.position[1] - 1] === "#") {
        guard.direction = "north";
        guard.position = [guard.position[0] - 1, guard.position[1]];
      } else {
        guard.position = [guard.position[0], guard.position[1] - 1];
      }
      break;
    case "south":
      if (!isInbound([guard.position[0] + 1, guard.position[1]])) {
        guard.position = [guard.position[0] + 1, guard.position[1]];
        break;
      }
      if (map[guard.position[0] + 1][guard.position[1]] === "#") {
        guard.direction = "west";
        guard.position = [guard.position[0], guard.position[1] - 1];
      } else {
        guard.position = [guard.position[0] + 1, guard.position[1]];
      }
      break;
    case "east":
      if (!isInbound([guard.position[0], guard.position[1] + 1])) {
        guard.position = [guard.position[0], guard.position[1] + 1];
        break;
      }
      if (map[guard.position[0]][guard.position[1] + 1] === "#") {
        guard.direction = "south";
        guard.position = [guard.position[0] + 1, guard.position[1]];
      } else {
        guard.position = [guard.position[0], guard.position[1] + 1];
      }
      break;
    case "north":
      if (!isInbound([guard.position[0] - 1, guard.position[1]])) {
        guard.position = [guard.position[0] - 1, guard.position[1]];
        break;
      }
      if (map[guard.position[0] - 1][guard.position[1]] === "#") {
        guard.direction = "east";
        guard.position = [guard.position[0], guard.position[1] + 1];
      } else {
        guard.position = [guard.position[0] - 1, guard.position[1]];
      }
      break;
  }
}

let obstruction = 0;
while (isInbound(guard.position)) {
  if (distinctPositions.has(guard.position[0] + " " + guard.position[1])) {
    obstruction++;
  }
  distinctPositions.add(guard.position[0] + " " + guard.position[1]);
  map[guard.position[0]][guard.position[1]] = "X";
  checkAndGo();
}
console.log(obstruction);
console.log(distinctPositions.size);
