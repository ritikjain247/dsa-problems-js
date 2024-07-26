
// nthFibonacciNumber using Recursion + memoization: DP Top Down approach
const nthFibonacciNumber = (n) => {
  if (n < 0) return 'n should be > 0';
  const dp = Array(n + 1).fill(-1);

  function fib(n) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    dp[n] = fib(n - 1) + fib(n - 2);
    return dp[n];
  }

  return fib(n);
}


// w/o recurssion (iterative) [O(n)]: DP Bottom up approach
const nthFibonacciElement = (n) => {
  if (n < 0) return 'n should be > 0';
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}
// console.log(nthFibonacciElement(7));


// optimized for space
function nthFibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1, next;
  for (let i = 2; i <= n; i++) {
    next = (a + b);
    a = b;
    b = next;
  }
  return next;
}


// Ways to Reach the n'th Stair
// order does matter
function countWaysClimbingStaircase(n) {
  if (n <= 1) return 1;
  let a = 0n, b = 1n, res;
  for (let i = 1; i <= n; i++) {
    res = (a + b) % 1000000007n;
    a = b;
    b = res;
  }
  return res;
}



// Coin Change
// min coins required
var coinChangeMinCoins = function (coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let currAmount = coin; currAmount <= amount; currAmount++) {
      dp[currAmount] = Math.min(dp[currAmount - coin] + 1, dp[currAmount]);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

// count ways to change coins
function countWaysCoinChange(N, coins, amount) {
  const dpWays = Array(amount + 1).fill(0n);

  dpWays[0] = 1n;

  for (const coin of coins) {
    for (let currAmount = coin; currAmount <= amount; currAmount++) {
      dpWays[currAmount] = dpWays[currAmount - coin] + dpWays[currAmount];
    }
  }

  return dpWays[amount].toString();
}


// Max Sum without Adjacents
// Optimised for constant space 
function findMaxSum(arr, n) {
  let dp = Array(n).fill(0);
  dp[0] = arr[0];
  dp[1] = Math.max(arr[0], arr[1]);

  for (let i = 2; i < n; i++) {
    const incl = dp[i - 2] + arr[i];
    const excl = dp[i - 1];
    dp[i] = Math.max(incl, excl);
  }

  return dp[n - 1];
}

// Recursion + Memoization - Top Down
class MaxSumDP {
  solve(arr, n, i, dp) {
    if (i >= n) return 0;
    if (i === n - 1) return arr[n - 1];

    if (dp[i] !== -1) return dp[i];

    const incl = this.solve(arr, n, i + 2, dp) + arr[i];
    const excl = this.solve(arr, n, i + 1, dp);

    dp[i] = Math.max(incl, excl);
    return dp[i];
  }

  findMaxSum(arr, n) {
    let dp = Array(n).fill(-1);
    return this.solve(arr, n, 0, dp);
  }
}
// Recursion only
class MaxSumRec {
  solve(arr, n, i) {
    if (i >= n) return 0;
    if (i === n - 1) return arr[n - 1];

    const incl = this.solve(arr, n, i + 2) + arr[i];
    const excl = this.solve(arr, n, i + 1);

    return Math.max(incl, excl);
  }

  findMaxSum(arr, n) {
    return this.solve(arr, n, 0);
  }
}


// Maximize The Cut Segments
function maximizeTheCuts(n, x, y, z) {
  const dp = Array(n + 1).fill(-Infinity);
  dp[0] = 0;

  for (const segment of [x, y, z]) {
    for (let len = segment; len <= n; len++) {
      dp[len] = Math.max(dp[len - segment] + 1, dp[len]);
    }
  }

  return dp[n] === -Infinity ? 0 : dp[n];
}



// Function to count derangements
function countDerangements(n) {

  // Base case
  if (n == 1 || n == 2) {
    return n - 1;
  }

  // Variable for just storing
  // previous values
  let a = 0;
  let b = 1;

  // Using above recursive formula
  for (let i = 3; i <= n; ++i) {
    let cur = (i - 1) * (a + b);
    a = b;
    b = cur;
  }

  // Return result for n
  return b;
}



// 0-1 knapsack
//Function to return max value that can be put in knapsack of capacity W.
function knapSackRec(W, wt, val, n) {
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

function knapSackMem(W, wt, val, n) {
  let dp = Array.from({ length: n }, () => Array(W + 1).fill(-1));

  function solve(capacity, wt, val, n, index) {
    if (index === n - 1) {
      return wt[index] <= capacity ? val[index] : 0;
    }

    if (dp[index][capacity] != -1) return dp[index][capacity];

    let inc = 0, exc = 0;
    if (wt[index] <= capacity) {
      inc = val[index] + solve(capacity - wt[index], wt, val, n, index + 1);
    }
    exc = solve(capacity, wt, val, n, index + 1);

    dp[index][capacity] = Math.max(inc, exc);
    return dp[index][capacity];
  }
  let res = solve(W, wt, val, n, 0);
  // console.log(dp);
  return res;
}

function knapSackTab(W, wt, val, n) {
  // Initialize dp array with dimensions n x (W + 1) and fill with 0
  let dp = Array.from({ length: n }, () => Array(W + 1).fill(0));

  // Base case: Populate the first row for the first item
  for (let w = wt[0]; w <= W; w++) {
    dp[0][w] = val[0];
  }

  // Fill the dp array
  for (let i = 1; i < n; i++) {
    for (let w = 0; w <= W; w++) {
      let inc = 0, exc = 0;
      // Include the current item if its weight is less than or equal to current capacity
      if (wt[i] <= w) {
        inc = val[i] + dp[i - 1][w - wt[i]];
      }
      // Exclude the current item
      exc = dp[i - 1][w];

      // Choose the maximum of including or excluding the current item
      dp[i][w] = Math.max(inc, exc);
    }
  }

  // The result is in dp[n-1][W]
  return dp[n - 1][W];
}

function knapSack(W, wt, val, n) {
  // let prev = Array(W + 1).fill(0);
  // let curr = Array(W + 1).fill(0);

  // for (let w = wt[0]; w <= W; w++) {
  //   prev[w] = val[0];
  // }

  // for (let i = 1; i < n; i++) {
  //   for (let w = 0; w <= W; w++) {
  //     let inc = 0, exc = 0;
  //     if (wt[i] <= w) {
  //       inc = val[i] + prev[w - wt[i]];
  //     }
  //     exc = prev[w];
  //     curr[w] = Math.max(inc, exc);
  //   }
  //   prev = curr;
  // }

  // return prev[W];

  let prev = Array(W + 1).fill(0);
  for (let w = wt[0]; w <= W; w++) {
    prev[w] = val[0];
  }

  for (let i = 1; i < n; i++) {
    let curr = Array(W + 1).fill(0); // Create a new array for the current row
    for (let w = 0; w <= W; w++) {
      let inc = 0, exc = 0;
      if (wt[i] <= w) {
        inc = val[i] + prev[w - wt[i]];
      }
      exc = prev[w];
      curr[w] = Math.max(inc, exc);
    }
    prev = curr;
  }

  return prev[W];

}
// const W = 7;
// const wt = [2, 3, 4];
// const val = [60, 100, 120];
// const n = 3;

// // Call the knapSack function with the test input and print the result
// const result = knapSack(W, wt, val, n);
// console.log(`The maximum value that can be obtained is: ${result}`);


// Some 0/1 knapsack problems :

// ->Subset sum
// ->Equal sum partition
// ->Count of subsets sum with a given sum
// ->Minimum subset sum difference
// ->Count the number of subset with a given difference
// ->Target sum




var combinationSum4 = function (nums, target) {
  /*
    // Recusrion
    if (target === 0) {
        return 1
    }
    if (target < 0) {
        return null
    }
    let res = 0
    for (const val of nums) {
        res += combinationSum4(nums, target - val)
    }
    return res  
  */

  /*
    // Recusrion + Memo
    if (target in memo) {
        return memo[target]
    }
    if (target === 0) {
        return 1
    }
    if (target < 0) {
        return null
    }
    let res = 0
    for (const val of nums) {
        res += combinationSum4(nums, target - val, memo)
    }
    memo[target] = res
    return res
  */

  // DP
  let arr = Array(target + 1).fill(0)
  arr[0] = 1
  for (let i = 0; i <= target; i++) {
    for (const num of nums) {
      arr[i + num] = arr[i] + arr[i + num]
    }
  }
  return arr[target]
};


// Get Minimum perfect Squares
function minSquares(n) {
  // let dp = Array(n + 1).fill(-1);

  // function solve(n) {
  //   if (n === 0) return 0;
  //   if (dp[n] != -1) return dp[n];

  //   let res = n;
  //   for (let i = 1; i * i <= n; i++) {
  //     res = Math.min(res, 1 + solve(n - i * i))
  //   }

  //   dp[n] = res;
  //   return dp[n];
  // }

  let dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], 1 + dp[i - j * j])
    }
  }

  return dp[n];
}


// Minimum cost of jumps
function minimizeCost(height, n, k) {
  // Recusrive
  // function solve(index) {
  //   if (index >= n - 1) return 0;

  //   let cost = Infinity;
  //   for (let jumpStep = 1; jumpStep <= k && index + jumpStep < n; jumpStep++) {
  //     let currCost = Math.abs(height[index] - height[index + jumpStep]) + solve(index + jumpStep);
  //     cost = Math.min(cost, currCost);
  //   }

  //   return cost;
  // }
  // return solve(0);

  // Recursion Memoized
  // let dp = Array(n + 1).fill(-1);
  // function solve(index) {
  //     if (index >= n - 1) return 0;
  //     if (dp[index] != -1) return dp[index];

  //     let cost = Infinity;
  //     for (let jumpStep = 1; jumpStep <= k && index + jumpStep < n; jumpStep++) {
  //         let currCost = Math.abs(height[index] - height[index + jumpStep]) + solve(index + jumpStep);
  //         cost = Math.min(cost, currCost);
  //     }

  //     dp[index] = cost;
  //     return dp[index];
  // }
  // return solve(0);

  // Tabulation
  let dp = Array(n).fill(Infinity); // Initialize dp array with Infinity

  dp[0] = 0; // Cost to reach stone 0 is 0

  for (let i = 0; i < n; i++) {
    for (let jumpStep = 1; jumpStep <= k && i + jumpStep < n; jumpStep++) {
      dp[i + jumpStep] = Math.min(dp[i + jumpStep], dp[i] + Math.abs(height[i] - height[i + jumpStep]));
    }
  }

  return dp[n - 1];
}


// Largest square formed in a matrix
function maxSquareRec(n, m, mat) {
  function solve(i = 0, j = 0, max = 0) {
    if (i >= n || j >= m) return 0;

    let right = solve(i, j + 1, max);
    let diag = solve(i + 1, j + 1, max);
    let down = solve(i + 1, j, max);

    if (mat[i][j] === 1) {
      let ans = 1 + Math.min(right, diag, down);
      max = Math.max(max, ans);
      return ans;
    }
    else return 0;
  }

  return solve();
}
function maxSquareMem(n, m, mat) {
  let dp = Array.from({ length: n }, () => Array(m).fill(-1));
  let max = 0;

  function solve(i = 0, j = 0) {
    if (i >= n || j >= m) return 0;
    if (dp[i][j] != -1) return dp[i][j];

    let right = solve(i, j + 1);
    let diag = solve(i + 1, j + 1);
    let down = solve(i + 1, j);

    if (mat[i][j] === 1) {
      dp[i][j] = 1 + Math.min(right, diag, down);
      max = Math.max(max, dp[i][j]);
      return dp[i][j];
    }
    else {
      return dp[i][j] = 0;
    };
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      solve(i, j);
    }
  }

  return max;
}
// Tabulation Bottom Up
function maxSquareTab(n, m, mat) {
  let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  let maxSide = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (mat[i][j] === 1) {
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1]);
        maxSide = Math.max(dp[i][j], maxSide);
      }
    }
  }
  return maxSide;
}
// Space Opt
function maxSquare(n, m, mat) {
  let next = Array(m + 1).fill(0);
  let curr = Array(m + 1).fill(0);
  let maxSide = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (mat[i][j] === 1) {
        curr[j] = 1 + Math.min(next[j], curr[j + 1], next[j + 1]);
        maxSide = Math.max(curr[j], maxSide);
      }
      else curr[j] = 0;
    }
    next = [...curr];
  }
  return maxSide;
}


// Minimum Score Triangulation of Polygon
function minScoreTriangulation(arr) {

  // function solveRecMem(arr, i, j, dp) {
  //     if (i + 1 === j) return 0;
  //     if (dp[i][j] != -1) return dp[i][j];

  //     let min = Infinity;
  //     for (let k = i + 1; k < j; k++) {
  //         min = Math.min(min, arr[i] * arr[j] * arr[k] + solve(arr, i, k, dp) + solve(arr, k, j, dp));
  //     }
  //     dp[i][j] = min;
  //     return dp[i][j];
  // }

  const n = arr.length;
  let dp = Array(n).fill().map(() => Array(n).fill(0));

  let min = Infinity;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 2; j < n; j++) {
      let min = Infinity;
      for (let k = i + 1; k < j; k++) {
        min = Math.min(min, arr[i] * arr[j] * arr[k] + dp[i][k] + dp[k][j]);
      }
      dp[i][j] = min;
    }
  }
  return dp[0][n - 1];
}



// Reducing dishes
var maxSatisfaction = function (satisfaction) {
  satisfaction.sort((a, b) => a - b);
  const n = satisfaction.length;
  let dp = Array(n + 1).fill().map(() => Array(n + 1).fill(-1));

  function solveMem(index, time) {
    if (index === n) return 0;
    if (dp[index][time] != -1) return dp[index][time];

    let inc = (time + 1) * satisfaction[index] + solveMem(index + 1, time + 1);
    let excl = solveMem(index + 1, time);

    return dp[index][time] = Math.max(inc, excl);
  }

  let res = solveMem(0, 0);
  return res < 0 ? 0 : res;
};

function maxSatisfactionTab(satisfaction) {
  satisfaction.sort((a, b) => a - b);
  const n = satisfaction.length;
  let dp = Array(n + 1).fill().map(() => Array(n + 1).fill(0));

  for (let index = n - 1; index >= 0; index--) {
    for (let time = index; time >= 0; time--) {

      let inc = (time + 1) * satisfaction[index] + dp[index + 1][time + 1];
      let excl = dp[index + 1][time];

      dp[index][time] = Math.max(inc, excl);
    }
  }
  return dp[0][0];
}

function maxSatisfactionOpt(satisfaction) {
  satisfaction.sort((a, b) => a - b);
  const n = satisfaction.length;
  let next = Array(n + 1).fill(0);

  for (let index = n - 1; index >= 0; index--) {
    let curr = Array(n + 1).fill(0);

    for (let time = index; time >= 0; time--) {

      let inc = (time + 1) * satisfaction[index] + next[time + 1];
      let excl = next[time];

      curr[time] = Math.max(inc, excl);
    }
    next = curr;
  }
  return next[0];
}



// Longest Increasing Subsequence (LIS)

// Recursion : Time O(2^n) Space - O(n)
function longestSubsequenceRec(n, a) {
  function longestIncreasingSubsequence(index, prevIndex, arr) {
    if (index < 0) {
      return 0;
    }
    let take = -1e8;

    let notTake = longestIncreasingSubsequence(index - 1, prevIndex, arr);
    if (prevIndex === arr.length) {
      take = 1 + longestIncreasingSubsequence(index - 1, index, arr);
    } else if (arr[index] < arr[prevIndex]) {
      take = 1 + longestIncreasingSubsequence(index - 1, index, arr);
    }

    return Math.max(take, notTake);
  }

  return longestIncreasingSubsequence(n - 1, n, a);
}

// Recursion + Memoization - Top down : Time - O(n^2) Space - O(n^2)
function longestSubsequenceMem(n, a) {
  let dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));

  function longestIncreasingSubsequenceMemo(index, prevIndex) {
    if (index < 0) {
      return 0;
    }

    if (dp[index][prevIndex] !== -1) {
      return dp[index][prevIndex];
    }

    let take = -1e8;
    let notTake = longestIncreasingSubsequenceMemo(index - 1, prevIndex);

    if (prevIndex === a.length) {
      take = 1 + longestIncreasingSubsequenceMemo(index - 1, index);
    } else if (a[index] < a[prevIndex]) {
      take = 1 + longestIncreasingSubsequenceMemo(index - 1, index);
    }

    return dp[index][prevIndex] = Math.max(take, notTake);
  }

  return longestIncreasingSubsequenceMemo(n - 1, n);
}

// Tabulation - Bottom Up : Time - O(n^2) Space - O(n^2)
function longestSubsequenceTab(n, nums) {
  let dp = Array.from({ length: n + 1 }, () => Array(n + 2).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n + 1; j++) {
      let take = -1e8;
      let notTake = dp[i - 1][j];
      if (j - 1 === n) {
        take = 1 + dp[i - 1][i];
      } else if (nums[i - 1] < nums[j - 1]) {
        take = 1 + dp[i - 1][i];
      }
      dp[i][j] = Math.max(take, notTake);
    }
  }

  return dp[n][n + 1];
}

// Space optimization [2 rows] Time - O(n^2) Space - O(2n)
function longestSubsequenceOpt(n, nums) {
  let prev = Array(n + 2).fill(0);
  let curr = Array(n + 2).fill(0);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n + 1; j++) {
      let take = -1e8;
      let notTake = prev[j];
      if (j - 1 === n) {
        take = 1 + prev[i];
      } else if (nums[i - 1] < nums[j - 1]) {
        take = 1 + prev[i];
      }
      curr[j] = Math.max(take, notTake);
    }
    [prev, curr] = [curr, prev];  // Swap references
  }

  return prev[n + 1];
}

// Space optimization [1 row] Time - O(n^2) Space - O(n)
function longestSubsequenceOpt2(n, a) {
  let dp = Array(n).fill(1);
  let maxi = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (a[j] < a[i] && 1 + dp[j] > dp[i]) {
        dp[i] = 1 + dp[j];
      }
    }
    maxi = Math.max(maxi, dp[i]);
  }

  return maxi;
}

// DP with binary search : Time - O(n*log(n)) Space - O(n)
function longestSubsequenceBin(n, a) {
  let dp = []; // to store sorted values, does not store the actual LIS

  for (let i = 0; i < n; i++) {
    // Push the first element or if curr element > last element in dp
    if (!dp.length || a[i] > dp[dp.length - 1]) dp.push(a[i]);
    else {
      // Find the position where the current element should be placed
      let pos = dp.findIndex(element => element >= a[i]);
      // Replace the element at the found position
      dp[pos] = a[i];
    }
  }

  // Return the length of the dp array which represents the length of the longest subsequence
  return dp.length;
}


// Russian Doll Envelopes - same approach as above
var maxEnvelopes = function (envelopes) {
  envelopes.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])
  let len = envelopes.length, dp = []
  for (let i = 0; i < len; i++) {
    let height = envelopes[i][1], left = 0, right = dp.length
    while (left < right) {
      let mid = (left + right) >> 1
      if (dp[mid] < height) left = mid + 1
      else right = mid
    }
    dp[left] = height
  }
  return dp.length
};


// Maximum Height by Stacking Cuboids 
var maxHeight = function (cuboids) {
  // Sort the dimensions of each cuboid in ascending order
  for (let cuboid of cuboids) {
    cuboid.sort((a, b) => a - b);
  }

  // Sort the cuboids based on their dimensions
  cuboids.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else if (a[1] !== b[1]) {
      return a[1] - b[1];
    } else {
      return a[2] - b[2];
    }
  });

  // Initialize an array to store the maximum height for each cuboid
  const maxHeights = new Array(cuboids.length).fill(0);

  // Calculate the maximum height for each cuboid
  for (let i = 0; i < cuboids.length; i++) {
    maxHeights[i] = cuboids[i][2];
    for (let j = 0; j < i; j++) {
      if (cuboids[i][0] >= cuboids[j][0] && cuboids[i][1] >= cuboids[j][1] && cuboids[i][2] >= cuboids[j][2]) {
        maxHeights[i] = Math.max(maxHeights[i], maxHeights[j] + cuboids[i][2]);
      }
    }
  }

  // Return the maximum height
  return Math.max(...maxHeights);
};



// Find Distinct ways with DP

// Dice throw
function maxGold(M, N, X) {
  // const dp = Array.from({ length: N + 1 }, () => Array(X + 1).fill(-1));

  // function solveMem(dice, faces, target, dp) {
  //   if (target < 0 || (!dice && target) || (dice && !target)) return 0;
  //   if (!dice && !target) return 1;

  //   if (dp[dice][target] != -1) return dp[dice][target];

  //   let res = 0;
  //   for (let i = 1; i <= faces; i++) {
  //     res += solveMem(dice - 1, faces, target - i, dp);
  //   }
  //   dp[dice][target] = res;
  //   return dp[dice][target];
  // }


  // function solveTab(d, f, t) {
  //   const dp = Array.from({ length: d + 1 }, () => Array(t + 1).fill(0));

  //   dp[0][0] = 1;

  //   for (let dice = 1; dice <= d; dice++) {
  //     for (let target = 1; target <= t; target++) {

  //       let res = 0;
  //       for (let i = 1; i <= f && target - i >= 0; i++) {
  //         res += dp[dice - 1][target - i];
  //       }
  //       dp[dice][target] = res;
  //     }
  //   }
  //   return dp[d][t];
  // }

  // return solveMem(N, M, X, dp);
  // return solveTab(N, M, X);

  let prev = Array(X + 1).fill(0);
  prev[0] = 1;

  for (let dice = 1; dice <= N; dice++) {
    let curr = Array(X + 1).fill(0);
    for (let t = 1; t <= X; t++) {
      let res = 0;
      for (let i = 1; i <= M && t - i >= 0; i++) {
        res += prev[t - i];
      }
      curr[t] = res;
    }
    prev = curr;
  }
  return prev[X];

}


// Partition Equal Subset Sum
function equalPartition(arr, n) {
  const sum = arr.reduce((sum, curr) => sum + curr, 0);
  if (sum % 2 !== 0) return 0;
  const target = sum / 2;

  // function solveRec(i, target) {
  //     if (i >= n || target < 0) return false;
  //     if (target === 0) return true;
  //     // incl
  //     const incl = solveRec(i + 1, target - arr[i]);
  //     // excl
  //     const excl = solveRec(i + 1, target);
  //     return incl || excl;
  // }
  // return solveRec(0, target);

  // const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(-1));
  // function solveMem(i, target) {
  //   if (i >= n || target < 0) return false;
  //   if (target === 0) return true;
  //   if (dp[i][target] != -1) return dp[i][target];

  //   const incl = solveMem(i + 1, target - arr[i]);
  //   const excl = solveMem(i + 1, target);

  //   dp[i][target] = incl || excl;
  //   return dp[i][target];
  // }
  // return solveMem(0, target);

  // Tab
  // const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
  // dp.forEach(row => row[0] = true);

  // for (let i = n - 1; i >= 0; i--) {
  //   for (let t = 0; t <= target; t++) {
  //     const incl = dp[i + 1][t - arr[i]];
  //     const excl = dp[i + 1][t];
  //     dp[i][t] = incl || excl;
  //   }
  // }
  // return dp[0][target];

  // Space Optimized
  let next = Array(target + 1).fill(false);
  let curr = Array(target + 1).fill(false);
  curr[0] = true;
  next[0] = true;

  for (let i = n - 1; i >= 0; i--) {
    for (let t = 0; t <= target; t++) {
      const incl = next[t - arr[i]];
      const excl = next[t];
      curr[t] = incl || excl;
    }
    next = [...curr];
  }

  return curr[target];
}


// DP with Hashmap

// Longest Arithmetic Progression
function lengthOfLongestAP(A, n) {
  if (n <= 2) return n;

  let dp = Array(n + 1).fill().map(() => new Map()); // map to store {diff: length}
  let longest = 0;

  function solve(index, diff) {
    if (index < 0) return 0;
    if (dp[index].has(diff)) return dp[index].get(diff);
    let res = 0;
    for (let j = index - 1; j >= 0; j--) {
      if (A[index] - A[j] === diff) {
        res = Math.max(res, 1 + solve(j, diff));
      }
    }
    dp[index].set(diff, res);
    return dp[index].get(diff);
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let cd = A[j] - A[i];
      longest = Math.max(longest, solve(i, cd) + 2);
    }
  }

  return longest;
}

// Tabulation with hashmap DP
function lengthOfLongestAPTab(A, n) {
  if (n <= 2) {
    return n;
  }

  let ans = 0;
  const dp = new Array(n + 1).fill().map(() => new Map());

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const diff = A[i] - A[j];
      let cnt = 1;

      if (dp[j].has(diff)) {
        cnt = dp[j].get(diff);
      }

      dp[i].set(diff, 1 + cnt);
      ans = Math.max(ans, dp[i].get(diff));
    }
  }

  return ans;
}



// DP with merge intervals

// Unique BST's
var numTrees = function (n) {
  const dp = Array(n + 1).fill(-1);
  return solve(n, dp);
};

function solve(n, dp) {
  if (n <= 1) return 1;
  if (dp[n] != -1) return dp[n];

  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += solve(i - 1, dp) * solve(n - i, dp);
  }
  dp[n] = count;
  return dp[n];
}
// Tab
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] = dp[i] + dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];

  // With Catalan number series
  // let ans = 1;
  // for (let i = 0; i < n; i++) {
  //     ans *= (4 * i + 2) / (i + 2.);
  // }
  // return ans;
};



// Guess Number Higher or Lower II
var getMoneyAmount = function (n) {
  let dp = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));

  function calculateCost(start, end) {
    if (start >= end) return 0;
    if (dp[start][end] !== 0) return dp[start][end];

    let minCost = Infinity;
    for (let guess = Math.floor((start + end) / 2); guess <= end; guess++) {
      let cost = guess + Math.max(calculateCost(start, guess - 1), calculateCost(guess + 1, end));
      minCost = Math.min(minCost, cost);
    }

    dp[start][end] = minCost;
    return minCost;
  }

  return calculateCost(1, n);
};

// Tabulation : Bottom Up
var getMoneyAmount = function (n) {
  let dp = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));

  for (let end = 1; end <= n; end++) {
    for (let start = end - 1; start >= 1; start--) {
      let min = Infinity;
      for (let i = start; i < end; i++) {
        const cost = Math.max(dp[start][i - 1], dp[i + 1][end]) + i;
        min = Math.min(cost, min);
      }
      dp[start][end] = min;
    }
  }

  return dp[1][n]
};



// Buy Sell Stocks II
var maxProfit2RecMem = function (prices) {
  const n = prices.length;

  // Recursion
  // function solve(index, profit = 0, haveShare = false) {
  //     if (index === n) return profit;

  //     if (haveShare) {
  //         let sell = solve(index + 1, profit + prices[index], false);
  //         let hold = solve(index + 1, profit, true);
  //         return Math.max(sell, hold);
  //     }
  //     else {
  //         let buy = solve(index + 1, profit - prices[index], true);
  //         let hold = solve(index + 1, profit, false);
  //         return Math.max(buy, hold);
  //     }
  // }
  // return solve(0, 0, false);

  // Top down memoisation
  const dp = Array(n + 1).fill().map(() => [-1, -1]);
  function solve(index, haveShare = 0) {
    if (index === n) return 0;
    if (dp[index][haveShare] != -1) return dp[index][haveShare];

    let profit = 0;
    if (!haveShare) {
      let buy = solve(index + 1, 1) - prices[index];
      let hold = solve(index + 1, 0);
      profit = Math.max(buy, hold);
    }
    else {
      let sell = prices[index] + solve(index + 1, 0);
      let hold = solve(index + 1, 1);
      profit = Math.max(sell, hold);
    }
    dp[index][haveShare] = profit;
    return dp[index][haveShare];
  }
  return solve(0, 0);
};

var maxProfit2Tabulation = function (prices) {
  const n = prices.length;
  const dp = Array(n + 1).fill().map(() => [0, 0]);
  for (let index = n - 1; index >= 0; index--) {
    for (let haveShare = 0; haveShare <= 1; haveShare++) {

      let profit = 0;
      if (!haveShare) {
        let buy = dp[index + 1][1] - prices[index];
        let hold = dp[index + 1][0];
        profit = Math.max(buy, hold);
      }
      else {
        let sell = prices[index] + dp[index + 1][0];
        let hold = dp[index + 1][1];
        profit = Math.max(sell, hold);
      }
      dp[index][haveShare] = profit;
    }
  }
  return dp[0][0];
};

var maxProfit2Opt = function (prices) {
  const n = prices.length;
  let curr = [0, 0];
  let next = [0, 0];

  for (let index = n - 1; index >= 0; index--) {
    for (let haveShare = 0; haveShare <= 1; haveShare++) {
      let profit = 0;
      if (!haveShare) {
        let buy = next[1] - prices[index];
        let hold = next[0];
        profit = Math.max(buy, hold);
      }
      else {
        let sell = prices[index] + next[0];
        let hold = next[1];
        profit = Math.max(sell, hold);
      }
      curr[haveShare] = profit;
    }
    next = curr;
  }
  return curr[0];
};

var maxProfit2 = function (prices) {
  let prev = prices[0];
  let totalProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prev) {
      totalProfit += prices[i] - prev;
      prev = prices[i];
    }
    else prev = Math.min(prices[i], prev);
  }

  return totalProfit;
};



// Stock Buy and Sell III, with limit = 2, IV : with limit = k
var maxProfit3RecMem = function (prices) {
  const n = prices.length;
  const limit = 2;
  const dp = Array(n + 1).fill().map(() => Array(2).fill().map(() => Array(limit + 1).fill(-1)));

  function solve(index, haveShare, limit) {
    if (index === n) return 0;
    if (limit === 0) return 0;
    if (dp[index][haveShare][limit] != -1) return dp[index][haveShare][limit];

    let profit = 0;
    if (!haveShare) {
      let buy = solve(index + 1, 1, limit) - prices[index];
      let hold = solve(index + 1, 0, limit);
      profit = Math.max(buy, hold);
    }
    else {
      let sell = prices[index] + solve(index + 1, 0, limit - 1);
      let hold = solve(index + 1, 1, limit);
      profit = Math.max(sell, hold);
    }
    dp[index][haveShare][limit] = profit;
    return dp[index][haveShare][limit];
  }
  return solve(0, 0, 2);
};
var maxProfit3Tab = function (prices) {
  const n = prices.length;
  const LIMIT = 2;
  const dp = Array(n + 1).fill().map(() => Array(2).fill().map(() => Array(LIMIT + 1).fill(0)));
  for (let index = n - 1; index >= 0; index--) {
    for (let haveShare = 0; haveShare <= 1; haveShare++) {
      for (let limit = 1; limit <= LIMIT; limit++) {
        let profit = 0;
        if (!haveShare) {
          let buy = dp[index + 1][1][limit] - prices[index];
          let hold = dp[index + 1][0][limit];
          profit = Math.max(buy, hold);
        }
        else {
          let sell = prices[index] + dp[index + 1][0][limit - 1];
          let hold = dp[index + 1][1][limit];
          profit = Math.max(sell, hold);
        }
        dp[index][haveShare][limit] = profit;
      }
    }
  }
  return dp[0][0][LIMIT];
};

var maxProfit3Opt = function (prices) {
  const n = prices.length;
  const LIMIT = 2;

  let curr = Array(2).fill().map(() => Array(LIMIT + 1).fill(0));
  let next = Array(2).fill().map(() => Array(LIMIT + 1).fill(0));

  for (let index = n - 1; index >= 0; index--) {
    for (let haveShare = 0; haveShare <= 1; haveShare++) {
      for (let limit = 1; limit <= LIMIT; limit++) {
        let profit = 0;
        if (!haveShare) {
          let buy = next[1][limit] - prices[index];
          let hold = next[0][limit];
          profit = Math.max(buy, hold);
        }
        else {
          let sell = prices[index] + next[0][limit - 1];
          let hold = next[1][limit];
          profit = Math.max(sell, hold);
        }
        curr[haveShare][limit] = profit;
      }
    }
    next = curr;
  }
  return curr[0][LIMIT];
};

var maxProfit3 = function (prices) {
  let buy1 = -Infinity, buy2 = -Infinity;
  let sell1 = 0, sell2 = 0;

  for (let price of prices) {
    buy1 = Math.max(buy1, -price);
    sell1 = Math.max(sell1, buy1 + price);
    buy2 = Math.max(buy2, sell1 - price);
    sell2 = Math.max(sell2, buy2 + price);
  }

  return sell2;
};

var maxProfit4 = function (k, prices) {
  let costs = new Array(k).fill(Number.POSITIVE_INFINITY);
  let profits = new Array(k).fill(0);
  for (const price of prices) {
    costs[0] = Math.min(costs[0], price);
    profits[0] = Math.max(profits[0], price - costs[0]);
    for (let i = 1; i < k; i++) {
      costs[i] = Math.min(costs[i], price - profits[i - 1]);
      profits[i] = Math.max(profits[i], price - costs[i]);
    }
  }
  return profits[k - 1];
};


// with fee 
var maxProfitWithFee = function (prices, fee) {
  const n = prices.length;
  let curr = [0, 0];
  let next = [0, 0];

  for (let index = n - 1; index >= 0; index--) {
    for (let haveShare = 0; haveShare <= 1; haveShare++) {
      let profit = 0;
      if (!haveShare) {
        let buy = next[1] - prices[index];
        let hold = next[0];
        profit = Math.max(buy, hold);
      }
      else {
        let sell = prices[index] + next[0] - fee;
        let hold = next[1];
        profit = Math.max(sell, hold);
      }
      curr[haveShare] = profit;
    }
    next = curr;
  }
  return curr[0];
};

// GFG - Stock buy and sell, return buy sell values
function stockBuySell(A, n) {
  let buySaleData = [];
  let flag = 'buy';
  let bInx = 0;
  let sInx = 0;
  // let bValue = 0;

  for (let i = 0; i < n; i++) {
    let item = A[i];

    if (item < A[i + 1] && flag == 'buy') {
      bInx = i;
      flag = 'sale';
      // bValue = item;
    }
    else if ((item > A[i + 1] || i == n - 1) && flag == 'sale') {
      sInx = i;
      flag = 'buy';
      buySaleData.push([bInx, sInx]);
      // bInx = 0;
      // bValue = 0;
      // sInx = 0;
    }
  }

  return buySaleData;
}


// Longest common subsequence
function lcs1(n, m, str1, str2) {
  // Rec + Mem -
  // const dp = Array.from({length: n + 1}, () => Array(m + 1).fill(-1));
  // function solve(i, j) {
  //     if (i === n || j === m) return 0;
  //     if (dp[i][j] != -1) return dp[i][j];

  //     let len = 0;
  //     if (str1[i] === str2[j]) {
  //         len = 1 + solve(i + 1, j + 1);
  //     }
  //     else len = Math.max(solve(i, j + 1), solve(i + 1, j));

  //     return dp[i][j] = len;
  // }
  // return solve(0, 0);

  // Tabulation
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      let len = 0;
      if (str1[i] === str2[j]) {
        len = 1 + dp[i + 1][j + 1];
      }
      else len = Math.max(dp[i][j + 1], dp[i + 1][j]);
      dp[i][j] = len;
    }
  }

  return dp[0][0];
}

function lcs(n, m, str1, str2) {
  if (m > n) return this.lcs(m, n, str2, str1);

  let curr = Array(m + 1).fill(0);
  let next = Array(m + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      let len = 0;
      if (str1[i] === str2[j]) {
        len = 1 + next[j + 1];
      }
      else len = Math.max(curr[j + 1], next[j]);
      curr[j] = len;
    }
    next = [...curr];
  }

  return curr[0];
}

function longestPalinSubseq(S) {
  const n = S.length;

  // function solve(i, j) {
  //     if (i === n || j < 0) return 0;
  //     if (dp[i][j] != -1) return dp[i][j];

  //     let len = 0;
  //     if (S[i] === S[j]) {
  //         len = 1 + solve(i + 1, j - 1);
  //     }
  //     else len = Math.max(solve(i, j - 1), solve(i + 1, j));

  //     return dp[i][j] = len;
  // }
  // return solve(0, n - 1);

  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1; // A single character is a palindrome of length 1
    for (let j = i + 1; j < n; j++) {
      if (S[i] === S[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];

  // Doesn't work -
  // const dp = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  // for (let i = n - 1; i >= 0; i--) {
  //     for (let j = 1; j < n; j++) {
  //       let len = 0;
  //       if (S[i] === S[j]) {
  //         len = 1 + dp[i + 1][j - 1];
  //       }
  //       else len = Math.max(dp[i][j - 1], dp[i + 1][j]);
  //       dp[i][j] = len;
  //     }
  // }
  // return dp[0][n - 1];
}


// Edit distance
function editDistance(s, t) {
  if (s === t) return 0;
  const n = s.length;
  const m = t.length;
  if (!n || !m) return m || n;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

  function solve(i, j) {
    if (i >= n && j >= m) return 0;
    else if (i >= n && j < m) return m - j;
    else if (i < n && j >= m) return n - i;

    if (dp[i][j] != -1) return dp[i][j];

    if (s[i] !== t[j]) {
      const insert = solve(i, j + 1);
      const remove = solve(i + 1, j);
      const replace = solve(i + 1, j + 1);

      return dp[i][j] = 1 + Math.min(insert, remove, replace);
    }

    return dp[i][j] = solve(i + 1, j + 1);
  }

  solve(0, 0);

  return dp[0][0];
}

var minDistanceTab = function (s, t) {
  if (s === t) return 0;
  const n = s.length;
  const m = t.length;
  if (!n || !m) return m || n;

  let dp = Array.from({ length: n + 1 }, (_, i) =>
    Array.from({ length: m + 1 }, (_, j) => {
      if (i === n) return m - j;
      if (j === m) return n - i;
      return 0;
    })
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {

      if (s[i] !== t[j]) {
        const insert = dp[i][j + 1];
        const remove = dp[i + 1][j];
        const replace = dp[i + 1][j + 1];

        dp[i][j] = 1 + Math.min(insert, remove, replace);
      }

      else dp[i][j] = dp[i + 1][j + 1];
    }
  }

  return dp[0][0];
};

var minDistanceOpt = function (s, t) {
  if (s === t) return 0;
  const n = s.length;
  const m = t.length;
  if (!n || !m) return m || n;

  let next = new Array(m + 1).fill(0);

  // Initialize the base case for when i === n
  for (let j = 0; j <= m; j++) {
    next[j] = m - j;
  }

  for (let i = n - 1; i >= 0; i--) {
    let curr = new Array(m + 1).fill(0);
    // Initialize the base case for when j === m
    curr[m] = n - i;

    for (let j = m - 1; j >= 0; j--) {
      if (s[i] !== t[j]) {
        const insert = curr[j + 1];
        const remove = next[j];
        const replace = next[j + 1];

        curr[j] = 1 + Math.min(insert, remove, replace);
      }

      else curr[j] = next[j + 1];
    }
    next = curr;
  }

  return next[0];
};


// Wildcard pattern matching
var isMatch = function (str, pattern) {
  const dp = Array.from({ length: str.length + 1 }, () => Array(pattern.length + 1).fill(-1));

  function solve(i, j) {
    if (i < 0 && j < 0) return true;
    if (i >= 0 && j < 0) return false;
    if (i < 0 && j >= 0) {
      for (let k = 0; k <= j; k++) {
        if (pattern[k] != '*') return false;
      }
      return true;
    }

    if (dp[i][j] != -1) return dp[i][j];

    if (str[i] == pattern[j] || pattern[j] == '?') return dp[i][j] = solve(i - 1, j - 1);
    else if (pattern[j] == '*') return dp[i][j] = (solve(i - 1, j) || solve(i, j - 1));
    else return false;

  }

  return solve(str.length - 1, pattern.length - 1);
};

var isMatchTab = function (str, pattern) {
  const n = str.length;
  const m = pattern.length;
  // Create a dp array with size (n+1) x (m+1) filled with false
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
  // Base cases
  dp[0][0] = true; // Both strings are empty
  // If pattern contains only '*', it can match an empty string
  for (let j = 1; j <= m; j++) {
    if (pattern[j - 1] === '*') {
      dp[0][j] = dp[0][j - 1];
    }
  }

  // Fill the dp table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (pattern[j - 1] === str[i - 1] || pattern[j - 1] === '?') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (pattern[j - 1] === '*') {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else {
        dp[i][j] = false;
      }
    }
  }
  // The answer is whether the whole str matches the whole pattern
  return dp[n][m];
};

var isMatchOpt = function (str, pattern) {
  const n = str.length;
  const m = pattern.length;

  // Create two arrays for the current and previous rows
  let prev = new Array(m + 1).fill(false);
  // Base case: both strings are empty
  prev[0] = true;

  // Initialize the previous row for patterns containing only '*'
  for (let j = 1; j <= m; j++) {
    if (pattern[j - 1] === '*') {
      prev[j] = prev[j - 1];
    }
  }

  // Fill the dp table using curr and prev
  for (let i = 1; i <= n; i++) {
    let curr = new Array(m + 1).fill(false);

    curr[0] = false;  // Base case: pattern is empty

    for (let j = 1; j <= m; j++) {
      if (pattern[j - 1] === str[i - 1] || pattern[j - 1] === '?') {
        curr[j] = prev[j - 1];
      } else if (pattern[j - 1] === '*') {
        curr[j] = prev[j] || curr[j - 1];
      } else {
        curr[j] = false;
      }
    }

    // Swap curr and prev for the next iteration
    prev = curr;
  }

  // The answer is in prev[m] after the last swap
  return prev[m];
};


// Walls coloring
function minCostMem(costs) {
  const N = costs.length;
  const K = costs[0].length;
  if (N > 1 && K <= 1) return -1;
  if (K === 0 && N === 0) return 0;

  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(-1));

  function solve(i, lastColor) {
    if (i >= N) return 0;
    if (dp[i][lastColor] != -1) return dp[i][lastColor];

    let mincost = Infinity;
    for (let k = 0; k < K; k++) {
      if (k === lastColor) continue;
      mincost = Math.min(mincost, costs[i][k] + solve(i + 1, k));
    }
    if (mincost === Infinity && i < N && lastColor !== null) {
      mincost = costs[i][lastColor];
    }
    return dp[i][lastColor] = mincost;
  }

  let min = Infinity;
  for (let k = 0; k < K; k++) {
    min = Math.min(min, solve(0, k));
  }
  return min;
}
function minCostTab(costs) {
  const N = costs.length;
  if (N === 0) return 0;
  const K = costs[0].length;
  if (N > 1 && K <= 1) return -1;
  // Initialize the DP table with dimensions N x K
  const dp = Array.from({ length: N }, () => Array(K).fill(0));
  // Copy the costs of the first house to the first row of dp
  for (let j = 0; j < K; j++) {
    dp[0][j] = costs[0][j];
  }

  // Fill the DP table
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < K; j++) {
      dp[i][j] = costs[i][j] + Math.min(...dp[i - 1].filter((_, index) => index !== j));
    }
  }

  // The answer is the minimum value in the last row of the DP table
  return Math.min(...dp[N - 1]);
}

function minCostOpt(costs) {
  const N = costs.length;
  if (N === 0) return 0;
  const K = costs[0].length;

  if (N > 1 && K <= 1) return -1;

  // Initialize two arrays to store costs for the current and previous houses
  let prevCosts = costs[0].slice();
  let currCosts = new Array(K).fill(0);

  // Fill the DP table
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < K; j++) {
      currCosts[j] = costs[i][j] + Math.min(...prevCosts.filter((_, index) => index !== j));
    }
    // Swap the arrays
    [prevCosts, currCosts] = [currCosts, prevCosts];
  }

  // The answer is the minimum value in the prevCosts array
  return Math.min(...prevCosts);
}



// const costs = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
const costs = [[5]];
const cost = minCost(costs);
console.log(cost);;