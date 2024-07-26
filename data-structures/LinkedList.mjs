class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  prepend(element) {
    const node = new Node(element);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    }
    else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  append(element) {
    const node = new Node(element);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    }
    else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  insert(element, index) {
    if (index < 0 || index > this.size) return 'Invalid Index';
    if (index === 0) this.prepend(element);
    else {
      let node = new Node(element);
      let curr = this.head;
      for (let i = 0; i < index - 1; i++) {
        curr = curr.next;
      }
      node.next = curr.next;
      curr.next = node;
      if (!node.next) this.tail = node;
    }
    this.size++;
  }

  search(data) {
    if (this.isEmpty()) return -1;
    let index = 0, current = this.head;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  removeData(data) {
    if (this.isEmpty()) return 'Nothing to Remove';
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      if (this.size === 0) this.tail = null;
      return `${data} removed from index 0`;
    }
    let current = this.head, index = 1;
    while (current.next) {
      if (current.next.data === data) {
        let removedNode = current.next;
        current.next = removedNode.next;
        if (!current.next) this.tail = current;
        this.size--;
        return `${data} removed from index ${index}`;
      }
      current = current.next;
      index++;
    }
    return `Data '${data}' not found in the list`;
  }

  removeFrom(index) {
    if (this.isEmpty()) return 'Nothing to Remove';
    if (index < 0 || index >= this.size) return 'Invalid Index';
    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    }
    else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      removedNode = current.next;
      current.next = removedNode.next;
      if (!current.next) this.tail = current;
    }
    this.size--;
    if (this.size === 0) this.tail = null;
    return removedNode.data;
  }

  removeFromFront() {
    return this.removeFrom(0);
  }

  removeFromEnd() {
    return this.removeFrom(this.size - 1)
  }

  reverse() {
    if (this.isEmpty() || this.size === 1) return;
    let previous = null;
    let current = this.head;
    this.tail = this.head;
    while (current) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
    this.tail.next = null;
  }

  print() {
    if (this.isEmpty()) console.log('List is Empty');
    else {
      let current = this.head;
      let listValues = ''
      while (current) {
        listValues += `${current.data} `
        current = current.next;
      }
      console.log(listValues);
    }
  }

}

/*
// const list = new LinkedList();
// console.log(list.isEmpty(), list.getSize());
// console.log(list.removeFrom(0));
// list.print();
// list.append(10);
// list.reverse();
// list.print();
// list.append(20);
// list.append(30);
// list.append(40);
// list.print();
// list.insert(7, 2);
// list.insert(50, 0);
// list.print();
// console.log(list.removeFrom(3));
// list.print();
// console.log(list.removeData(30));
// list.print();
// list.append(60);
// list.append(70);
// list.prepend(5);
// list.print();
// console.log(list.removeFrom(3));
// list.print();
// console.log(list.search(10));
// list.reverse();
// list.print();
// console.log(list.search(10));
*/

export class LinkedListBasic {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  // O(1)
  prepend(element) {
    let node = new Node(element);
    if (this.isEmpty()) this.head = node;
    else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // O(n)
  append(element) {
    let node = new Node(element);
    if (this.isEmpty()) this.head = node;
    else {
      let current = this.head;
      while (current.next) {
        current = current.next
      }
      current.next = node;
    }
    this.size++;
  }

  insert(element, index) {
    if (index < 0 || index > this.size) return 'Invalid Index';
    if (index === 0) this.prepend(element);
    else {
      let node = new Node(element);
      let previous = this.head;
      for (let i = 0; i < index - 1; i++) {
        previous = previous.next;
      }
      node.next = previous.next;
      previous.next = node;
    }
    this.size++;
  }

  search(data) {
    if (this.isEmpty()) return -1;
    let index = 0, current = this.head;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  removeData(data) {
    if (this.isEmpty()) return 'Nothing to Remove';
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return `${data} removed from index 0`;
    }
    else {
      let previous = this.head, index = 1;
      while (previous.next && previous.next.data !== data) {
        previous = previous.next;
        index++;
      }
      if (previous.next) {
        let removedNode = previous.next;
        previous.next = removedNode.next;
        this.size--;
        return `${data} removed from index ${index}`;
      }
      return `Data '${data}' not found in the list`;
    }
  }

  removeFrom(index) {
    if (this.isEmpty()) return 'Nothing to Remove';
    if (index < 0 || index >= this.size) return 'Invalid Index';
    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    }
    else {
      let previous = this.head;
      for (let i = 0; i < index - 1; i++) {
        previous = previous.next;
      }
      removedNode = previous.next;
      previous.next = removedNode.next;
      removedNode.next = null;
    }
    this.size--;
    return removedNode.data;
  }

  reverse() {
    let previous = null;
    let current = this.head;
    while (current) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  print() {
    if (this.isEmpty()) console.log('List is Empty');
    else {
      let current = this.head;
      let listValues = ''
      while (current) {
        listValues += `${current.data} `
        current = current.next;
      }
      console.log(listValues);
    }
  }
}




class NodeDouble {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  prepend(value) {
    const node = new NodeDouble(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  append(value) {
    const node = new NodeDouble(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  removeFromFront() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  removeFromEnd() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.tail.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return value;
  }

  print() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.head;
      let list = "";
      while (curr) {
        list += `${curr.value}<->`;
        curr = curr.next;
      }
      console.log(list);
    }
  }

  printReverse() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.tail;
      let list = "";
      while (curr) {
        list += `${curr.value}<->`;
        curr = curr.prev;
      }
      console.log(list);
    }
  }
}



// module.exports = LinkedList;

