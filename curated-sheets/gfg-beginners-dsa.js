const sortedArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
const bitonicArray = [1, 15, 25, 45, 42, 21, 17, 12, 11];



// Find min max
function getMinMax(arr,n) {
  let min = arr[0];
  let max = arr[0];
  for(let i = 1; i < n; i++) {
       if(arr[i] < min) min = arr[i];
       if(arr[i] > max) max = arr[i];
  }
  return [min, max]
}


// Find missing number
function missingNumber(array, n) {
  return ((n * (n + 1)) / 2) - array.reduce((acc, curr) => acc + curr, 0);
}

// Wave Array
const convertToWave = (arr) => {
  let res = [], n = arr.length;
  for (let i = 0; i <= n - 1; i = i + 2) {
    if (!!arr[i + 1]) {
      res[i] = arr[i + 1];
      res[i + 1] = arr[i];
    }
    else res[i] = arr[i]
  }
  return res;
}
// console.log(convertToWave([2, 4, 7, 8, 9, 10]));

// Bitonic Point [O(n)]
const findBitonicPoint = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return arr[i - 1];
  }
  return arr[arr.length - 1];
}

// w/ binarySearch technique [O(logn)]
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
const bitonicPointRec = (array) => {
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


// Maximum of all subarrays of size k
// O(n*k)
function max_of_subarrays(arr, n, k) {
  let maxValues = [];
  for (let i = 0; i <= n - k; i++) {
    //  maxValues.push(arr.slice(i, i + k).sort((a, b) => a - b)[k - 1]); // works with high time complexity
    let count = i, currMax = arr[i];
    while (count < i + k) {
      if (arr[count] > currMax) currMax = arr[count];
      count++;
    }
    maxValues.push(currMax);
  }
  return maxValues;
}


// 
const maxOfSubarrays = (arr, k) => {
  const n = arr.length;
  const maxValues = [];
  const deque = [];

  for (let i = 0; i < n; i++) {
    // Remove elements not within the window
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift();
    }
    // Remove elements from the deque that are less than the current element
    while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
      deque.pop();
    }
    // Add current element's index to the deque
    deque.push(i);
    // The first element in the deque is the largest element of the current window
    if (i >= k - 1) {
      maxValues.push(arr[deque[0]]);
    }
  }
  return maxValues;
}
const arr = '1 2 3 1 4 5 2 3 6'.split(' ');
// console.log(maxOfSubarrays(arr, 3));


// Combioinations of coins
function count(N, coins, sum) {
  if (sum < 0) return 0;
  const dp = new Array(sum + 1).fill(0);
  dp[0] = 1; // Base case: There is one way to make sum 0, by using no coins.

  for (let coin of coins) {
    for (let i = coin; i <= sum; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[sum];
}
// const coins = [1, 2, 3];
// const sum = 4;
// const totalCombinations = count(coins, sum);
// console.log(totalCombinations);


