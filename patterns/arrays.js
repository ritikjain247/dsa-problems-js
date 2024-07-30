function findMaxProduct(arr) {
  if (arr.length === 1) return arr[0];

  function solve(i, curr, hasTaken) {
    if (i === arr.length) return hasTaken ? curr : Number.MIN_SAFE_INTEGER;

    let incl = solve(i + 1, arr[i] * curr, true);
    let excl = solve(i + 1, curr, hasTaken);

    return Math.max(incl, excl);
  }

  return solve(0, 1, false);
}

function findMaxProduct2(arr) {
  const MOD = 1000000007;
  arr.sort((a, b) => a - b);

  let n = arr.length;
  let ans = 1;
  let countNeg = 0;
  let countPos = 0;
  let countZero = 0;

  // Count negatives, positives, and zeros
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) countNeg++;
    if (arr[i] > 0) countPos++;
    if (arr[i] === 0) countZero++;
  }

  // Special cases
  if (countNeg === 1 && countZero === n - 1) return 0;
  if (countNeg === 0 && countPos === 0) return 0;

  // Calculate product of non-zero numbers
  for (let it of arr) {
    if (it === 0) continue;
    ans = (ans * it) % MOD;
  }

  // If the product is negative (odd number of negative numbers), divide by the largest negative number
  if (ans < 0) {
    ans = Math.floor(ans / arr[countNeg - 1]);
  }

  return ans % MOD;
}



var productExceptSelf = function (nums) {
  // const prodAll = nums.reduce((prod, curr) => prod * (curr || 1), 1);
  // const hasZero = nums.indexOf(0) >= 0 ? true : false;
  // const hasZeroes = hasZero && nums.lastIndexOf(0) !== nums.indexOf(0);
  // return nums.map(curr => {
  //     if ((hasZero && curr) || (hasZeroes && !curr)) return 0;
  //     else if (!curr) return prodAll;
  //     else return prodAll / curr;
  // });

  const n = nums.length;
  const ans = Array.from(n).fill(1);
  let prefix = 1;
  let suffix = 1;

  for (let i = 0; i < n; i++) {
    ans[i] = prefix;
    prefix *= nums[i]
  }
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= suffix;
    suffix *= nums[i]
  }

  return ans;
};


// Maximize sum after K negations
function maximizeSum(arr, n, k) {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < n && k > 0; i++) {
    if (arr[i] < 0) {
      arr[i] = -arr[i];
      k--;
    }
  }

  if (k % 2 !== 0) {
    arr.sort((a, b) => a - b);
    arr[0] = -arr[0];
  }
  return arr.reduce((sum, curr) => sum + curr, 0);
}