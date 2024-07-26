
// Implement k Queues in a single array
class KQueues {
  constructor(k, n) {
    // Initialize n and k, and allocate memory for all arrays
    this.k = k;
    this.n = n;
    this.arr = new Array(n);
    this.front = new Array(k);
    this.rear = new Array(k);
    this.next = new Array(n);
    this.free = 0;

    // Initialize all queues as empty
    for (let i = 0; i < k; i++) {
      this.front[i] = this.rear[i] = -1;
    }

    // Initialize all spaces as free
    for (let i = 0; i < n - 1; i++) {
      this.next[i] = i + 1;
    }
    this.next[n - 1] = -1;
  }

  // To check whether queue number 'i' is empty or not
  isEmpty(i) {
    return this.front[i] == -1;
  }

  // To dequeue an from queue number 'i' where i is from 0 to k-1
  isFull(i) {
    return this.free == -1;
  }

  // To enqueue an item in queue number 'j' where j is from 0 to k-1
  enqueue(item, j) {
    if (this.isFull(j)) {
      document.write("queue overflow<br>");
      return;
    }

    // find free spot
    let nextFree = this.next[this.free];

    // check if first element of jth queue
    if (this.isEmpty(j)) {
      this.front[j] = this.free;
    } else {
      // Update next of rear for queue number 'j'
      this.next[this.rear[j]] = this.free;
    }

    // update rear
    this.rear[j] = this.free;

    // update next
    this.next[this.free] = -1;

    // Put the item in array
    this.arr[this.free] = item;

    // Update index of free slot to index of next slot in free list
    this.free = nextFree;
  }

  // To dequeue an from queue number 'i' where i is from 0 to k-1
  dequeue(i) {
    // Underflow checkSAS
    if (this.isEmpty(i)) {
      document.write("Stack underflow<br>");
      return Number.MIN_VALUE;
    }

    // Find index of front item in queue number 'i'
    let frontIndex = this.front[i];

    // Change top to store next of previous top
    this.front[i] = this.next[frontIndex];

    // Attach the previous front to the beginning of free list
    this.next[frontIndex] = this.free;
    this.free = frontIndex;

    return this.arr[frontIndex];
  }
}


// reverse a queue
class Queue {
  constructor() {
    this.arr = [];
    this.front = 0;
  }
  push(a) {
    this.arr.push(a);
  }
  pop() {
    if (this.arr.length != this.front) {
      let x = this.arr[this.front];
      this.front++;
      return x;
    }
    else
      return -1;
  }
  front_ele() {
    return this.arr[this.front];
  }
  empty() {
    if (this.arr.length != this.front)
      return false;
    else
      return true;
  }
}

function rev(q) {
  // let st = [];
  // while(!q.empty()) {
  //     st.push(q.pop());
  // }
  // while(st.length) {
  //     q.push(st.pop());
  // }
  // return q;
  if (q.empty()) return q;
  let val = q.front_ele();
  q.pop();
  q = this.rev(q);
  q.push(val);
  return q;
}



// First negative integer in every window of size k
function printFirstNegativeInteger(arr, n, k) {
  let dq = [];
  let ans = [];
  // Process first window
  for (let i = 0; i < k; i++) {
    if (arr[i] < 0) dq.push(i);
  }
  // Push ans for the first window
  if (dq.length > 0) ans.push(arr[dq[0]]);
  else ans.push(0);

  // Now process for remaining windows
  for (let i = k; i < n; i++) {
    // First pop out element outside current window
    if (dq.length > 0 && i - k >= dq[0]) dq.shift();
    // Then push current element
    if (arr[i] < 0) dq.push(i);
    // Put in ans
    if (dq.length > 0) ans.push(arr[dq[0]]);
    else ans.push(0);
  }
  return ans;
  // // without deque -
  // let res = [];
  // let firstNegativeIndex = 0;
  // let firstNegativeElement;
  // for (let i = k - 1; i < n; i++) {
  //     while ((firstNegativeIndex < i) && (firstNegativeIndex <= i - k || arr[firstNegativeIndex] >= 0)) {
  //         firstNegativeIndex++;
  //     }
  //     firstNegativeElement = arr[firstNegativeIndex] < 0 ? arr[firstNegativeIndex] : 0;
  //     res.push(firstNegativeElement);
  // }
  // return res;
}


// Maximum of all subarrays of size k
function max_of_subarrays(arr, n, k) {
  let deque = [];
  let result = [];
  let i = 0;

  while (i < n) {
    // Remove elements from the back of the deque while they are smaller than the current element
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      deque.pop();
    }
    // Add the current element's index to the deque
    deque.push(i);
    // Remove the element from the front of the deque if it's outside the current window
    if (deque[0] === i - k) {
      deque.shift();
    }
    // Once the window size is reached, add the front of the deque to the result
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
    i++;
  }

  return result;
}



// First non-repeating character in a stream
function firstNonRepeating(arr) {
  const map = new Map();
  let res = "";
  const queue = [];
  for (let ch of arr) {
    queue.push(ch);
    map.set(ch, (map.get(ch) || 0) + 1);
    while (queue.length && map.get(queue[0]) > 1) {
      queue.shift();
    }
    res += queue.length ? queue[0] : '#';
  }
  return res;
}


// Queue using two stacks
class StackQueue {
  constructor() {
    this.s1 = new Stack();
    this.s2 = new Stack();
  }

  /**
   * @param {number} B
  */
  //Function to push an element in queue by using 2 stacks.
  push(B) {
    this.s1.push(B);
  }

  /**
   * @returns {number}
  */
  //Function to pop an element from queue by using 2 stacks.
  pop() {
    if (this.s1.empty()) return -1;

    while (this.s1.top > 0) {
      this.s2.push(this.s1.front());
      this.s1.pop();
    }

    const front = this.s1.front();
    this.s1.pop();

    while (this.s2.top > -1) {
      this.s1.push(this.s2.front());
      this.s2.pop()
    }

    return front;
  }
}


// rotten oranges
function orangesRottingBrute(grid) {
  const n = grid.length;
  const m = grid[0].length;

  const visited = Array.from({ length: n }, () => new Array(m).fill(false));

  let fresh = 0;
  let queue = [];

  function countFresh() {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === 1) {
          fresh++;
        }
      }
    }
  }
  countFresh();

  function enque() {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === 2) {
          if (i + 1 < n && grid[i + 1][j] === 1 && !visited[i + 1][j]) {
            queue.push([i + 1, j]);
            visited[i + 1][j] = true;
          }
          if (j + 1 < m && grid[i][j + 1] === 1 && !visited[i][j + 1]) {
            queue.push([i, j + 1]);
            visited[i][j + 1] = true;
          }
          if (i - 1 >= 0 && grid[i - 1][j] === 1 && !visited[i - 1][j]) {
            queue.push([i - 1, j]);
            visited[i - 1][j] = true;
          }
          if (j - 1 >= 0 && grid[i][j - 1] === 1 && !visited[i][j - 1]) {
            queue.push([i, j - 1]);
            visited[i][j - 1] = true;
          }
        }
      }
    }
  }
  enque();

  let timer = 0;

  while (fresh) {
    while (queue.length) {
      let [x, y] = queue.shift();
      grid[x][y] = 2;
      fresh--;
    }
    timer++;
    enque();
    if (!queue.length) break;
  }

  return !fresh ? timer : -1;

}

// rotten oranges
function orangesRottingBFS(grid) {
  const n = grid.length;
  const m = grid[0].length;
  let fresh = 0;
  let queue = [];
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  // Count fresh oranges and enqueue all rotten oranges
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        fresh++;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  if (fresh === 0) return 0; // No fresh oranges to rot

  let timer = 0;

  // Perform BFS
  while (queue.length > 0) {
    let newQueue = [];
    while (queue.length > 0) {
      let [x, y] = queue.shift();
      for (let [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < n && ny < m && grid[nx][ny] === 1) {
          grid[nx][ny] = 2;
          fresh--;
          newQueue.push([nx, ny]);
        }
      }
    }
    if (newQueue.length > 0) {
      timer++;
      queue = newQueue;
    }
  }

  return fresh === 0 ? timer : -1;

}