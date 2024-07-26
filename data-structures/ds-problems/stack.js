// valid parenthesis
function ispar(x) {
  let checkBracket = {
    "}": "{",
    ")": "(",
    "}": "{",
    "]": "[",
  };
  let stack = [];
  for (let i of x) {
    if (stack.length && stack[stack.length - 1] == checkBracket[i]) {
      stack.pop();
    } else {
      stack.push(i);
    }
  }
  return stack.length === 0;
}


// longest valid parenthesis
function maxLength(s) {
  let st = [];
  let index = [];
  index.push(-1);

  let ans = 0;

  for (let i = 0; i < s.length; i++) {
    let ch = s.charAt(i);

    if (ch === '(') {
      index.push(i);
      st.push(ch);
    } else if (ch === ')' && st.length > 0) {
      st.pop();
      index.pop();
      ans = Math.max(ans, i - index[index.length - 1]);
    } else {
      index.push(i);
    }
  }
  return ans;
}


// insert element at bottom of a stack
function insertAtBottom(stack, x) {
  if (!stack.length) return stack.push(x);
  let top = stack.pop();
  insertAtBottom(stack, x);
  stack.push(top);
}

// reveerse a stack
function reverse(st) {
  if (!st.length || st.length === 1) return;
  let top = st.pop();
  reverse(st);
  insertAtBottom(st, top);
}


// Sort a stack
class Stack {
  constructor() {
    this.stack = [];
  }
}
Stack.prototype.sort = function () {
  sortStack(this.stack);
};

function sortStack(stack) {
  if (!stack.length) return;
  let top = stack.pop();
  sortStack(stack);
  sortedInsert(stack, top);
}

function sortedInsert(stack, x) {
  if (!stack.length || stack[stack.length - 1] > x) {
    stack.push(x)
    return;
  };
  let top = stack.pop();
  sortedInsert(stack, x);
  stack.push(top);
}



// The celebrity problem
function celebrity(M, n) {
  let st = [];
  for (let i = 0; i < n; i++) {
    st.push(i);
  }
  while (st.length !== 1) {
    let a = st[st.length - 1];
    st.pop();
    let b = st[st.length - 1];
    st.pop();

    if (M[a][b] === 1) st.push(b);
    else st.push(a);
  }
  let person = st[st.length - 1];
  let rowCheck = false;
  if (M[person].every(el => el === 0)) rowCheck = true;

  let colCheck = true;
  for (let i = 0; i < n; i++) {
    if (i !== person && M[i][person] !== 1) {
      colCheck = false;
      break;
    };
  }
  return rowCheck && colCheck ? person : -1;
}



// Next smaller elements in an array
function nextSmallerElement(arr, n) {
  let st = [-1];
  let res = [];
  for (let i = n - 1; i >= 0; i--) {
    let curr = arr[i];
    while (curr <= arr[st[st.length - 1]]) st.pop();
    res[i] = st[st.length - 1];
    st.push(i); //st.push(curr) for values instead of index.
  }
  return res;
}

function prevSmallerElement(arr, n) {
  let st = [-1];
  let res = [];
  for (let i = 0; i < n; i++) {
    let curr = arr[i];
    while (curr <= arr[st[st.length - 1]]) st.pop();
    res[i] = st[st.length - 1];
    st.push(i);
  }
  return res;
}

// Largest Rectangle in Histogram
// Function to find largest rectangular area possible in a given histogram.
function getMaxArea(hist, n) {
  let maxArea = 0;

  let next = nextSmallerElement(hist, n);
  let prev = prevSmallerElement(hist, n);
  console.log(next, prev);

  for (let i = 0; i < n; i++) {
    if (next[i] === -1) next[i] = n;
    // if (prev[i] === -1) prev[i] = 0;

    let maxWidth = next[i] - prev[i] - 1;
    console.log([i], maxWidth, next[i], prev[i]);
    let area = BigInt(maxWidth) * hist[i];
    maxArea = maxArea < area ? area : maxArea;
  }
  return maxArea;
}
console.log(getMaxArea([6n, 2n, 5n, 4n, 5n, 1n, 6n], 7));


// Approach 2
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



// Two stack in an array
class TwoStacks {
  // constructor for twoStacks()
  constructor() {
    this.size = 100;
    this.arr = Array(this.size);
    this.top1 = -1; // Initial top for Stack 1
    this.top2 = this.size; // Initial top for Stack 2
  }

  // Function to push an integer into the stack1.
  push1(x) {
    if (this.top1 < this.top2 - 1) {
      this.top1++;
      this.arr[this.top1] = x;
    }
  }

  // Function to push an integer into the stack2.
  push2(x) {
    if (this.top1 < this.top2 - 1) {
      this.top2--;
      this.arr[this.top2] = x;
    }
  }

  // Function to remove an element from top of the stack1.
  pop1() {
    if (this.top1 >= 0) {
      let x = this.arr[this.top1];
      this.top1--;
      return x;
    } else {
      return -1;
    }
  }

  // Function to remove an element from top of the stack2.
  pop2() {
    if (this.top2 < this.size) {
      let x = this.arr[this.top2];
      this.top2++;
      return x;
    } else {
      return -1;
    }
  }
}

// Implement k stacks in an array
class KStack {
  // constructor to create k stacks in an array of size n
  constructor(k1, n1) {
    // Initialize n and k, and allocate memory for all arrays
    this.k = k1;
    this.n = n1;
    this.arr = Array(n).fill(0);
    this.top = Array(k).fill(-1);
    this.next = Array(n).fill(0);

    // Initialize all spaces as free
    this.free = 0;
    for (var i = 0; i < n - 1; i++)
      this.next[i] = i + 1;
    this.next[n - 1] = -1; // -1 is used to indicate end of free list
  }

  // A utility function to check if there is space available
  isFull() {
    return (this.free == -1);
  }

  // To push an item in stack number 'sn' where sn is from 0 to k-1
  push(item, sn) {
    // Overflow check
    if (this.isFull()) {
      document.write("Stack Overflow");
      return -1;
    }

    // Store index of first free slot
    var i = this.free;
    // Update index of free slot to index of next slot in free list
    this.free = this.next[i];

    // Update next of top and then top for stack number 'sn'
    this.next[i] = this.top[sn];
    this.top[sn] = i;

    // Put the item in array
    this.arr[i] = item;
  }

  // To pop an element from stack number 'sn' where sn is from 0 to k-1
  pop(sn) {
    // Underflow check
    if (this.isEmpty(sn)) {
      document.write("Stack Underflow");
      return Number.MAX_VALUE;
    }

    // Find index of top item in stack number 'sn'
    var i = this.top[sn];
    // Change top to store next of previous top
    this.top[sn] = this.next[i];

    // Attach the previous top to the beginning of free list
    this.next[i] = this.free;
    this.free = i;

    // Return the previous top item
    return this.arr[i];
  }

  // To check whether stack number 'sn' is empty or not
  isEmpty(sn) {
    return (this.top[sn] == -1);
  }
}


// Stack Permutations
function isStackPermutation(N, A, B) {
  let st = [];
  let j = 0;
  for (let i = 0; i < N; i++) {
    st.push(A[i]);
    while (st.length && st[st.length - 1] === B[j]) {
      st.pop();
      j++;
    }
  }
  return !st.length ? 1 : 0;
}

// Count the Reversals to balance the brackets
function countRev(s) {
  if (s.length % 2 !== 0) return -1;
  let st = [];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') st.push('{');
    else if (st.length && st[st.length - 1] === '{') st.pop();
    else {
      st.push('{');
      count++;
    }
  }
  return count + st.length / 2;
}

// valid parenthesis String contains redundant brackets or not 
function checkRedundancy(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === '(' || ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      stack.push(ch);
    } else if (ch === ')') {
      let isRedundant = true;
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        const top = stack.pop();
        if (top === '+' || top === '-' || top === '*' || top === '/') {
          isRedundant = false;
        }
      }
      if (stack.length > 0 && stack[stack.length - 1] === '(') {
        stack.pop();  // pop the '('
      }
      if (isRedundant) {
        return 1;
      }
    }
  }

  return 0;
}


// Next Greater Element
function nextLargerElement(arr, n) {
  let st = [];
  let res = [];
  for (let i = n - 1; i >=0; i--) {
      while (st.length && arr[i] >= st[st.length - 1]) {
          st.pop();
      }
      if (!st.length) res[i] = -1;
      else if (arr[i] < st[st.length - 1]) {
          res[i] = st[st.length - 1];
      }
      st.push(arr[i]);
  }
  return res;
}