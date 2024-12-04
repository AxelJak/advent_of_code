const input = Deno.readTextFileSync("./day4/input.txt");

const lines: string[] = input.split("\n");
const dd: string[][] = lines.map((line) => line.split(""));

let totalWords = 0;

//XMAS
for (let i = 0; i < dd.length; i++) {
  for (let j = 0; j < dd[i].length; j++) {
    if (dd[i][j] === "A") {
      findX(i, j);
    }
  }
}

function findX(x: number, y: number) {
  if (x - 1 < 0 || y - 1 < 0 || x + 1 > dd.length - 1 || y + 1 > dd[0].length) {
    return;
  }
  let one = false;
  let two = false;
  if ("MS".includes(dd[x - 1][y - 1])) {
    const char = dd[x - 1][y - 1];
    if ("MS".includes(dd[x + 1][y + 1]) && char !== dd[x + 1][y + 1]) {
      one = true;
    }
  }

  if ("MS".includes(dd[x + 1][y - 1])) {
    const char = dd[x + 1][y - 1];
    if ("MS".includes(dd[x - 1][y + 1]) && char !== dd[x - 1][y + 1]) {
      two = true;
    }
  }

  if (one && two) {
    totalWords++;
  }
}

console.log(totalWords);
