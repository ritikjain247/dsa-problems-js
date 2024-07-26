

// reverse linked list in k-groups
function kReverse(head, k) {
  // base case
  if (!head || !head.next) return head;
  // reverse first k nodes
  let prev = null;
  let curr = head;
  let next = null;
  let i = 0;
  while (curr && i < k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    i++;
  }
  // recurse
  if (next) {
    head.next = kReverse(next, k);
  }
  return prev;
}

// don't reverse last group if size is not multiple of k
var reverseKGroup = function (head, k) {
  // base case
  if (!head || !head.next) return head;
  let curr = head;
  let count = 0;
  // Count the number of nodes in the current group
  while (curr && count < k) {
    curr = curr.next;
    count++;
  }
  // If the number of nodes is less than k, return head as it is
  if (count < k) {
    return head;
  }
  // reverse first k nodes
  curr = head;
  let prev = null;
  let next = null;
  let i = 0;
  while (curr && i < k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    i++;
  }
  // recurse
  if (next) {
    head.next = reverseKGroup(next, k);
  }
  return prev;
};


// reverse a subset of a LL 
function reverseBetween(head, m, n) {
  let prev = null;

  let first = head, i = 1;
  while (i < m) {
    prev = first;
    first = first.next;
    i++;
  }
  let last = head, j = 1;
  while (j < n) {
    last = last.next;
    j++;
  }
  if (prev) prev.next = last;
  let curr = first;
  while (prev != last) {
    let next = curr.next;
    if (curr == first) curr.next = last.next;
    else curr.next = prev;
    prev = curr;
    curr = next;
  }
  if (m == 1) head = last;
  return head;

  // approach 2
  // if (!head || m === n) return head;

  // let dummy = { next: head };
  // let prev = dummy;

  // // Move `prev` to the node before the reversal starts
  // for (let i = 1; i < m; i++) {
  //     prev = prev.next;
  // }

  // // `start` will point to the first node in the sublist to be reversed
  // let start = prev.next;
  // let then = start.next;

  // // Reverse the sublist from `m` to `n`
  // for (let i = 0; i < n - m; i++) {
  //     start.next = then.next;
  //     then.next = prev.next;
  //     prev.next = then;
  //     then = start.next;
  // }

  // return dummy.next;
}


// Remove all occurences of duplicates in a linked list
// Input: Linked List = 23->28->28->35->49->49->53->53
// Output: 23->35
function removeAllDuplicates(head) {
  let dummy = new Node(-1);
  let tail = dummy;
  let curr = head;

  // Stores whether the running duplicate chain precedes 
  // the curr position or not
  let prev_dups = false;

  while (curr && curr.next) {
    // Skip till curr's data and next's data is same
    while (curr.next && curr.data === curr.next.data) {
      curr = curr.next;
      prev_dups = true;
    }

    // If duplicate chain preceded then jump a step 
    // otherwise add curr to result ll
    if (prev_dups) {
      curr = curr.next;
      prev_dups = false;
    } else {
      tail.next = curr;
      tail = tail.next;
      curr = curr.next;
      tail.next = null;
    }
  }

  // If curr is not null then check 
  // if curr is a part of preceding duplicate ll else add to the result ll
  if (curr) {
    tail.next = curr;
  }

  return dummy.next;
}






// class Node {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//   }
// }
function pairWiseSwap(head) {
  if (!head || !head.next) {
    return head; // If the list is empty or has only one node, return the head
  }
  let prev = null;
  let current = head;
  head = current.next; // The second node will become the new head
  while (current && current.next) {
    let next = current.next;
    let nextPair = next.next;
    console.log(`prev: `, prev, `\ncurrent: `, current, `\nnext: `, next, `\nnextPair: `, nextPair);
    // Swapping nodes
    next.next = current;
    current.next = nextPair;
    if (prev) {
      prev.next = next;
    }
    // Update the previous node to the current node
    prev = current;
    // Move to the next pair of nodes
    current = nextPair;
    console.log(`prev: `, prev, `\ncurrent: `, current, `\nnext: `, next, `\nnextPair: `, nextPair);
  }
  return head;
}
// // Utility function to print the linked list
// function printList(head) {
//   let current = head;
//   while (current !== null) {
//     process.stdout.write(current.data + " -> ");
//     current = current.next;
//   }
//   console.log("null");
// }

// // Create a sample linked list: 1 -> 2 -> 3 -> 4
// let head = new Node(1);
// head.next = new Node(2);
// head.next.next = new Node(3);
// head.next.next.next = new Node(4);
// console.log("Original list:");
// printList(head);
// // Perform pairwise swap
// head = pairWiseSwap(head);
// console.log("List after pairwise swap:");
// printList(head);


function findFirstNodeOfLoop(head) {
  if (!head || !head.next) {
    return -1; // No loop if the list is empty or has only one node
  }

  let slow = head;
  let fast = head;

  // Step 1: Detect if there is a loop using Floyd's Cycle-Finding Algorithm
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Loop detected, now find the start of the loop
      let start = head;
      while (start !== slow) {
        start = start.next;
        slow = slow.next;
      }
      return start.data; // The node where both pointers meet is the start of the loop
    }
  }

  return -1; // No loop found
}


