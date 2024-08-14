import { MinHeap } from "../Heap.mjs";



// Height of an heap given its array representation
function heapHeight(arr, n) {
  let height = 0;
  let i = n - 1;
  while (i > 0) {
    height += 1;
    i = Math.floor((i - 1) / 2);
  }
  return height;
}



function swap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

function heapifyMin(arr, n, i) {
  let smallest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[smallest] > arr[left]) smallest = left;
  if (right < n && arr[smallest] > arr[right]) smallest = right;

  if (smallest !== i) {
    swap(arr, smallest, i);
    heapifyMin(arr, n, smallest);
  }
}




//Heapify function to maintain max heap property. O(log n)
function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[largest] < arr[left]) largest = left;
  if (right < n && arr[largest] < arr[right]) largest = right;

  if (largest !== i) {
    swap(arr, largest, i);
    heapify(arr, n, largest);
  }
}

//Function to build a Heap from array. O(n)
function buildHeap(arr, n) {
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
}

//Function to sort an array using Heap Sort.
function heapSort(arr, n) {
  buildHeap(arr, n);
  for (let i = n - 1; i >= 0; i--) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }
}

// Kth Smallest: O(nlogk)
function kthSmallest(arr, l, r, k) {
  let heap = arr.slice(l, l + k);
  buildHeap(heap, k);

  for (let i = l + k; i <= r; i++) {
    if (arr[i] < heap[0]) {
      heap[0] = arr[i];
      heapify(heap, k, 0);
    }
  }
  return heap[0];
}



// Count nodes of a Heap
function countNodes(root) {
  if (!root) return 0;
  else return countNodes(root.left) + countNodes(root.right) + 1;
}

// Is complete binary tree
function isCBT(root, i, count) {
  if (!root) return true;
  if (i >= count) return false;
  else {
    const left = isCBT(root.left, 2 * i + 1, count);
    const right = isCBT(root.right, 2 * i + 2, count);
    return left && right;
  }
}

// Does fullfill max heap property
function isMaxOrdered(root) {
  if (!root.left && !root.right) return true;
  if (!root.right) return root.data > root.left.data;
  else return (root.data > root.left.data) && (root.data > root.right.data) && isMaxOrdered(root.left) && isMaxOrdered(root.right);
}

// Is binary tree a heap
function isHeap(root) {
  const n = countNodes(root);
  return isCBT(root, 0, n) && isMaxOrdered(root);
}


// BST to max heap
class BstToMaxHeap {
  inorder(root, arr) {
    if (!root) return;
    this.inorder(root.left, arr);
    arr.push(root.data);
    this.inorder(root.right, arr);
  }
  fillPostOrder(root, order) {
    if (!root) return;
    root.data = order[order.length - 1];
    order.pop();
    this.fillPostOrder(root.right, order);
    this.fillPostOrder(root.left, order);
  }
  convertToMaxHeapUtil(root) {
    const order = [];
    this.inorder(root, order);
    this.fillPostOrder(root, order);
  }
}


// K-th Largest Sum Contiguous Subarray
function kthLargest(arr, N, K) {
  const minHeap = new MinHeap();
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = i; j < N; j++) {
      sum += arr[j];
      if (minHeap.size() < K) {
        minHeap.add(sum);
      } else if (sum > minHeap.top()) {
        minHeap.remove();
        minHeap.add(sum);
      }
    }
  }
  return minHeap.top();
}