let sudoku = [
  ["x", 8, 1, 6, "x", "x", "x", "x", "x"],
  [9, "x", "x", "x", "x", 5, "x", "x", "x"],
  [5, 6, "x", "x", 3, "x", "x", "x", "x"],
  ["x", 5, "x", "x", "x", "x", "x", 3, "x"],
  ["x", "x", 2, "x", "x", "x", "x", "x", 9],
  [8, "x", "x", "x", "x", 7, 1, 5, 6],
  [3, "x", "x", 1, "x", 8, "x", "x", "x"],
  ["x", "x", 5, "x", "x", 3, "x", "x", "x"],
  [6, "x", "x", 9, "x", "x", "x", "x", 1],
];

function solve(row, column, sudoku) {
  let newSudoku = sudoku;

  let newRow = row;
  let newCol = column + 1;
  if (newCol >= 9) {
    newCol = 0;
    newRow++;
  }
  if (newRow >= 9) console.error("algorythm reached the End! this shouldn happen.");

  if (!isEmpty(row, column, sudoku)) {
    solve(newRow, newCol, sudoku);
    return;
  }
  let possibleNums = getPossibleNumbers(row, column, sudoku);

  possibleNums.forEach((num) => {
    sudoku[row][column] = num;
    if (checkDone(sudoku)) {
      while (true) {
        print2DArray(sudoku);
        while (true) {}
      }
    }
    print2DArray(sudoku);
    solve(newRow, newCol, newSudoku);
  });
  sudoku[row][column] = "x";
  return;
}

function getPossibleNumbers(row, col, currentSudoku) {
  let posibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < 9; i++) {
    posibleNums = posibleNums.filter((number) => number != currentSudoku[row][i]);
  }

  for (let i = 0; i < 9; i++) {
    posibleNums = posibleNums.filter((number) => number != currentSudoku[i][col]);
  }

  let spaceTop = col % 3;
  let spaceLeft = row % 3;

  for (let indexRow = row - spaceLeft; indexRow < row - spaceLeft + 3; indexRow++) {
    for (let indexCol = col - spaceTop; indexCol < col - spaceTop + 3; indexCol++) {
      posibleNums = posibleNums.filter((number) => number != currentSudoku[indexRow][indexCol]);
    }
  }

  return posibleNums;
}

isEmpty = (row, col, sudoku) => sudoku[row][col] == "x";

checkDone = (sudoku) => {
  for (let i = 0; i < 9; i++) {
    for (let o = 0; o < 9; o++) {
      if (typeof sudoku[i][o] != "number") {
        return false;
      }
    }
  }
  return true;
};

function print2DArray(array) {
  console.log("-----------------");

  for (let i = 0; i < array.length; i++) {
    let row = "";
    for (let j = 0; j < array[i].length; j++) {
      row += array[i][j] + " "; // Use '\t' (tab) for spacing between elements
    }
    console.log(row);
  }
}

solve(0, 0, sudoku);
