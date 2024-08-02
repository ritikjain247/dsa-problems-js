
// Power set - all subsets of an array
const subsets2 = (arr) => {
	let res = [];
	let output = [];
	let idx = 0;
	findSubsets(arr, output, idx, res);
	return res;
}
function findSubsets(input, output, idx, res) {
	if (idx >= input.length) { // base case
		res.push([...output]);
		return;
	}
	findSubsets(input, output, idx + 1, res); // exclusion case : order doesn't matter
	output.push(input[idx]);
	findSubsets(input, output, idx + 1, res); // inclusion case
	output.pop();
}

// O(n*2^n) time and space
var subsets = function (nums) {
	const result = [];
	const temp = [];
	function recursive(nums, i) {
		if (i == nums.length) return result.push([...temp]);
		temp.push(nums[i]);
		recursive(nums, i + 1);
		temp.pop();
		recursive(nums, i + 1);
	}
	recursive(nums, 0);
	return result;
};
// console.log(subsets([1, 2, 3]));


// All non-empty sub-sequences of a string
// O(n^2 * 2^n)
function subsequences(s) {
	let res = [];
	let temp = [];
	function recurse(s, i) {
		if (i === s.length) return temp.length && res.push(temp.join(''));
		temp.push(s[i]);
		recurse(s, i + 1);
		temp.pop();
		recurse(s, i + 1);
	}
	recurse(s, 0);
	return res.sort();
}
// O(n * 2^n)
function subsequencesSorted(s) {
	let res = [];
	let temp = [];
	function recurse(start) {
		for (let i = start; i < s.length; i++) {
			temp.push(s[i]);
			res.push(temp.join(''));
			recurse(i + 1);
			temp.pop();
		}
	}
	recurse(0);
	return res;
}
// console.log(subsequences('abc'));


// Letter Combinations of a Phone Number
const mapping = {
	2: ["a", "b", "c"],
	3: ["d", "e", "f"],
	4: ["g", "h", "i"],
	5: ["j", "k", "l"],
	6: ["m", "n", "o"],
	7: ["p", "q", "r", "s"],
	8: ["t", "u", "v"],
	9: ["w", "x", "y", "z"]
};
var letterCombinationsRec = function (digits) {
	if (!digits.length) return [];
	let res = [];
	let output = '';
	function solve(idx) {
		if (idx >= digits.length) return !!output.length && res.push(output);
		for (let char of mapping[digits[idx]]) {
			output += char;
			solve(idx + 1);
			output = output.slice(0, -1); // backtracking
		}
	}
	solve(0);
	return res;
};


// All permutations of a given array
var permute = function (nums) {
	let res = [];
	let output = [...nums];
	function solve(idx) {
		if (idx >= nums.length) {
			return res.push([...output]);
		}
		for (let i = idx; i < output.length; i++) {
			swap(output, idx, i);
			solve(idx + 1);
			swap(output, i, idx); // backtracking
		}
	}
	solve(0);
	return res;
};
function swap(arr, i, j) {
	if (i !== j) {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}


// Rat in a maze
function findPathInMaze(mat, n) {
	if (!mat[0][0] || !mat[n - 1][n - 1]) return [];
	let paths = [];
	let visited = Array.from({ length: n }, () => Array(n).fill(false));

	const solve = (i, j, path) => {
		if (i === n - 1 && j === n - 1) return paths.push(path);
		visited[i][j] = true;
		if (i + 1 < n && mat[i + 1][j] && !visited[i + 1][j]) solve(i + 1, j, path + 'D');
		if (j + 1 < n && mat[i][j + 1] && !visited[i][j + 1]) solve(i, j + 1, path + 'R');
		if (i - 1 >= 0 && mat[i - 1][j] && !visited[i - 1][j]) solve(i - 1, j, path + 'U');
		if (j - 1 >= 0 && mat[i][j - 1] && !visited[i][j - 1]) solve(i, j - 1, path + 'L');
		visited[i][j] = false;
	};
	solve(0, 0, '');
	return paths.sort();
}


// Place queens in a grid
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



// Return all ways to change coins
function change(amount, coins) {
	const result = [];
	const currentCombination = [];

	function backtrack(start, remaining) {
		if (remaining === 0) {
			result.push([...currentCombination]);
			return;
		}
		if (remaining < 0) {
			return;
		}

		for (let i = start; i < coins.length; i++) {
			currentCombination.push(coins[i]);
			backtrack(i, remaining - coins[i]);
			currentCombination.pop();
		}
	}

	backtrack(0, amount);
	return result;
}


// Combination Sum
function combinationSum(A, B) {
	if (B === 0) return [];

	let res = []; // will contains duplicate temp arrays if temp sorted.

	function solve(target, i = 0, temp = []) {
		console.log(i, target, temp, res);
		if (target === 0) {
			if (temp.length) res.push(temp.slice()); //temp.slice().sort((a, b) => a - b)
			return;
		}
		else if (i === A.length) return;

		// inc
		if (A[i] <= target) {
			temp.push(A[i]);
			solve(target - A[i], i, temp);
			temp.pop();
		}
		// excl
		solve(target, i + 1, temp);

	}

	solve(B);

	return res; // res.sort()
}

console.log(combinationSum([6, 5, 7, 1, 8, 2, 9, 9, 7, 7, 9], 6))

// Combination Sum IV
var combinationSum4 = function (nums, target, memo = {}) {
	if (target == 0) return 1;
	if (target < 0) return 0;
	if (target in memo) return memo[target];

	let totalCount = 0;

	for (let num of nums) {
		if (num <= target) {
			const diff = target - num;
			totalCount += combinationSum4(nums, diff, memo);
		}
	}

	memo[target] = totalCount;
	return totalCount;
};
