

// Ways to initialize a 2D array/matrix
const n = 5;
// Method 0 :
const array0 = Array.from({ length: n }, () => Array(n).fill(false));
// Method 1: Using Array.prototype.map
const array1 = Array(n).fill().map(() => Array(n).fill(false));
// Method 2: Using a for loop
const array2 = [];
for (let i = 0; i < n; i++) {
  array2.push(Array(n).fill(false));
}
// Method 3: Using nested Array.from
const array3 = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
// Method 4: Using Array.prototype.fill with Array.from
const array4 = Array.from({ length: n }, () => new Array(n).fill(false));




// Coverage of all zeroes
function findCoverage(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  let coverage = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 0) coverage += getCoverage(matrix, i, j, n, m);
    }
  }
  return coverage;
}
function getCoverage(mat, i, j, n, m) {
  const left = j >= 1 ? mat[i][j - 1] : 0;
  const right = j < m - 1 ? mat[i][j + 1] : 0;
  const up = i >= 1 ? mat[i - 1][j] : 0;
  const down = i < n - 1 ? mat[i + 1][j] : 0;

  // console.log([i, j], left, right, up, down);
  return left + right + up + down;
}
// let mat = [[0, 1, 0], [0, 1, 1], [0, 0, 0]];
// console.log(findCoverage(mat));



// Spriral traversal of matrix
function spirallyTraverse(matrix, r, c) {
  const res = [];
  let dir = 'right';
  let i = 0, j = 0;
  const visited = Array.from({ length: r }, () => Array(c).fill(false));
  for (let k = 0; k < r * c; k++) {
    res.push(matrix[i][j]);
    visited[i][j] = true;
    let [nextRow, nextCol] = getRowCol(i, j, dir);
    if (nextRow < 0 || nextRow >= r || nextCol < 0 || nextCol >= c || visited[nextRow][nextCol]) {
      dir = updateDirection(dir);
      [nextRow, nextCol] = getRowCol(i, j, dir);
    }
    i = nextRow;
    j = nextCol;
  }
  return res;
}
function getRowCol(i, j, dir) {
  switch (dir) {
    case 'right':
      return [i, j + 1];
    case 'left':
      return [i, j - 1];
    case 'down':
      return [i + 1, j];
    case 'up':
      return [i - 1, j];
  }
}
function updateDirection(dir) {
  switch (dir) {
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
    case 'up':
      return 'right';
  }
}

// Method 2
function spirallyTraverse(matrix, r, c) {
  const res = [];
  let startRow = 0;
  let startCol = 0;
  let endRow = r - 1;
  let endCol = c - 1;
  let visited = 0;
  const total = r * c;
  while (visited < total) {
    // Print starting row
    for (let i = startCol; visited < total && i <= endCol; i++) {
      res.push(matrix[startRow][i]);
      visited++;
    }
    startRow++;
    // Print ending col
    for (let i = startRow; visited < total && i <= endRow; i++) {
      res.push(matrix[i][endCol]);
      visited++;
    }
    endCol--;
    // Print ending row
    for (let i = endCol; visited < total && i >= startCol; i--) {
      res.push(matrix[endRow][i]);
      visited++;
    }
    endRow--;
    // Print starting col
    for (let i = endRow; visited < total && i >= startRow; i--) {
      res.push(matrix[i][startCol]);
      visited++;
    }
    startCol++;
  }
  return res;
}



// Rotate a matrix
var rotate = function (matrix) {
  const n = matrix.length;
  let row = 0;
  let col = n - 1;
  let rotated = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  while (row < n) {
    for (let i = 0; i < n; i++) {
      rotated[i][col] = matrix[row][i];
    }
    row++;
    col--;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = rotated[i][j];
    }
  }
};
// Approach 2 O(1) space.
var rotate = function (matrix) {
  const n = matrix.length;
  // transpose the matrix, (i, j) -> (j, i)
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
};


// binary search 2d
var searchMatrix = function (matrix, target) {
  const row = matrix.length;
  const col = matrix[0].length;

  let start = 0, end = row * col - 1;
  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);
    // ******************************************
    const curr = matrix[Math.floor(mid / col)][mid % col];
    // ******************************************
    if (curr === target) return true;
    else if (curr > target) end = mid - 1;
    else start = mid + 1;
  }
  return false;
};



// Toeplitz matrix
function isToepliz(mat) {
  const n = mat.length;
  const m = mat[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i + 1 < n && j + 1 < m) {
        if (mat[i][j] !== mat[i + 1][j + 1]) {
          return false;
        }
      }
    }
  }

  return true;
}


function isToepliz2(mat) {
  const row = mat.length, col = mat[0].length;
  const startingPoints = findStartingPoints(mat, row, col);
  return startingPoints.every(point => checkDiagonal(mat, row, col, point));
}
function findStartingPoints(mat, row, col) {
  const points = [];
  let r = 0;
  while (r < row - 1) {
    points.push([r, 0]);
    r++;
  }
  let c = 1;
  while (c < col - 1) {
    points.push([0, c]);
    c++;
  }
  return points;
}
function checkDiagonal(mat, row, col, point) {
  let [i, j] = point;
  const val = mat[i][j];
  while (i < row - 1 && j < col - 1) {
    if (mat[i + 1][j + 1] !== val) return false;
    i++;
    j++;
  }
  return true;
}
const mat = [
  [11, 74, 0, 93],
  [40, 11, 74, 7]
];
// console.log(isToepliz(mat));



// sum of primary and secondary diagonals without repeating center value
var diagonalSum = function (mat) {
  const n = mat.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += mat[i][i] + mat[n - i - 1][i];
  }
  return sum - (n % 2 == 0 ? 0 : (mat[Math.floor(n / 2)][Math.floor(n / 2)]));
};



// The Palindrome Pattern
function pattern(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].join('') === arr[i].reverse().join('')) return `${i} R`;
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr[0].length; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].join('') === arr[i].reverse().join('')) return `${i} C`;
  }
  return -1;
}


// The celebrity problem
function celebrity(M, n) {
  if (n === 1) return 0;
  for (let i = 0; i < n; i++) {
    let known = false;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      if (M[j][i] !== 1) {
        known = false;
        break;
      } else known = true;
    }
    if (known && M[i].every(el => el === 0)) return i;
  }
  return -1;
}



// Maximum area of a rectangle formed only of 1s in the given matrix.
function maxArea(matrix, n, m) {
  let area = largestRectangleArea(matrix[0]);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] !== 0) matrix[i][j] += matrix[i - 1][j];
      else matrix[i][j] = 0;
    }
    area = Math.max(area, largestRectangleArea(matrix[i]))
  }
  return area;
}
// Largest Rectangle in Histogram
var largestRectangleArea = function (heights) {
  const n = heights.length;
  let maxArea = 0;
  let stack = [];
  for (let i = 0; i <= n; i++) {
    while (stack.length != 0 && (i == n || heights[stack[stack.length - 1]] >= heights[i])) {
      let height = heights[stack[stack.length - 1]];
      stack.pop();
      let width;
      if (stack.length == 0) width = i;
      else width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
};



function nQueen(n) {
  let res = [];
  let board = Array.from({ length: n }, () => Array(n).fill(false));

  const rowCheck = (row) => board[row].some(col => col === true);
  const colCheck = (col) => board.some(row => row[col] === true);
  const diagCheck = (row, col) => {
    // Check primary diagonal (top-left to bottom-right)
    for (let i = 0; i < n; i++) {
      const r = row - col + i;
      if (r >= 0 && r < n && board[r][i] === true) {
        return true;
      }
    }
    // Check secondary diagonal (top-right to bottom-left)
    for (let i = 0; i < n; i++) {
      const r = row + col - i;
      if (r >= 0 && r < n && board[r][i] === true) {
        return true;
      }
    }
    return false;
  }
  const solve = (col, placed) => {
    let possibleRows = [];
    for (let row = 0; row < n; row++) {
      if (!rowCheck(row) && !diagCheck(row, col)) {
        possibleRows.push(row);
      }
    }
    possibleRows.forEach(row => {
      board[row][col] = true;
      placed.push(row + 1);
      if (placed.length === n) res.push(placed.slice());
      else solve(col + 1, placed);
      board[row][col] = false;
      placed.pop();
    })
  };
  solve(0, []);
  return res.sort();
}
// console.log(nQueen(4));


// Sudoku Solver

function solveSudoku(grid) {
  const isSafe = (row, col, val) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === val || grid[i][col] === val) return false;
      if (grid[3 * (Math.floor(row / 3)) + Math.floor(i / 3)][3 * (Math.floor(col / 3)) + i % 3] === val) return false;
    }
    // for (let r = (9 % (row + 1))*3; r < (9 % (row + 1))*3 + 3; r++) {
    //     for (let c = (9 % (col + 1))*3; c < (9 % (col + 1))*3 + 3; c++) {
    //         if (grid[r][c] === val) return false;
    //     }
    // }
    return true;
  }
  const solve = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let val = 1; val <= 9; val++) {
            if (isSafe(row, col, val)) {
              grid[row][col] = val;
              let isPossible = solve(grid);
              if (isPossible) {
                return true;
              }
              else grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  solve(grid);
  return grid;
}
