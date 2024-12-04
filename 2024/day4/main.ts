const input = Deno.readTextFileSync("./day4/input.txt");

const lines: string[] = input.split("\n");
const dd: string[][] = lines.map((line) => line.split(""));

let totalWords = 0;

console.log(dd.length);
console.log(dd[0].length);

//XMAS
for (let i = 0; i < dd.length; i++) {
  for (let j = 0; j < dd[i].length; j++) {
    if (dd[i][j] === "X") {
      serachAround(i, j);
    }
  }
}

function serachAround(x: number, y: number): void {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (
        x + i < 0 ||
        y + j < 0 ||
        x + i > dd.length - 1 ||
        y + j > dd[0].length - 1
      )
        continue;
      if (dd[x + i][y + j] === "M") {
        findAS(x, y, x + i, y + j);
      }
    }
  }
}

function findDirection(
  previousX: number,
  previousY: number,
  currentX: number,
  currentY: number,
) {
  let x = currentX;
  let y = currentY;
  if (previousX > currentX) {
    x--;
  } else if (previousX < currentX) {
    x++;
  }
  if (previousY > currentY) {
    y--;
  } else if (previousY < currentY) {
    y++;
  }
  return { x: x, y: y };
}

function findAS(
  startx: number,
  starty: number,
  currentx: number,
  currenty: number,
): void {
  let { x, y } = findDirection(startx, starty, currentx, currenty);
  if (x < 0 || y < 0 || x > dd.length - 1 || y > dd[0].length - 1) {
    return;
  }
  if (dd[x][y] === "A") {
    ({ x, y } = findDirection(currentx, currenty, x, y));
    if (x < 0 || y < 0 || x > dd.length - 1 || y > dd[0].length - 1) {
      return;
    }
    if (dd[x][y] === "S") {
      totalWords++;
    }
  }
}

// -------------- WARNING TRASH BELOW --------------

function findM(i: number, j: number): void {
  const directions = {
    north: true,
    east: true,
    south: true,
    west: true,
  };
  if (i === 0) {
    directions.north = false;
  }
  if (i === dd.length) {
    directions.south = false;
  }
  if (j === 0) {
    directions.west = false;
  }
  if (j === dd[i].length) {
    directions.east = false;
  }

  if (directions.north) {
    if (dd[i - 1][j] === "M") {
      findA(i - 1, j, true);
    }
  }
  if (directions.north && directions.east) {
    if (dd[i - 1][j + 1] === "M") {
      findA(i - 1, j + 1, true, true);
    }
  }
  if (directions.east) {
    if (dd[i][j + 1] === "M") {
      findA(i, j + 1, false, true);
    }
  }
  if (directions.east && directions.south) {
    if (dd[i + 1][j + 1] === "M") {
      findA(i + 1, j + 1, false, true, true);
    }
  }
  if (directions.south) {
    if (dd[i + 1][j] === "M") {
      findA(i + 1, j, false, false, true);
    }
  }
  if (directions.south && directions.west) {
    if (dd[i + 1][j - 1] === "M") {
      findA(i + 1, j - 1, false, false, true, true);
    }
  }
  if (directions.west) {
    if (dd[i][j - 1] === "M") {
      findA(i, j - 1, false, false, false, true);
    }
  }
  if (directions.west && directions.north) {
    if (dd[i - 1][j - 1] === "M") {
      findA(i - 1, j - 1, true, false, false, true);
    }
  }
}

function findA(
  i: number,
  j: number,
  north = false,
  east = false,
  south = false,
  west = false,
): void {
  if (north && !east && !west && !south) {
    if (i !== 0) {
      if (dd[i - 1][j] === "A") {
        findS(i - 1, j, north, east, south, west);
      }
    }
  }
  if (north && east && !west && !south) {
    if (i !== 0 && j !== dd[i].length) {
      if (dd[i - 1][j + 1] === "A") {
        findS(i - 1, j + 1, north, east, south, west);
      }
    }
  }
  if (east && !north && !west && !south) {
    if (j !== dd[i].length) {
      if (dd[i][j + 1] === "A") {
        findS(i, j + 1, north, east, south, west);
      }
    }
  }
  if (east && south && !west && !north) {
    if (i !== dd.length && j !== dd[i].length) {
      if (dd[i + 1][j + 1] === "A") {
        findS(i + 1, j + 1, north, east, south, west);
      }
    }
  }
  if (south && !east && !west && !north) {
    if (i !== dd.length) {
      if (dd[i + 1][j] === "A") {
        findS(i + 1, j, north, east, south, west);
      }
    }
  }
  if (south && west && !east && !north) {
    if (i !== dd.length && j !== 0) {
      if (dd[i + 1][j - 1] === "A") {
        findS(i + 1, j - 1, north, east, south, west);
      }
    }
  }
  if (west && !south && !north && !east) {
    if (j !== 0) {
      if (dd[i][j - 1] === "A") {
        findS(i, j - 1, north, east, south, west);
      }
    }
  }
  if (west && north && !south && !east) {
    if (i !== 0 && j !== 0) {
      if (dd[i - 1][j - 1] === "A") {
        findS(i - 1, j - 1, north, east, south, west);
      }
    }
  }
}

function findS(
  i: number,
  j: number,
  north = false,
  east = false,
  south = false,
  west = false,
): void {
  if (north && !east && !west && !south) {
    if (i !== 0) {
      if (dd[i - 1][j] === "S") {
        totalWords++;
      }
    }
  }
  if (north && east && !west && !south) {
    if (i !== 0 && j !== dd[i].length) {
      if (dd[i - 1][j + 1] === "S") {
        totalWords++;
      }
    }
  }
  if (east && !north && !west && !south) {
    if (j !== dd[i].length) {
      if (dd[i][j + 1] === "S") {
        totalWords++;
      }
    }
  }
  if (east && south && !west && !north) {
    if (i !== dd.length && j !== dd[i].length) {
      if (dd[i + 1][j + 1] === "S") {
        totalWords++;
      }
    }
  }
  if (south && !east && !south && !north) {
    if (i !== dd.length) {
      if (dd[i + 1][j] === "S") {
        totalWords++;
      }
    }
  }
  if (south && west && !east && !north) {
    if (i !== dd.length && j !== 0) {
      if (dd[i + 1][j - 1] === "S") {
        totalWords++;
      }
    }
  }
  if (west && !south && !north && !east) {
    if (j !== 0) {
      if (dd[i][j - 1] === "S") {
        totalWords++;
      }
    }
  }
  if (west && north && !south && !east) {
    if (i !== 0 && j !== 0) {
      if (dd[i - 1][j - 1] === "S") {
        totalWords++;
      }
    }
  }
}

//dd.forEach((array) => console.log(JSON.stringify(array, null, 0)));
console.log(totalWords);
