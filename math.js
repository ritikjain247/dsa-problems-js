// Fibonacci

// w/ recurssion [O(2^n)] - terrible
const getFibonacciElementAtN = (n) => {
  if (n > 2) return getFibonacciElementAtN(n - 1) + getFibonacciElementAtN(n - 2);
  else if (n === 2 || n === 1) return n - 1;
  else return 'n should be > 0';
};
// console.log(getFibonacciElementAtN(7));

// w/o recurssion (iterative) [O(n)]: DP array Bottom up approach
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
// starting with 1, 1, ... and handling large numbers
function nthFibonacci(n) {
  if (n === 1 || n === 2) return 1;
  let a = 1, b = 1, res;
  for (let i = 3; i <= n; i++) {
    res = (a + b) % 1000000007;
    a = b;
    b = res;
  }
  return res.toString();
}


// return entire sequence (Do this w/o for loop) -
const fibonacci = (n) => {
  const fib = [];
  if (n <= 0) return 'n should be > 0';
  else if (n === 1) fib.push(0);
  else fib.push(0, 1);
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}
// console.log(fibonacci(7));


// Factorial
// [O(n)]
const factorialRecursive = (n) => {
  if (n === 1 | n === 0) return 1;
  else if (n < 0) return 'n should be > 0'
  else return n * factorialRecursive(n - 1);
}

// [O(n)]
const factorial = (n) => {
  if (n < 0) return 'n should be > 0';
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res = res * i;
  }
  return res;
}
// console.log(factorial(5));


// Prime O(n)
// const isPrime = (n) => {
//   if (n <= 1) return false;
//   for (let i = 2; i < n; i++) {
//     if (n % i === 0) return false;
//   }
//   return true;
// }

// O(logn)
const isPrime = (n) => {
  if (n <= 1) return false;  // 0 and 1 are not prime numbers
  if (n <= 3) return true;   // 2 and 3 are prime numbers
  if (n % 2 === 0 || n % 3 === 0) return false;  // Handle multiples of 2 and 3
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
// console.log(isPrime(99991));


// Power of two
// [O(n)]
// const isTwosPower = (n) => {
//   for (let i = 0; i < n; i++) {
//     if (2 ** i === n) return true;
//   };
//   return false;
// }

// OR w/o ** operator [O(log n)]
const isTwosPower = (n) => {
  while (n > 1) {
    if (n % 2 !== 0) return false;
    n = n / 2;
  }
  return true;
}
// console.log(isTwosPower(1024));

// [O(1)]
const isPowerOfTwoBitwise = (n) => {
  if (n < 1) return false;
  return (n & (n - 1)) === 0;
}
// console.log(isPowerOfTwoBitwise(1024));


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
// const gcdRecursive = (a, b) => b === 0 ? a : gcdRecursive(b, a % b);


// Integers in range
const range = (x, y) => {
  if (y - x < 2) return [];
  return [x + 1, ...range(x + 1, y)];
}
// console.log(range(3, 9));

// const nestedObject = {
//   data: {
//     info: {
//       stuff: {
//         thing: {
//           moreStuff: {
//             magicNumber: 44,
//             something: 'foo2'
//           }
//         }
//       }
//     }
//   }
// }

// Search JS Object
const contains = (obj, val) => {
  for (let key in obj) {
    if (obj[key] === val) return true;
    if (typeof obj[key] === 'object') return contains(obj[key], val);
  }
  return false;
}
// console.log(contains(nestedObject, 44));


// const nestedArray = [[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]];

// Parse a multi-dimensional array
const totalIntegers = (arr) => {
  let count = 0;
  arr.forEach(element => {
    if (Number.isInteger(element)) count++;
    else if (Array.isArray(element)) count += totalIntegers(element)
  });
  return count;
}
// console.log(totalIntegers(nestedArray));


// Write a function that sums squares of numbers in list that may contain more lists
const sumSquares = (array) => {
  let sum = 0;
  array.forEach(element => {
    if (Number.isInteger(element)) sum += element ** 2;
    else if (Array.isArray(element)) sum += sumSquares(element);
  });
  return sum;
}
// l = [10, [[10], 10], [10]];
// console.log(sumSquares(l));


// Cartesian Product
function cartesianProduct(A, B) {
  let product = [];
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      product.push([A[i], B[j]]);
    }
  }
  return product;
}
// console.log(cartesianProduct([1, 2], [3, 4, 5]));


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

// Ways to Reach the n'th Stair
// order does not matter
function countWays(n) {
  // let count = 1;
  // while (n - 2 >= 0) {
  //   count++;
  //   n -= 2;
  // }
  // return count;
  return Math.floor(n / 2) + 1;
}
// order does matter: DP
function countWays2(n) {
  if (n <= 1) return 1;
  let a = 0n, b = 1n, res;
  for (let i = 1; i <= n; i++) {
    res = (a + b) % 1000000007n;
    a = b;
    b = res;
  }
  return res;
}



// using BFS
function waysToClimbBFS(n) {
  const result = [];
  const queue = [[]]; // Start with an empty sequence of steps
  while (queue.length > 0) {
    const currentSteps = queue.shift(); // Get the next sequence to explore
    const sum = currentSteps.reduce((a, b) => a + b, 0); // Calculate the sum of the current sequence
    if (sum === n) {
      result.push(currentSteps); // If the sum equals n, it's a valid combination
    } else if (sum < n) {
      // If the sum is less than n, add the next possible steps
      queue.push([...currentSteps, 1]);
      queue.push([...currentSteps, 2]);
    }
  }
  return result;
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
// towerOfHanoi(3, 'A', 'C', 'B');


function checkKthBit(n, k) {
  const binary = n.toString(2);
  return binary[binary.length - 1 - k] === '1' ? 'Yes' : 'No';// !!Number(binary[binary.length - 1 - k]) ? 'Yes' : 'No';
}
// console.log(checkKthBit(4,2));



// Largest element in array
function largest(arr, n) {
  return arr.sort((a, b) => a - b)[n - 1];
}
// console.log(largest([1, 99, 1000, 121, 2, 2, 3, 7], 8));


function remove_duplicate(arr, n) {
  let uniqueIndex = 1;
  for (let i = 1; i < n; i++) {
    if (arr[i] !== arr[i - 1]) {
      arr[uniqueIndex] = arr[i];
      uniqueIndex++;
    }
  }
  return uniqueIndex;
}
// console.log(remove_duplicate([1, 2, 2, 3, 7], 5));


// console.log([2, 2, 2, 2, 2].slice(3, 8));



// Extract the Number from the String
function ExtractNumber(sentence) {
  const regex = /[a-zA-Z]/g;
  const nums = sentence.replace(regex, '').split(' ');
  console.log(nums);
  let max = BigInt(-1);
  for (let num of nums) {
    if (num && !num.includes('9') && BigInt(num) > max) max = BigInt(num);
  }
  return max.toString();
}
// console.log(ExtractNumber('This is alpha 5057 and 97'));


const MOD = 1000000007;


// Fast exponential Power a^b
function power(a, b) {
  let res = 1;
  while (b > 0) {
    if (b & 1) res = (res * (a % MOD));
    a = ((a % MOD) * (a % MOD) % MOD);
    b >>= 1;
  }
  return res;
}

// Power a^b
function powerRecursive(a, b) {
  if (b === 0) return 1;
  if (b === 1) return a;
  let res = power(a, b / 2);
  return b % 2 === 0 ? res * res : a * res * res;
}
// console.log(power(10, 4)); 