
// DFS
// preOrderTraversal = root, left, right
// inOrderTraversal = left, root, right
// postOrderTraversal = left, right, root


export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  #root;

  constructor() {
    this.#root = null;
  }

  getRoot() {
    return this.#root;
  }

  isEmpty() {
    return !this.#root;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) this.#root = newNode;
    else this.#insertNode(this.#root, newNode);
  }

  #insertNode(root, newNode) {
    let curr = root;
    while (curr) {
      while (newNode.value <= curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      }
      while (newNode.value > curr.value) {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
    }
  }

  #insertNodeRecursive(root, newNode) {
    if (newNode.value < root.value) {
      if (!root.left) root.left = newNode;
      else this.#insertNodeRecursive(root.left, newNode);
    }
    else {
      if (!root.right) root.right = newNode;
      else this.#insertNodeRecursive(root.right, newNode);
    }
  }

  search(value, root = this.#root) {
    if (!root) return false;
    else {
      if (value === root.value) return true;
      else if (value < root.value) return this.search(value, root.left);
      else return this.search(value, root.right);
    }
  }

  min(root = this.#root) {
    if (!root.left) return root.value;
    else return this.min(root.left);
  }

  max(root = this.#root) {
    if (!root.right) return root.value;
    else return this.min(root.right);
  }

  height(node = this.#root) {
    if (!node) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  delete(value) {
    this.#root = this.#deleteNode(this.#root, value);
  }

  #deleteNode(root, value) {
    if (!root) return root;
    if (value < root.value) {
      root.left = this.#deleteNode(root.left, value);
    }
    else if (value > root.value) {
      root.right = this.#deleteNode(root.right, value);
    }
    else {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      else if (!root.right) return root.left;

      root.value = this.min(root.right);
      root.right = this.#deleteNode(root.right, root.value);
    }
    return root;
  }


  // DFS
  preOrder(root = this.#root) {
    if (!root) return [];
    const data = [];
    let st = [root];
    while (st.length) {
      let curr = st.pop();
      data.push(curr.value);
      curr.right && st.push(curr.right);
      curr.left && st.push(curr.left);
    }
    return data;
  }

  preOrderRecursive(root = this.#root) {
    const data = []
    if (root) {
      data.push(root.value);
      data.push(...this.preOrder(root.left));
      data.push(...this.preOrder(root.right));
    }
    return data;
  }


  inOrder(root = this.#root) {
    if (!root) return [];
    const data = [];
    let stack = [];

    let curr = root;
    while (curr || stack.length) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      data.push(curr.value);
      curr = curr.right;
    }
    return data;
  }
  
  inOrderRecursive(root = this.#root) {
    const data = [];
    if (root) {
      data.push(...this.inOrderRecursive(root.left));
      data.push(root.value);
      data.push(...this.inOrderRecursive(root.right));
    }
    return data;
  }


  postOrder(root = this.#root) {
    if (!root) return [];
    const data = [];

    const stack1 = [root];
    const stack2 = [];

    while (stack1.length) {
      const node = stack1.pop();
      stack2.push(node);

      node.left && stack1.push(node.left);
      node.right && stack1.push(node.right);
    }

    while (stack2.length) {
      const node = stack2.pop();
      data.push(node.value);
    }

    return data;
  }

  postOrderRecursive(root = this.#root) {
    const data = [];
    if (root) {
      data.push(...this.postOrderRecursive(root.left));
      data.push(...this.postOrderRecursive(root.right));
      data.push(root.value);
    }
    return data;
  }


  // BFS
  levelOrder() {
    const data = [];
    const queue = [];
    queue.push(this.#root);
    while (queue.length) {
      let curr = queue.shift();
      data.push(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return data;
  }

  levelOrderWLevels() {
    if (!this.#root) return [];
    let result = [];

    let queue = [[this.#root, 0]];
    while (queue.length) {
      let [node, level] = queue.shift();
      if (result.length === level) result.push([]);
      result[level].push(node.val);
      if (node.left) queue.push([node.left, level + 1]);
      if (node.right) queue.push([node.right, level + 1]);
    }
    // let queue = [root];
    // while (queue.length) {
    //     let levelSize = queue.length;
    //     let currentLevel = [];
    //     for (let i = 0; i < levelSize; i++) {
    //         let currentNode = queue.shift();
    //         currentLevel.push(currentNode.val);
    //         if (currentNode.left !== null) queue.push(currentNode.left);
    //         if (currentNode.right !== null) queue.push(currentNode.right);
    //     }
    //     result.push(currentLevel);
    // }
    return result;
  };

}

const bst = new BinaryTree();

console.log('Is Tree empty?', bst.isEmpty());

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);


bst.getRoot();

console.log(bst.search(5));
console.log(bst.search(10));
console.log(bst.search(20));
console.log(bst.preOrder());
console.log(bst.inOrder());
console.log(bst.postOrder());

console.log(bst.min());
console.log(bst.max());

console.log(bst.levelOrder());

bst.delete(10);
console.log(bst.levelOrder());


