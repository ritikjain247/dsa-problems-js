import { LinkedList } from "./linked-list.mjs";

export class Stack {
  constructor() {
    this.items = new LinkedList();
  }
  push(element) {
    this.items.prepend(element);
  }
  pop() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.items.removeFrom(0);
  }
  peek() {
    if (this.isEmpty()) return 'Stack is empty';
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

// const stack = new Stack();
// console.log(stack.isEmpty());
// stack.push(10);
// stack.push(20);
// stack.push(30);
// console.log(stack.getSize());
// stack.print();
// console.log(stack.peek());
// console.log(stack.pop());
// stack.print();
// console.log(stack.peek());
// stack.clear();
// stack.print();


class StackWArray {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) return 'Stack is empty';
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
  print() {
    console.log(this.items.toString());
  }
}

