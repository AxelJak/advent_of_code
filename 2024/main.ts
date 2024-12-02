const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const rows = lines.map((line) => line.split(" ").map(Number));

let sum = 0;
sum = rows.filter(levels => 
  isIncreasingOrDecreasing(levels) && isLevelDiffValid(levels) || 
  isSafeWithProblemDampener(levels)
).length;

console.log(sum);

function isIncreasingOrDecreasing(levels: any) {
  const diffs = levels.slice(1).map((level, i) => level - levels[i]);
  return diffs.every(diff => diff > 0) || diffs.every(diff => diff < 0);
}

function isLevelDiffValid(levels: any) {
  return levels.slice(1).every((level, i) => 
      Math.abs(level - levels[i]) >= 1 && Math.abs(level - levels[i]) <= 3
  );
}

function isSafeWithProblemDampener(levels:any) {
  // Try removing each level and check if the remaining sequence is safe
  for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.filter((_, index) => index !== i);
      if (isIncreasingOrDecreasing(modifiedLevels) && 
          isLevelDiffValid(modifiedLevels)) {
          return true;
      }
  }
  return false;
}



function isSafe(row: number[]):boolean{
  let dec = false;
  let inc = false;
  inc = increasing(row);
  dec = decreasing(row);
  return (inc || dec);
} 

function increasing(row: number[]):boolean{
  let previous = row[0];
  let firstOffence = false;
  for(let i = 1; i < row.length; i++){
    if (previous > row[i]){
      if (firstOffence){
        return false;
      }
      if (i === 1){
        if (previous < row[i + 1]){
          continue;
        }
        previous = row[i];
      }
      firstOffence = true;
      continue;
    }
    if (row[i] - previous > 3 || row[i] - previous < 1){
      if (firstOffence){
        return false;
      }
      if (i === 1){
        if (row[i + 1] - previous < 4 || row[i + 1] - previous > 0){
          continue;
        }
        previous = row[i];
      }
      firstOffence = true;
      continue;
    }
    previous = row[i];
  }
  return true;
}

function decreasing(row: number[]):boolean{
  let previous = row[0];
  let firstOffence = false;
  for(let i = 1; i < row.length; i++){
    if (previous < row[i]){
      if (firstOffence){
        return false;
      }
      if (i === 1){
        if (previous > row[i + 1]){
          continue;
        }
        previous = row[i];
      }
      firstOffence = true;
      continue;
    }
    if (previous - row[i] > 3 || previous - row[i] < 1){
      if (firstOffence){
        return false;
      }
      if (i === 1){
        if (previous - row[i + 1] < 4 || previous - row[i + 1] < 0){
          continue;
        }
        previous = row[i];
      }
      firstOffence = true;
      continue;
    }
    previous = row[i];
  }
  return true;
}