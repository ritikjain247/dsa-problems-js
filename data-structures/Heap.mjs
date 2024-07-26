export class MinHeap {
  #heap;

  constructor() {
    this.#heap = [];
  }

  empty() {
    return !this.#heap.length;
  }

  getHeap() {
    return this.#heap;
  }

  // Helper Methods
  getLeftChildIndex = (parentIndex) => 2 * parentIndex + 1;
  getRightChildIndex = (parentIndex) => 2 * parentIndex + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  hasLeftChild = (index) => this.getLeftChildIndex(index) < this.#heap.length;
  hasRightChild = (index) => this.getRightChildIndex(index) < this.#heap.length;
  hasParent = (index) => this.getParentIndex(index) >= 0;

  leftChild = (index) => this.#heap[this.getLeftChildIndex(index)];
  rightChild = (index) => this.#heap[this.getRightChildIndex(index)];
  parent = (index) => this.#heap[this.getParentIndex(index)];


  // Functions to create Min Heap

  swap(index1, index2) {
    [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
  }

  peek() {
    if (this.#heap.length === 0) return null;
    return this.#heap[0];
  }

  // Removing an element will remove the
  // top element with highest priority then
  // heapifyDown will be called 
  remove() {
    if (this.#heap.length === 0) return null;
    const item = this.#heap[0];
    this.#heap[0] = this.#heap[this.#heap.length - 1];
    this.#heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.#heap.push(item);
    this.heapifyUp();
  }

  findIndex(node) {
    return this.#heap.findIndex((val) => node === val); // indexOf
  }

  heapifyUp() {
    let index = this.#heap.length - 1;
    while (this.hasParent(index) && this.parent(index) > this.#heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.#heap[index] < this.#heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  printHeap() {
    var heap = ` ${this.#heap[0]} `
    for (var i = 1; i < this.#heap.length; i++) {
      heap += ` ${this.#heap[i]} `;
    }
    console.log(heap);
  }
}


export class MaxHeap {
  #heap;

  constructor() {
    this.#heap = [];
  }

  empty() {
    return !this.#heap.length;
  }

  peek() {
    if (this.empty()) return null;
    return this.#heap[0];
  }

  add(item) {
    this.#heap.push(item);
    this.heapifyUp();
  }

  remove() {
    if (!this.#heap.length) return null;
    const item = this.#heap[0];
    this.#heap[0] = this.#heap[this.#heap.length - 1];
    this.#heap.pop();
    this.heapifyDown();
    return item;
  }

  heapifyUp() {
    let index = this.#heap.length - 1
    let parentIndex = Math.floor((index - 1) / 2);
    while (parentIndex >= 0 && this.#heap[parentIndex] < this.#heap[index]) {
      [this.#heap[parentIndex], this.#heap[index]] = [this.#heap[index], this.#heap[parentIndex]];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    };
  }

  heapifyDown() {
    let index = 0;
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    while (leftChildIndex < this.#heap.length) {
      let smallerChildIndex = leftChildIndex;
      if (rightChildIndex < this.#heap.length && this.#heap[rightChildIndex] < this.#heap[leftChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }
      if (this.#heap[index] > this.#heap[smallerChildIndex]) {
        break;
      } else {
        [this.#heap[smallerChildIndex], this.#heap[index]] = [this.#heap[index], this.#heap[smallerChildIndex]];
      }
      index = smallerChildIndex;
      leftChildIndex = 2 * index + 1;
      rightChildIndex = 2 * index + 2;
    }
  }

  printHeap() {
    var heap = ` ${this.#heap[0]} `
    for (var i = 1; i < this.#heap.length; i++) {
      heap += ` ${this.#heap[i]} `;
    }
    console.log(heap);
  }
}