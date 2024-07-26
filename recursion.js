// w/ recurssion [O(2^n)] - terrible
const getFibonacciElementAtN = (n) => {
  if (n > 2) return getFibonacciElementAtN(n - 1) + getFibonacciElementAtN(n - 2);
  else if (n === 2 || n === 1) return n - 1;
  else return 'n should be > 0';
};


// Factorial
// [O(n)]
const factorialRecursive = (n) => {
  if (n === 1 | n === 0) return 1;
  else if (n < 0) return 'n should be > 0'
  else return n * factorialRecursive(n - 1);
}


// lcm = a*b/gcd(a,b)
// GCD
const gcd = (a, b) => {
  let res = 1;
  for (let i = 2; i < Math.min(a, b); i++) {
    if (a % i === 0 && b % i === 0) res = i;
  }
  return res;
}
const gcdRecursive = (a, b) => {
  if (b === 0) return a;
  return gcdRecursive(b, a % b);
}


// Power a^b
function powerRecursive(a, b) {
  if (b === 0) return 1;
  if (b === 1) return a;
  let res = power(a, b / 2);
  return b % 2 === 0 ? res * res : a * res * res;
}

// Tower of Hanoi
function towerOfHanoi(N, from, to, aux) {
  let moves = 0;
  function moveDisks(n, from, to, aux) {
    if (n === 0) return;
    moveDisks(n - 1, from, aux, to);
    console.log(`move disk ${n} from rod ${from} to rod ${to}`);
    moves++;
    moveDisks(n - 1, aux, to, from);
  }
  moveDisks(N, from, to, aux);
  console.log(moves); // return moves
}

// Search JS Object
const contains = (obj, val) => {
  for (let key in obj) {
    if (obj[key] === val) return true;
    if (typeof obj[key] === 'object') return contains(obj[key], val);
  }
  return false;
}


// Parse a multi-dimensional array
const totalIntegers = (arr) => {
  let count = 0;
  arr.forEach(element => {
    if (Number.isInteger(element)) count++;
    else if (Array.isArray(element)) count += totalIntegers(element)
  });
  return count;
}


// Write a function that sums squares of numbers in list that may contain more lists
const sumSquares = (array) => {
  let sum = 0;
  array.forEach(element => {
    if (Number.isInteger(element)) sum += element ** 2;
    else if (Array.isArray(element)) sum += sumSquares(element);
  });
  return sum;
}


// Climibing Staircase
// O(2^n)
function climbingStaircase(n) {
  if (n === 1 || n === 2) return n;
  return climbingStaircase(n - 1) + climbingStaircase(n - 2);
}
// O(n)
function waysToClimbMemoized(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 1 || n === 2) return n;
  memo[n] = waysToClimbMemoized(n - 1, memo) + waysToClimbMemoized(n - 2, memo);
  return memo[n];
}
// console.log(waysToClimbMemoized(4));

// Return all ways to climb
function waysToClimb(n) {
  const ways = [];
  findWays([], n);
  return ways;
}
function findWays(currentSteps, remainingSteps) {
  if (remainingSteps === 0) {
    ways.push(currentSteps);
    return;
  }
  if (remainingSteps >= 1) {
    findWays([...currentSteps, 1], remainingSteps - 1);
  }
  if (remainingSteps >= 2) {
    findWays([...currentSteps, 2], remainingSteps - 2);
  }
}

// Time Complexity : O(n)
// Space: O(1)
function countWays(n) {
  if (n <= 1) return 1;
  let a = 0n, b = 1n, res;
  for (let i = 1; i <= n; i++) {
    res = (a + b) % 1000000007n;
    a = b;
    b = res;
  }
  return res;
}

// Climbing stairs with step cost
var minCostClimbingStairs = function (cost) {
  let n = cost.length;
  // Adding an extra element at the end to represent the top of the stairs
  cost.push(0);

  // Initialize the first two steps
  let first = cost[0];
  let second = cost[1];

  // Iterate over the array starting from the third step
  for (let i = 2; i <= n; i++) {
    let current = cost[i] + Math.min(first, second);
    first = second;
    second = current;
  }

  // The result is the minimum cost to reach the top of the stairs
  return second;
};


const binarySearchRecursiveWithHelper = (arr, target) => {
  return search(arr, target, 0, arr.length - 1);
}
function search(arr, target, start, end) {
  if (start > end) return -1;
  let mid = Math.floor((start + end) / 2);
  if (target === arr[mid]) return mid;
  else if (target < arr[mid]) return search(arr, target, start, mid - 1);
  else return search(arr, target, mid + 1, end);
}
// console.log(binarySearchRecursive(arrayToSearch, 10));


const binarySearchRecursive = (arr, target, start, end) => {
  if (start > end) return -1;
  let mid = start + Math.floor((end - start) / 2);
  if (target === arr[mid]) return mid;
  else if (target < arr[mid]) return binarySearchRecursive(arr, target, start, mid - 1);
  else if (target > arr[mid]) return binarySearchRecursive(arr, target, mid + 1, end);
}
// console.log(binarySearchRecursive(arrayToSearch, 55, 0, arrayToSearch.length - 1));



// Bitonic Point w/ binarySearch technique recursive
const bitonicPointRecursive = (array) => {
  const n = array.length;
  return array[findBitonicPoint(array, n, 0, n - 1)];
}

function findBitonicPoint(arr, n, l, r) {
  let mid;
  let bitonicPoint = 0;
  mid = Math.floor((r + l) / 2);
  if (arr[mid] > arr[mid - 1]
    && arr[mid] > arr[mid + 1]) return mid;
  else if (arr[mid] > arr[mid - 1]
    && arr[mid] < arr[mid + 1]) {
    bitonicPoint = findBitonicPoint(arr, n, mid, r);
  }
  else if (arr[mid] < arr[mid - 1]
    && arr[mid] > arr[mid + 1]) {
    bitonicPoint = findBitonicPoint(arr, n, l, mid);
  }
  return bitonicPoint;
}



// Selection sort recursive XXX
function selectionSortRec(array, n) {
  if (n === 0 || n === 1) return array;
  let iMin = 0;
  for (let i = 0; i < n; i++) {
    if (array[i] < array[iMin]) iMin = i;
  }
  if (iMin != 0) {
    let temp = array[0];
    array[0] = array[iMin];
    array[iMin] = temp;
  }
  return [array[0], ...selectionSortRec(array.slice(1), n - 1)];
}
function selectionSortRecInPlace(array, n, start = 0) {
  if (start >= n - 1) return array; // Base case: stop recursion when start index is at the last or beyond
  let iMin = start;
  // Find the index of the minimum element in the remaining part of the array
  for (let i = start + 1; i < n; i++) {
    if (array[i] < array[iMin]) {
      iMin = i;
    }
  }
  // Swap the minimum element with the current start element
  if (iMin !== start) {
    let temp = array[start];
    array[start] = array[iMin];
    array[iMin] = temp;
  }
  // Recursively sort the rest of the array starting from the next element
  selectionSortRecInPlace(array, n, start + 1);
  return array;
}


// Bubble Sort recursive XXX
function bubbleSortRec(array, n) {
  if (n === 0 || n === 1) return array;
  for (let i = 0; i < n; i++) {
    if (array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
    }
  }
  return [...bubbleSortRec(array.slice(0, -1), n - 1), array[n - 1]];
}

function bubbleSortRecInPlace(array, n) {
  if (n <= 1) return array; // Base case: if array has 0 or 1 elements, it's already sorted
  // Perform one pass of bubble sort
  for (let i = 0; i < n - 1; i++) {
    if (array[i] > array[i + 1]) {
      // Swap elements if they are out of order
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
    }
  }
  // Recursively sort the remaining elements (excluding the last one)
  bubbleSortRecInPlace(array, n - 1);
  return array;
}
// console.log(bubbleSortRec(arrayToSort, arrayToSort.length));



// Recursive insertion sort
function insertionSortRecInPlace(array, n) {
  if (n === 0 || n === 1) return;
  insertionSortRec(array, n - 1);
  let numberToInsert = array[n - 1];
  let j = n - 2;
  while (j >= 0 && array[j] > numberToInsert) {
    array[j + 1] = array[j];
    j--;
  }
  array[j + 1] = numberToInsert;
}

function insertionSortRec(array, n) {
  if (n === 0 || n === 1) return array.slice();
  let sortedArray = insertionSortRec(array, n - 1);
  let numberToInsert = array[n - 1];
  let j = n - 2;
  while (j >= 0 && sortedArray[j] > numberToInsert) {
    sortedArray[j + 1] = sortedArray[j];
    j--;
  }
  sortedArray[j + 1] = numberToInsert;
  return sortedArray;
}



// Quick Sort [O(n^2)] [Θ(nlogn)]
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// console.log(quickSort(arrayToSort));

// Mutate
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return; // Base case: stop recursion when left >= right
  // Partitioning
  let pivot = arr[right]; // Choose the rightmost element as pivot
  let partitionIndex = partition(arr, left, right, pivot);
  // Recursively sort elements before and after partition
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);
  // No need to return anything as the array is sorted in place
}
function partition(arr, left, right, pivot) {
  let i = left - 1; // Index of smaller element
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j); // Swap elements at i and j
    }
  }
  swap(arr, i + 1, right); // Place the pivot element in its correct position
  return i + 1; // Return the partition index
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}



// Merge Sort [O(nlogn)]
function mergeSort(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) sorted.push(left.shift());
    else sorted.push(right.shift());
  }
  return [...sorted, ...left, ...right];
}

// Mutate original / in-place sorting
function mergeSortInPlace(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  mergeSortInPlace(left);
  mergeSortInPlace(right);
  mergeInPlace(array, left, right);
  return array;
}
function mergeInPlace(array, left, right) {
  let i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }
  while (i < left.length) {
    array[k++] = left[i++];
  }
  while (j < right.length) {
    array[k++] = right[j++];
  }
}


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
/**
* @param {string} digits
* @return {string[]}
*/
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

var letterCombinations = function (digits) {
  if (!digits.length) return [];
  let res = mapping[digits[0]];
  for (let i = 1; i < digits.length; i++) {
    res = crossProduct(res, mapping[digits[i]]);
  }
  return res;
};
function crossProduct(arr1, arr2) {
  return arr1.flatMap(a => arr2.map(b => a + b));
}
// console.log(letterCombinationsRec('27'));


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
// moves - D and R
function findPath(mat, n) {
  if (!mat[0][0] || !mat[n - 1][n - 1]) return [];
  let paths = [];
  function solve(dest, path) {
    let [i, j] = dest;
    if (i === 0 && j === 0) return paths.push(path.slice().reverse().join(''));
    if (j > 0 && mat[i][j - 1]) {
      path.push('R');
      solve([i, j - 1], path);
      path.pop();
    }
    if (i > 0 && mat[i - 1][j]) {
      path.push('D');
      solve([i - 1, j], path);
      path.pop();
    }
  }
  solve([n - 1, n - 1], []);
  return paths;

  // starting 0, 0
  // function solve(i, j, path) {
  //   if (i === n - 1 && j === n - 1) {
  //     paths.push(path.join(''));
  //     return;
  //   }
  //   // Move down
  //   if (i + 1 < n && mat[i + 1][j]) {
  //     path.push('D');
  //     solve(i + 1, j, path);
  //     path.pop();
  //   }
  //   // Move right
  //   if (j + 1 < n && mat[i][j + 1]) {
  //     path.push('R');
  //     solve(i, j + 1, path);
  //     path.pop();
  //   }
  // }
  // solve(0, 0, []);
}
// console.log(findPath([[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]], 4));


// moves - U, D and R, L
function findPathAllDirection(mat, n) {
  if (!mat[0][0] || !mat[n - 1][n - 1]) return [];
  let paths = [];
  let visited = Array.from({ length: n }, () => Array(n).fill(false));
  function solve(dest, path) {
    let [i, j] = dest;
    if (i === 0 && j === 0) return paths.push(path.slice().reverse().join(''));
    if (j < n - 1 && mat[i][j + 1] && !visited[i][j + 1]) {
      visited[i][j + 1] = true;
      path.push('L');
      solve([i, j + 1], path);
      path.pop();
      visited[i][j + 1] = false;
    }
    if (i < n - 1 && mat[i + 1][j] && !visited[i + 1][j]) {
      visited[i + 1][j] = true;
      path.push('U');
      solve([i + 1, j], path);
      path.pop();
      visited[i + 1][j] = false;
    }
    if (j > 0 && mat[i][j - 1] && !visited[i][j - 1]) {
      visited[i][j - 1] = true;
      path.push('R');
      solve([i, j - 1], path);
      path.pop();
      visited[i][j - 1] = false;
    }
    if (i > 0 && mat[i - 1][j] && !visited[i - 1][j]) {
      visited[i - 1][j] = true;
      path.push('D');
      solve([i - 1, j], path);
      path.pop();
      visited[i - 1][j] = false;
    }
  }
  visited[n - 1][n - 1] = true;
  solve([n - 1, n - 1], []);
  return paths.sort();
}
// console.log(findPathAllDirection([[1, 0, 0], [1, 1, 0], [1, 1, 1]], 3));

// Simplified
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



// reverse linked list in k-groups
function kReverse(head, k) {
  // base case
  if (!head || !head.next) return head;
  // reverse first k nodes
  let prev = null;
  let curr = head;
  let next = null;
  let i = 0;
  while (curr && i < k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    i++;
  }
  // recurse
  if (next) {
    head.next = kReverse(next, k);
  }
  return prev;
}


// 0-1 knapsack
//Function to return max value that can be put in knapsack of capacity W.
function knapSack(W, wt, val, n) {
  function solve(capacity, wt, val, n, index) {
    if (index === n - 1) {
      return wt[index] <= capacity ? val[index] : 0;
    }

    let inc = 0, exc = 0;
    if (wt[index] <= capacity) {
      inc = val[index] + solve(capacity - wt[index], wt, val, n, index + 1);
    }
    exc = solve(capacity, wt, val, n, index + 1);

    return Math.max(inc, exc);
  }
  return solve(W, wt, val, n, 0);
}