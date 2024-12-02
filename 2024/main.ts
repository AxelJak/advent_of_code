const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const rows = lines.map((line) => line.split(" ").map(Number));

let sum = 0;
rows.forEach((row) => {
  if(isSafe(row)){
    sum++;
  }
});

console.log(sum);


function isSafe(row: number[]):boolean{
  const previous = row[0];
  if(previous > row[1]){
    return decreasing(row);
  } else {
    return increasing(row);
  } 
}

function increasing(row: number[]):boolean{
  let previous = row[0];
  for(let i = 1; i < row.length; i++){
    if (previous === row[i]){
      return false;
    }
    if (previous > row[i]){
      return false;
    }
    if (row[i] - previous > 3){
      return false;
    }
    previous = row[i];
  }
  return true;
}

function decreasing(row: number[]):boolean{
  let previous = row[0];
  for(let i = 1; i < row.length; i++){
    if (previous === row[i]){
      return false;
    }
    if (previous < row[i]){
      return false;
    }
    if (previous - row[i] > 3){
      return false;
    }
    previous = row[i];
  }
  return true;
}