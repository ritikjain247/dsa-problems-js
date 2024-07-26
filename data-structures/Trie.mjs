
export class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char);
    }
    curr.isEnd = true;
  }

  contains(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children.has(char)) return false;
      curr = curr.children.get(char);
    }
    return curr.isEnd;
  }

  delete(word) {
    const deleteHelper = (node, word, depth) => {
      if (!node) return false;

      if (depth === word.length) {
        if (!node.isEnd) return false;
        node.isEnd = false;
        return node.children.size === 0;
      }
      const char = word[depth];
      const childNode = node.children.get(char);
      if (!childNode) return false;

      const shouldDeleteChild = deleteHelper(childNode, word, depth + 1);
      if (shouldDeleteChild) {
        node.children.delete(char);
        return node.children.size === 0 && !node.isEnd;
      }
      return false;
    };

    deleteHelper(this.root, word, 0);
  }

  print() {
    const words = [];
    const printHelper = (node, prefix) => {
      if (node.isEnd) {
        words.push(prefix);
      }
      for (let [char, childNode] of node.children) {
        printHelper(childNode, prefix + char);
      }
    };
    printHelper(this.root, '');
    return words;
  }

}

let trie = new Trie();
trie.add('ritik');
trie.add('is');
trie.add('my');
trie.add('name');
trie.add('rit');
// console.log(trie.contains('ritik'));
console.log(trie.print());
trie.delete('ritik');
// console.log(trie.contains('ritik'));
// console.log(trie.contains('rit'));
// console.log(trie.root.children.get('r'));
console.log(trie.print());



// insertRecursive(word, node = this.root) {
//   if (!word.length) {
//     node.isEnd = true;
//     return;
//   }
//   else if (!node.children.has(word[0])) {
//     node.children.set(word[0], new TrieNode());
//     this.insert(word.substr(1), node.children.get(word[0]));
//   }
//   else this.insert(word.substr(1), node.children.get(word[0]));
// }

// print() {
//   let words = [];
//   const printHelper = (node, word, words) => {
//     if (!node || !node.children.size) {
//       words.push(word);
//       return;
//     }
//     if (node.isEnd) words.push(word);
//     Array(...node.children.keys()).forEach(key => {
//       word += key;
//       printHelper(node.children.get(key), word, words);
//       word = '';
//     })
//   }
//   printHelper(this.root, '', words);
//   return words;
// }



export class TrieNodeArray {
  constructor() {
    this.children = new Array(26);
    this.children.fill(null);
    this.isEndOfWord = false;
  }
}

export class TrieArray {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    this.insertUtil(this.root, word);
  }

  insertUtil(root, key) {
    if (!key.length) {
      root.isEndOfWord = true;
      return;
    }
    let index = key.charCodeAt(0) - 'a'.charCodeAt(0);
    if (root.children[index] != null) root = root.children[index];
    else {
      root.children[index] = new TrieNode();
      root = root.children[index];
    }
    return this.insertUtil(root, key.substring(1));
  }

  contains(word) {
    return this.search(this.root, word);
  }

  search(root, key) {
    if (!key.length) return root.isEndOfWord;
    let index = key.charCodeAt(0) - 'a'.charCodeAt(0);
    if (root.children[index] !== null) root = root.children[index];
    else return false;
    return this.search(root, key.substring(1));
  }
}
