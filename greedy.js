import { Node } from './data-structures/BinaryTree.mjs';
import { MinHeap } from './data-structures/Heap.mjs';

// N meetings in a room
function maxMeetings(start, end, n) {
  let times = [];
  for (let i = 0; i < n; i++) {
    times.push([start[i], end[i]]);
  }
  times.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let currEnd = times[0][1];
  for (let i = 1; i < n; i++) {
    if (times[i][0] > currEnd) {
      count++;
      currEnd = times[i][1];
    }
    else continue;
  }
  return count;
}


// Shop in Candy Store
function candyStore(n, k, candies) {
  candies.sort((a, b) => a - b);
  let res = [];

  const solve = (candies, res) => {
    let bought = 0, spent = 0;
    for (let i = 0; i < n; i++) {
      bought += 1 + k;
      spent += candies[i];
      if (bought >= n) return res.push(spent);
    }
  }

  solve(candies, res);
  solve(candies.reverse(), res);
  return res;
}


// Chocolate distribution problem
function findMinDiff(arr, n, m) {
  if (m === 0 || n === 0) {
    return 0;
  }
  arr.sort((a, b) => a - b);
  if (n < m) {
    return -1;
  }
  let minDiff = Infinity;
  for (let i = 0; i + m - 1 < n; i++) {
    let diff = arr[i + m - 1] - arr[i];
    if (diff < minDiff) {
      minDiff = diff;
    }
  }
  return minDiff;
}



class CustomMinHeap extends MinHeap {
  leftChild(index) {
    return this.getHeap()[this.getLeftChildIndex(index)].data;
  }
  rightChild(index) {
    return this.getHeap()[this.getRightChildIndex(index)].data;
  }
  parent(index) {
    return this.getHeap()[this.getParentIndex(index)].data;
  }

  // Override the heapifyUp method
  heapifyUp() {
    let index = this.getHeap().length - 1;
    while (this.hasParent(index) && this.parent(index) > this.getHeap()[index].data) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  // Override the heapifyDown method
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) <= this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.getHeap()[index].data < this.getHeap()[smallerChildIndex].data) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

// Huffman encoding
function traverse(root, code, res) {
  if (!root) return;
  if (!root.left && !root.right) return res.push(code);
  traverse(root.left, code + '0', res);
  traverse(root.right, code + '1', res);
}

function huffmanCodes(s, f, n) {
  let heap = new CustomMinHeap();
  for (let freq of f) {
    const node = new Node(freq);
    heap.add(node);
  }

  while (heap.size() > 1) {
    const left = heap.remove();
    const right = heap.remove();
    const node = new Node(left.data + right.data);
    node.left = left;
    node.right = right;
    heap.add(node);
  }

  const root = heap.peek();
  const res = [];
  traverse(root, '', res);

  return res;
}




// Fractional Knapsack
function fractionalKnapsack(w, arr, n) {
  arr.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  let currWeight = 0;
  let totalValue = 0;

  for (let item of arr) {
    if (currWeight + item.weight <= w) {
      currWeight += item.weight;
      totalValue += item.value;
    } else {
      totalValue += (w - currWeight) * (item.value / item.weight);
      break;
    }
  }

  return totalValue;
}


// JobScheduling
function jobScheduling(arr, n) {
  arr.sort((a, b) => (b.profit - a.profit) || (a.dead - b.dead));
  let maxDeadline = Math.max(...arr.map(job => job.dead));
  let slots = new Array(maxDeadline).fill(false); // To track free time slots
  let jobs = 0, totalProfit = 0;

  for (let job of arr) {
    // Try to schedule the job from its deadline to the start
    for (let j = job.dead - 1; j >= 0; j--) {
      if (!slots[j]) { // If the slot is free
        slots[j] = true; // Mark this slot as occupied
        totalProfit += job.profit; // Add profit
        jobs++; // Increment job count
        break; // Break out of the loop since job is scheduled
      }
    }
  }

  return [jobs, totalProfit];
}