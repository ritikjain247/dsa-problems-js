const sortedArrayWithDuplicates = [1, 3, 5, 5, 5, 5, 67, 123, 355];
const sortedArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
const bitonicArray = [1, 15, 25, 45, 42, 21, 17, 12, 11];
const rotatedArray = [13, 21, 34, 55, 89, 144, 233, 377, 610, 0, 1, 1, 2, 3, 5, 8];


// Classical Problems:

// Upper and Lower bound, number of occurances
// find sqrt(n)
// Bitonic point
// Search in bitonic array
// Pivot in rotated array
// Search in rotated array
// https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1
// https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1
// https://www.geeksforgeeks.org/problems/aggressive-cows/1
// https://www.spoj.com/problems/EKO/
// https://www.naukri.com/code360/problems/cooking-ninjas_1164174



// Binary search [O(log n)]
// /**
//  * @param {number[]} arr 
//  * @param {number} target
//  *
//  * @returns {number}
//  */
const binarySearch = (arr, target) => {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex <= rightIndex) {
    let middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    if (target === arr[middleIndex]) return middleIndex;
    else if (target < arr[middleIndex]) rightIndex = middleIndex - 1;
    else leftIndex = middleIndex + 1;
  }
  return -1;
}
// console.log(binarySearch(arrayToSearch, 8));

// /**
//  * @param {number[]} arr 
//  * @param {number} target
//  *
//  * @returns {number}
//  */
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


// Bitonic Point w/ binarySearch technique [O(logn)]
const bitonicPoint = (arr) => {
  let n = arr.length;
  let left = 0;
  let right = n - 1;

  if (arr[0] > arr[1]) return arr[0];
  if (arr[n - 1] > arr[n - 2]) return arr[n - 1];

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) return arr[mid];
    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1;
    }
    else {
      right = mid - 1;
    }
  }
  return -1;
}

// recursive
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
// console.log(bitonicPoint(bitonicArray));


const findFirstAndLast = (arr, x) => {
  let n = arr.length
  let start = 0, end = n - 1;
  let first = -1, last = -1;
  // find first
  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);
    if (arr[mid] === x) {
      first = mid;
      end = mid - 1;
    }
    else if (arr[mid] > x) end = mid - 1;
    else start = mid + 1;
  }
  start = first;
  end = n - 1;
  // find last
  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);
    if (arr[mid] === x) {
      last = mid;
      start = mid + 1;
    }
    else if (arr[mid] > x) end = mid - 1;
    else start = mid + 1;
  }
  // console.log(first, last);
  return [first, last];
}

const find = (arr, x, isFirst) => {
  let n = arr.length;
  let start = 0, end = n - 1;
  let res = -1;
  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);
    if (arr[mid] === x) {
      res = mid;
      if (isFirst) end = mid - 1;
      else start = mid + 1;
    }
    else if (arr[mid] > x) end = mid - 1;
    else start = mid + 1;
  }
  return res;
}
const findFirstAndLastWithHelper = (arr, x) => [find(arr, x, true), find(arr, x, false)];
console.log(findFirstAndLast(sortedArrayWithDuplicates, 5));


// Square Root of a number
// better ->
const floorSqrt = n => {
  if (n === 0 || n === 1) return n;
  let start = 0, end = Math.floor(n / 2);
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (mid * mid == n) return mid;
    else if (mid * mid > n) end = mid - 1;
    else if (mid * mid < n) {
      if ((mid + 1) ** 2 > n) return mid;
      else start = mid + 1;
    }
  }
  return -1;
}

const floorSqrt2 = n => {
  if (n === 0 || n === 1) return n;
  let start = 0, end = Math.floor(n / 2);
  let sqrt = 1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (mid * mid == n) return mid;
    else if (mid * mid > n) end = mid - 1;
    else if (mid * mid < n) {
      sqrt = mid;
      start = mid + 1;
    }
  }
  return sqrt;
}
// console.log(floorSqrt2(10));


// ************** IMP
// Search an element in sorted and rotated array
const searchInRotated = (arr, x) => {
  const n = arr.length;
  let start = 0, end = n - 1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (arr[mid] === x) return mid;
    if (arr[start] <= arr[mid]) { // left side is sorted
      if (arr[start] <= x && x < arr[mid]) end = mid - 1; // x present on left -> reduce search to left side
      else start = mid + 1; // x present on right side -> reduce search to right side
    }
    else { // right side is sorted
      if (arr[mid] < x && x <= arr[end]) start = mid + 1; // x present on right side -> reduce search to right side
      else end = mid - 1; // x present on left -> reduce search to left side
    }
  }
  return -1;
}
// console.log(searchInRotated(rotatedArray, 0));


// Minimum element in a sorted and rotated array
const minimumInRotated = arr => {
  let n = arr.length, start = 0, end = n - 1;
  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (arr[mid] <= arr[end]) end = mid;
    else start = mid + 1;
  }
  return arr[start];
}
// console.log(minimumInRotated(rotatedArray));


// Book Allocation
function findPages(arr, m) {
  const n = arr.length;
  if (n < m) return -1;
  let maxPages = Number.MAX_VALUE;
  let low = arr[n - 1], high = arr.reduce((acc, curr) => acc + curr);

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (isPermutationPossible(arr, n, m, mid)) {
      maxPages = mid;
      high = mid - 1;
    }
    else low = mid + 1;
  }
  return maxPages;
}
function isPermutationPossible(arr, n, m, maxPages) {
  let student = 1;
  let currPages = 0;
  for (let i = 0; i < n; i++) {
    if (currPages + arr[i] > maxPages) {
      student++;
      if (student > m) return false;
      currPages = arr[i];
    }
    else currPages += arr[i];
  }
  return true;
}


// Painters' Partition
function minTime(arr, n, m) {
  //   if (n < m) return -1;
  let max;
  let low = arr[n - 1], high = arr.reduce((acc, curr) => acc + curr);

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (isPermutationPossible(arr, n, m, mid)) {
      max = mid;
      high = mid - 1;
    }
    else low = mid + 1;
  }
  return max;
}
function isPermutationPossible(arr, n, m, max) {
  let painters = 1;
  let pbc = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] > max) return false;
    if (pbc + arr[i] > max) {
      painters++;
      if (painters > m) return false;
      pbc = arr[i];
    }
    else pbc += arr[i];
  }
  return true;
}


// Aggressive Cows
function solve(n, k, stalls) {
  let low = 0;
  let high = Math.max(...stalls);
  let maxMin = 0;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(stalls, mid, n, k)) {
      maxMin = mid;
      low = mid + 1;
    }
    else high = mid - 1;
  }
  return maxMin;
}

function isPossible(stalls, minDist, n, k) {
  stalls.sort((a, b) => a - b);
  let lastPlaced = stalls[0];
  let placed = 1;
  for (let i = 1; i < n; i++) {
    if (stalls[i] - lastPlaced >= minDist) {
      placed++;
      lastPlaced = stalls[i];
    }
    if (placed === k) {
      return true;
    }
  }
  return false;
}


// Order Agnostic Binary Search