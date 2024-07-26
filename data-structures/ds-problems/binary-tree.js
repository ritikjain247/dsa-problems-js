import { Node, BinaryTree } from "../BinaryTree.mjs";

function isMax(node) {
  if (!node) return Number.MIN_VALUE;
  let value = node.data;
  let leftVal = isMax(node.left);
  let rightVal = isMax(node.right);
  return Math.max(value, Math.max(leftVal, rightVal));
}
function isMin(node) {
  if (!node) return Number.MAX_VALUE;
  let value = node.data;
  let leftVal = isMin(node.left);
  let rightVal = isMin(node.right);
  return Math.min(value, Math.min(leftVal, rightVal));
}

// check valid BST
function isBST(root) {
  if (!root) return true;
  if (root.left && isMax(root.left) >= root.data) return false;
  if (root.right && isMin(root.right) <= root.data) return false;
  if (!isBST(root.left) || !isBST(root.right)) return false;
  return 1;
}
function isBSTAndCountNodes(root, min = -Infinity, max = Infinity) {
  if (!root) return { isBST: true, count: 0 };
  if (root.data <= min || root.data >= max) return { isBST: false, count: 0 };

  const leftResult = this.isBSTAndCountNodes(root.left, min, root.data);
  const rightResult = this.isBSTAndCountNodes(root.right, root.data, max);

  if (!leftResult.isBST || !rightResult.isBST) return { isBST: false, count: 0 };

  const totalCount = 1 + leftResult.count + rightResult.count;
  return { isBST: true, count: totalCount };
}


// Predecessor and Successor
function findPreSuc(root, key) {
  let pre = null, suc = null;

  function helper(root, key) {
    if (!root) return;
    if (key < root.key) {
      suc = root;
      helper(root.left, key);
    } else if (key > root.key) {
      pre = root;
      helper(root.right, key);
    } else {
      helper(root.right, key);
      helper(root.left, key);
    }
  }

  helper(root, key);
  return { pre, suc };
}


// In order traversal fill
function fillTree(root, arr) {
  if (!root) return;
  fillTree(root.left, arr);
  root.data = arr.shift();
  fillTree(root.right, arr);
}


// check if ancestor
function isAncestor(n1, n2) {
  if (!n1) return false;
  return isAncestor(n1.left, n2) || isAncestor(n1.right, n2);
}

// Find ancestors
function Ancestors(root, target) {
  let ancestors = [];
  findAncestors(root, target, ancestors);
  return ancestors;
}
function findAncestors(root, target, ancestors) {
  if (!root) return false;
  if (root.data === target) return true;
  if (findAncestors(root.left, target, ancestors) || findAncestors(root.right, target, ancestors)) {
    ancestors.push(root.data);
    return true;
  }
  return false;
}


// Lowest Common Ancestor in a Binary Tree / BST
function LCA(root, n1, n2) {
  if (!root) return null;
  if (root.data == n1 || root.data == n2) return root;
  let leftlca = this.LCA(root.left, n1, n2);
  let rightlca = this.LCA(root.right, n1, n2);
  if (leftlca && rightlca) return root;
  return leftlca ? leftlca : rightlca;
}

// Lowest Common Ancestor in a Binary Search Tree
function LCA2(root, n1, n2) {
  if (!root) return null;
  if (root.data > n1 && root.data > n2) return this.LCA(root.left, n1, n2);
  if (root.data < n1 && root.data < n2) return this.LCA(root.right, n1, n2);
  return root;
}
function LCA3(root, n1, n2) {
  if (!root) return null;
  while (root) {
    if (root.data > n1 && root.data > n2) root = root.left;
    else if (root.data < n1 && root.data < n2) root = root.right;
    else return root;
  }
}



// Kth Ancestor
function kthAncestor(root, k, node) {
  let par = new Map(); // Using a Map for parent pointers
  const dfs = (node, parent) => {
    if (node) {
      par.set(node.data, parent);
      dfs(node.left, node.data);
      dfs(node.right, node.data);
    }
  };
  dfs(root, null); // Populate parent map

  let ans = node;
  while (k > 0 && ans !== null) {
    ans = par.get(ans);
    k--;
  }

  return ans !== null ? ans : -1;
}


// Vertical order traversal of binary tree
function verticalOrder(root) {
  if (!root) return [];

  const nodes = new Map();
  const q = [[root, 0, 0]];
  const ans = [];

  while (q.length) {
    const [node, hd, lvl] = q.shift();

    const levelMap = nodes.get(hd) || new Map();
    const nodeList = levelMap.get(lvl) || [];
    nodeList.push(node.data);

    levelMap.set(lvl, nodeList);
    nodes.set(hd, levelMap);

    if (node.left) q.push([node.left, hd - 1, lvl + 1]);
    if (node.right) q.push([node.right, hd + 1, lvl + 1]);
  }

  [...nodes.keys()].sort((a, b) => a - b).forEach(hd => {
    [...nodes.get(hd).keys()].sort((a, b) => a - b).forEach(lvl => {
      ans.push(...nodes.get(hd).get(lvl));
    });
  });

  return ans;
}

// Vertical traversal with levels separator
var verticalTraversal = function (root) {
  if (!root) return [];

  const nodes = new Map();
  const q = [[root, 0, 0]];

  while (q.length) {
    const [node, hd, lvl] = q.shift();

    const levelMap = nodes.get(hd) || new Map();
    const nodeList = levelMap.get(lvl) || [];
    nodeList.push(node.val);

    levelMap.set(lvl, nodeList);
    nodes.set(hd, levelMap);

    if (node.left) q.push([node.left, hd - 1, lvl + 1]);
    if (node.right) q.push([node.right, hd + 1, lvl + 1]);
  }

  return [...nodes.keys()].sort((a, b) => a - b).map(hd =>
    [...nodes.get(hd).values()].map(level => level.sort((a, b) => a - b)).flat()
  );
};


function topView(root) {
  if (!root) return [];

  const nodes = new Map();
  const q = [[root, 0]];
  const ans = [];

  while (q.length) {
    const [node, hd] = q.shift();
    if (!nodes.get(hd)) nodes.set(hd, node.data);

    if (node.left) q.push([node.left, hd - 1]);
    if (node.right) q.push([node.right, hd + 1]);
  }

  [...nodes.keys()].sort((a, b) => a - b).forEach(hd => ans.push(nodes.get(hd)));

  return ans;
}

function bottomView(root) {
  if (!root) return [];

  const nodes = new Map();
  const q = [[root, 0]];
  const ans = [];

  while (q.length) {
    const [node, hd] = q.shift();
    nodes.set(hd, node.data);

    if (node.left) q.push([node.left, hd - 1]);
    if (node.right) q.push([node.right, hd + 1]);
  }

  [...nodes.keys()].sort((a, b) => a - b).forEach(hd => ans.push(nodes.get(hd)));

  return ans;
}

function leftView(root) {
  if (!root) return [];
  const res = [];
  const map = new Map();
  const q = [[root, 0]];

  while (q.length) {
    const [node, level] = q.shift();
    if (!map.has(level)) map.set(level, node.data);
    if (node.left) q.push([node.left, level + 1]);
    if (node.right) q.push([node.right, level + 1]);
  }

  [...map.keys()].forEach(level => res.push(map.get(level)));
  return res;
}

function rightView(root) {
  if (!root) return [];
  const res = [];
  const map = new Map();
  const q = [[root, 0]];

  while (q.length) {
    const [node, level] = q.shift();
    map.set(level, node.data);
    if (node.left) q.push([node.left, level + 1]);
    if (node.right) q.push([node.right, level + 1]);
  }

  [...map.keys()].forEach(level => res.push(map.get(level)));
  return res;
}



// Boundary traversal of binary tree
function isLeaf(node) {
  return node && !node.left && !node.right;
}
function leftBoundary(root, res = []) {
  let current = root;
  while (current) {
    if (!isLeaf(current)) res.push(current.data);
    current = current.left || current.right;
  }
  return res;
}
function leafNodes(root, res = []) {
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    if (node) {
      if (isLeaf(node)) res.push(node.data);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  return res;
}
function rightBoundary(root, res = []) {
  let current = root, temp = [];
  while (current) {
    if (!isLeaf(current)) temp.push(current.data);
    current = current.right || current.left;
  }
  while (temp.length) res.push(temp.pop());
  return res;
}
function boundary(root) {
  if (!root) return [];
  return [
    root.data,
    ...leftBoundary(root.left),
    ...leafNodes(root.left),
    ...leafNodes(root.right),
    ...rightBoundary(root.right)
  ];
}


// zigzag traversal
function zigZagTraversal(root) {
  if (!root) return [];
  const ans = [];
  let currLevel = [root], nextLevel = [], leftToRight = true;
  while (currLevel.length) {
    const curr = currLevel.pop();
    ans.push(curr.data);
    if (leftToRight) {
      if (curr.left) nextLevel.push(curr.left);
      if (curr.right) nextLevel.push(curr.right);
    } else {
      if (curr.right) nextLevel.push(curr.right);
      if (curr.left) nextLevel.push(curr.left);
    }
    if (!currLevel.length) {
      leftToRight = !leftToRight;
      [currLevel, nextLevel] = [nextLevel, currLevel];
    }
  }
  return ans;
}
// OR
function zigZagTraversal(root) {
  if (!root) return [];
  let q = [root];
  let res = [];
  let level = 1;

  while (q.length) {
    let temp = [];
    let s = q.length;

    for (let i = 0; i < s; i++) {
      let curr = q.shift();

      if (level % 2 === 0) temp.unshift(curr.data);  // reverse order for even levels
      else temp.push(curr.data);  // normal order for odd levels

      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }

    res.push(...temp);
    level++;
  }

  return res;
}


// Symmetric Tree
var isSymmetric = function (root) {
  if (!root) return true;

  function helper(root1, root2) {
    if (!root1 && !root2) return true;
    if ((!root1 || !root2) || (root1.val !== root2.val)) return false;
    return helper(root1.left, root2.right) && helper(root1.right, root2.left);
  }

  return helper(root.left, root.right);
};


// K Sum Paths
class KSumPaths {
  solve(root, k, count, path) {
    if (!root) return 0;
    path.push(root.data);
    this.solve(root.left, k, count, path);
    this.solve(root.right, k, count, path);
    let sum = 0;
    for (let i = path.length - 1; i >= 0; i--) {
      sum += path[i];
      if (sum === k) count.value++;
    }
    path.pop();
  }

  sumK(root, k) {
    const count = { value: 0 };
    this.solve(root, k, count, []);
    return count.value;
  }
}


// Maximum sum of Non-adjacent nodes
class MaxSum {
  solve(root) {
    if (!root) return [0, 0];

    const left = this.solve(root.left);
    const right = this.solve(root.right);

    const res = [];
    res[0] = root.data + left[1] + right[1];
    res[1] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return res;
  }
  //Function to return the maximum sum of non-adjacent nodes.
  getMaxSum(root) {
    let [incl, excl] = this.solve(root);
    return Math.max(incl, excl)
  }
}


// Largest BST subtree
class LargestBST {
  isBSTAndCountNodes(root, min = -Infinity, max = Infinity) {
    if (!root) return { isBST: true, count: 0 };
    if (root.data <= min || root.data >= max) return { isBST: false, count: 0 };
    const leftResult = this.isBSTAndCountNodes(root.left, min, root.data);
    const rightResult = this.isBSTAndCountNodes(root.right, root.data, max);
    if (!leftResult.isBST || !rightResult.isBST) return { isBST: false, count: 0 };
    const totalCount = 1 + leftResult.count + rightResult.count;
    return { isBST: true, count: totalCount };
  }
  isBST(root) {
    const result = this.isBSTAndCountNodes(root);
    return result.isBST ? result.count : 0;
  }
  largestBst(root) {
    if (!root) return 0;
    const result = this.isBST(root);
    if (result) return result;
    return Math.max(this.largestBst(root.left), this.largestBst(root.right));
  }
}
function largestBst(root) {
  function checkBst(root, min = -Infinity, max = Infinity) {
    if (!root) return [true, 0];
    if (root.key <= min || root.key >= max) return [false, 0];

    const left = checkBst(root.left, min, root.key);
    const right = checkBst(root.right, root.key, max);

    const isBst = left[0] && right[0];
    return [isBst, isBst ? 1 + left[1] + right[1] : 0];
  }

  if (!root) return 0;
  if (!root.left && !root.right) return 1;

  const [isBst, count] = checkBst(root);
  if (isBst) return count;
  return Math.max(this.largestBst(root.left), this.largestBst(root.right));
}


// Root to Leaf Paths
class PathsToLeaves {
  findPaths(root, currPath = [], paths = []) {
    if (!root) return paths;
    currPath.push(root.data);
    this.findPaths(root.left, currPath, paths);
    this.findPaths(root.right, currPath, paths);
    if (!root.left && !root.right) paths.push([...currPath]);
    currPath.pop();
    return paths;
  }
  Paths(root) {
    return this.findPaths(root, [], []);
  }
}


// Normal BST to Balanced BST
class ConvertToBalancedBST {
  inorder(root) {
    const data = [];
    if (!root) return data;
    data.push(...this.inorder(root.left));
    data.push(root);
    data.push(...this.inorder(root.right));
    return data;
  }
  build(inorder, start, end) {
    if (start > end) return null;
    const mid = start + Math.floor((end - start) / 2);
    const newNode = inorder[mid];
    newNode.left = this.build(inorder, start, mid - 1);
    newNode.right = this.build(inorder, mid + 1, end);
    return newNode;
  }
  buildBalancedTree(root) {
    const inorder = this.inorder(root);
    return this.build(inorder, 0, inorder.length - 1);
  }
}



// Inorder to BST
class InOrderToBST {
  build(inorder, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(inorder[mid]);

    node.left = this.build(inorder, start, mid - 1);
    node.right = this.build(inorder, mid + 1, end);

    return node;
  }

  fromInorder(inorder) {
    return this.build(inorder, 0, inorder.length - 1);
  }
}

// Preorder to BST
class PreOrderToBST {
  build(preorder, min, max) {
    if (preorder.length === 0) return null;

    const value = preorder[0];
    if (value < min || value > max) return null;

    preorder.shift();
    const node = new Node(value);
    node.left = this.build(preorder, min, value);
    node.right = this.build(preorder, value, max);
    return node;
  }
  buildBst(preorder) {
    return this.build(preorder, -Infinity, Infinity);
  }
}

// Convert inorder array to preorder array;
class InorderToPreorder {
  preorder(arr, start, end, ans) {
    if (start > end) return;
    const mid = start + Math.floor((end - start) / 2);
    ans.push(arr[mid]);
    this.preorder(arr, start, mid - 1, ans);
    this.preorder(arr, mid + 1, end, ans);
  }
  sortedArrayToBST(inorder) {
    const ans = [];
    this.preorder(inorder, 0, inorder.length - 1, ans);
    return ans;
  }
}



// Flatten BT to Linked List
function flatten(root) {
  if (!root) return null;

  const left = this.flatten(root.left);
  this.flatten(root.right);  // const right = this.flatten(root.right);

  if (left) {
    let temp = root.right;
    root.right = left;
    root.left = null;

    let current = left;
    while (current.right) {
      current = current.right;
    }
    current.right = temp;
  }
  return root;
}
// Time Complexity: O(n)
// Auxiliary Space: O(1)
function flattenRecursive(root) {
  if (!root) return null;
  const dummy = new Node(null);
  let current = dummy;
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
    current.right = node;
    current.left = null;
    current = node;
  }
  return dummy.right;
}


// Flatten BST to sorted Linked List
class BstToLinkedList {
  flattenBSTHelper(root) {
    if (!root) return null;
    const left = this.flattenBSTHelper(root.left);
    const right = root.right;
    root.right = null;
    if (left) {
      let curr = left;
      while (curr.right) curr = curr.right;
      curr.right = root;
    }
    else {
      root.left = root;
    }
    this.flattenBSTHelper(right);
    return left || root;
  }
  flattenBST(root) {
    if (!root) return null;
    const flattenedHead = this.flattenBSTHelper(root);
    root.left = null;
    return flattenedHead;
  }
}



// Count nodes of a Heap/Tree
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
function isComplete2(root) {
  if (!root) {
    return true;
  }
  const queue = [];
  let non_full_node = false;
  queue.push(root);
  while (queue.length > 0) {
    let tempNode = queue.shift();
    if (!tempNode) {
      non_full_node = true;
    } else {
      if (non_full_node) {
        return false;
      }
      queue.push(tempNode.left);
      queue.push(tempNode.right);
    }
  }
  return true;
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


// Binary Tree from Inorder and Postorder
function buildTree(ino, post, n) {
  const indexMap = new Map();
  for (let i = 0; i < n; i++) {
    indexMap.set(ino[i], i);
  }

  // Helper function to construct the tree
  const constructTree = (inStart, inEnd, postStart, postEnd) => {
    if (inStart > inEnd || postStart > postEnd) {
      return null;
    }

    // The last element in postorder is the root
    const rootValue = post[postEnd];
    const root = new Node(rootValue);

    // Find the index of the root in inorder
    const rootIndex = indexMap.get(rootValue);
    const leftTreeSize = rootIndex - inStart;

    // Recursively construct the left and right subtrees
    root.left = constructTree(inStart, rootIndex - 1, postStart, postStart + leftTreeSize - 1);
    root.right = constructTree(rootIndex + 1, inEnd, postStart + leftTreeSize, postEnd - 1);

    return root;
  };

  return constructTree(0, n - 1, 0, n - 1);
}


// Maximum difference between node and any ancestor in BT
function maxDiff(root) {
  function solve(root, diff) {
    if (!root) return Infinity;

    const left = solve(root.left, diff);
    const right = solve(root.right, diff);

    const ans = Math.min(left, right);
    diff = Math.max(diff, root.data - ans);

    return Math.min(root.data, ans);
  }

  const diff = -Infinity;
  solve(root, diff);
  return diff;
}


// Maximum sum of Non-adjacent nodes
// inclusion - exclusion principle
class MaxSumNonAdjacent {
  solve(root) {
    if (!root) return [0, 0];

    const left = this.solve(root.left);
    const right = this.solve(root.right);

    const res = [];
    res[0] = root.data + left[1] + right[1];
    res[1] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return res;
  }
  //Function to return the maximum sum of non-adjacent nodes.
  getMaxSum(root) {
    let [incl, excl] = this.solve(root);
    return Math.max(incl, excl)
  }
}


// Remove Half Nodes
function remove(root) {
  if (!root) return root;

  let left = remove(root.left);
  let right = remove(root.right);
  if ((!left && right) || (left && !right)) return left || right;

  root.left = left;
  root.right = right;
  return root;
}

function RemoveHalfNodes(root) {
  return remove(root);
}