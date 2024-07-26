import { LinkedList } from "./linked-list.mjs";

export class Queue {
  constructor() {
    this.items = {};
    this.front = 0
    this.rear = 0;
  }

  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    const item = this.items[this.front]
    delete this.items[this.front]
    this.front++;
    return item;
  }

  isEmpty() {
    return this.rear - this.front === 0;
  }

  peek() {
    return this.items[this.front] ?? null
  }

  size() {
    return this.rear - this.front;
  }

  print() {
    console.log(this.items);
  }
}

export class QueueCircular {
  constructor(capacity) {
    this.items = Array(capacity);
    this.capacity = capacity;
    this.currentLength = 0;
    this.rear = -1;
    this.front = -1;
  }

  enqueue(element) {
    if (this.isFull()) return 'Queue full';
    else {
      if (this.rear !== this.capacity - 1) this.rear++;
      else this.rear === 0;
      this.items[this.rear] = element; // this.items.push(element) - not possible as it will change array size
      this.currentLength++;
      if (this.front === -1) this.front = this.rear;
    }
  }

  dequeue() {
    if (this.isEmpty()) return 'Queue empty';
    const item = this.items[this.front]
    this.items[this.front] = null
    if (this.front !== this.capacity - 1) this.front++;
    else this.front === 0;
    this.currentLength--;
    if (this.isEmpty()) {
      this.front = -1;
      this.rear = -1;
    }
    return item;
  }

  isFull() {
    return this.currentLength === this.capacity;
  }

  isEmpty() {
    return this.currentLength === 0;
  }

  peek() {
    return this.items[this.front] ?? null;
  }

  size() {
    return this.currentLength;
  }

  print() {
    if (this.isEmpty()) 'Queue Empty';
    else {
      let str = '', i;
      for (i = this.front; i !== this.rear; i = (i + 1) % this.capacity) {
        str += this.items[i] + ' ';
      }
      str += this.items[i]
      console.log(str);
    } //console.log(this.items.toString().replaceAll(',', ' ').trim());
  }
}


// Not optimal using array - dequeue is linear time O(n), whereas w / object it is O(1)
export class QueueWArray {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
  peek() {
    return this.items[0] ?? null
  }
  size() {
    return this.items.length;
  }
  print() {
    console.log(this.items.toString());
  }
}


export class LinkedListQueue {
  constructor() {
    this.items = new LinkedList();
  }
  enqueue(element) {
    this.items.append(element);
  }
  dequeue() {
    if (this.isEmpty()) return 'Queue is empty';
    return this.items.removeFrom(0);
  }
  peek() {
    if (this.isEmpty()) return 'Queue is empty';
    return this.items.head.data;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  getSize() {
    return this.items.getSize();
  }
  clear() {
    this.items = new LinkedList();
  }
  print() {
    return this.items.print();
  }
}

// const q = new LinkedListQueue();
// console.log(q.isEmpty());
// q.enqueue(10);
// q.enqueue(20);
// q.enqueue(30);
// q.enqueue(40);
// q.print();
// console.log(q.getSize(), q.peek());
// q.dequeue();
// q.print();