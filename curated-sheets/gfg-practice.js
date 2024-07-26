const randomArray = [42, 17, 68, 29, 53, 85, 10, 37, 91, 24];
const sortedArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];
const sortedArrayWithDuplicates = [1, 3, 5, 5, 5, 5, 67, 123, 355];
const bitonicArray = [1, 15, 25, 45, 42, 21, 17, 12, 11];



// is one array subset of other
function isSubset(a1, a2, n, m) {
  const [bigArray, bigArrayLength, smallArray] = n > m ? [a1, n, a2] : [a2, m, a1];
  const hashMap = {}
  for (let i = 0; i < bigArrayLength; i++) {
    hashMap[bigArray[i]] = (hashMap[bigArray[i]] || 0) + 1;
  }
  function checkAndUpdateHash(el) {
    if (!!hashMap[el]) {
      hashMap[el]--;
      return true;
    } else return false;
  }
  return smallArray.every(checkAndUpdateHash);
}
// const a1 = [11, 7, 1, 13, 21, 3, 7, 3]
// const a2 = [11, 3, 7, 1, 7]
// console.log(isSubset(a1, a2, 8, 5));


// Find duplicates in array
// function duplicates(a, n) {
//   const hashMap = {};
//   const res = [];
//   for (let i = 0; i < n; i++) {
//     hashMap[a[i]] = (hashMap[a[i]] || 0) + 1;
//     if (hashMap[a[i]] >= 2) res.push(a[i]);
//     res.find()
//   }
//   return res.sort((a,b) => a-b);
// }


function duplicates(a, n) {
  const hashMap = {};
  const res = new Set();
  for (let i = 0; i < n; i++) {
    if (hashMap[a[i]]) {
      res.add(a[i]);
    } else {
      hashMap[a[i]] = 1;
    }
  }
  return Array.from(res).sort((a, b) => a - b);
}


// First Repeated Element in an array
function firstRepeated(arr, n) {
  const hashMap = {};
  let minIndex = n;
  for (let i = 0; i < n; i++) {
    if (hashMap.hasOwnProperty(arr[i])) {
      minIndex = Math.min(minIndex, hashMap[arr[i]]);
    } else {
      hashMap[arr[i]] = i;
    }
  }
  return minIndex === n ? -1 : minIndex + 1;
}


// Non-Repeating Element
function firstNonRepeating(arr, n) {
  const hashMap = {};
  const indexMap = {};
  let res = 0, minIdx = n;
  for (let i = 0; i < n; i++) {
    if (hashMap.hasOwnProperty(arr[i])) {
      hashMap[arr[i]] += 1;
    } else {
      hashMap[arr[i]] = 1;
      indexMap[arr[i]] = i;
    }
    // hashMap[arr[i]] = [...(hashMap[arr[i]] || []), i]; // spread operator takes O(n) time which makes code O(n^2)
  }
  for (const key in hashMap) {
    if (hashMap[key] === 1 && indexMap[key] < minIdx) {
      minIdx = indexMap[key];
      res = key;
    }
    // if (hashMap[key].length === 1 && hashMap[key][0] <= minIdx) {
    //   res = key
    //   minIdx = hashMap[key][0];
    // };
  }
  return res;
}
// const a = [-1, 2, -1, 3, 2];
// console.log(firstNonRepeating(a, 5));


// Given a string s consisting of lowercase Latin Letters. Return the first non-repeating character in s. If there is no non-repeating character, return '$'.
function nonrepeatingCharacter(s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = (hash[s[i]] || 0) + 1;
  }
  for (let key in hash) {
    if (hash[key] === 1) return key;
  }
  return '$';
}


// First non-repeating character in a stream
function firstNonRepeating(arr) {
  const map = new Map();
  let res = "";
  const queue = [];
  for (let ch of arr) {
    queue.push(ch);
    map.set(ch, (map.get(ch) || 0) + 1);
    while (queue.length && map.get(queue[0]) > 1) {
      queue.shift();
    }
    res += queue.length ? queue[0] : '#';
  }
  return res;
}

// Alternate positive and negative numbers
function rearrange(arr, n) {
  const pos = [], neg = [];
  for (let i = 0; i < n; i++) {
    if (arr[i] >= 0) pos.push(arr[i]);
    else neg.push(arr[i]);
  }
  let posIndex = 0, negIndex = 0;
  for (let i = 0; i < n; i++) {
    // if ((i % 2 === 0 && !!pos.length) || !neg.length) arr[i] = pos.shift();
    // else arr[i] = neg.shift();
    if ((i % 2 === 0 && posIndex < pos.length) || negIndex >= neg.length) arr[i] = pos[posIndex++];
    else arr[i] = neg[negIndex++];
  }
  return arr;
}
// const arr = [-5, -2, 5, 2, 4, 7, 1, 8, 0, -8];
// console.log(rearrange(arr, 10));




// Count pairs with given sum
function getPairsCount(arr, n, k) {
  let hash = {}, count = 0;
  for (let i = 0; i < n; i++) {
    if (hash.hasOwnProperty(k - arr[i])) {
      count += hash[k - arr[i]];
    }
    hash[arr[i]] = (hash[arr[i]] || 0) + 1;
  }
  return count;
}
// console.log(getPairsCount([1, 1, 1, 1], 4, 2));


function commonElements(arr1, arr2, arr3, n1, n2, n3) {
  const commonElements = [];
  let i = 0, j = 0, k = 0;
  let lastAddedElement = null;
  while (i < n1 && j < n2 && k < n3) {
    // If the elements are the same, add it to the result
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      if (lastAddedElement !== arr1[i]) {
        commonElements.push(arr1[i]);
        lastAddedElement = arr1[i];
      }
      i++;
      j++;
      k++;
    }
    // If the element in the first array is smaller, move the pointer of the first array
    else if (arr1[i] < arr2[j]) i++;
    // If the element in the second array is smaller, move the pointer of the second array
    else if (arr2[j] < arr3[k]) j++;
    // If the element in the third array is smaller, move the pointer of the third array
    else k++;
  }
  return commonElements;
}
// const a1 = [1, 5, 10, 20, 40, 80], a2 = [6, 7, 20, 80, 100], a3 = [3, 4, 15, 20, 30, 70, 80, 120];
// console.log(commonElements(a1, a2, a3, 6, 5, 8));


// Chocolate Distribution Problem
function findMinDiff(arr, n, m) {
  if (m === 0 || n === 0) return 0;
  // Sort the given packets
  arr.sort((a, b) => a - b);
  // Number of students cannot be more than number of packets
  if (n < m) return -1;
  // Find the minimum difference
  let minDiff = Infinity;
  // Find the subarray of size m such that the difference between the maximum and minimum is minimum of all subarrays of size m.
  for (let i = 0; i + m - 1 < n; i++) {
    let diff = arr[i + m - 1] - arr[i];
    if (diff < minDiff) minDiff = diff;
  }
  return minDiff;
}




function segregateElements(arr, n) {
  const pos = [], neg = [];
  for (let i = 0; i < n; i++) {
    if (arr[i] >= 0) pos.push(arr[i]);
    else neg.push(arr[i]);
  }
  arr = [...pos, ...neg];
  const set = new Set([...pos, ...neg]);
  console.log(set.size);
  return arr;
}
// console.log(segregateElements([1, -1, 3, 2, -7, -5, 11, 6], 8));





// Padovan sequence
const nthPadovanElement = (n) => {
  if (n < 0) return 'n should be > 0';
  const fib = [1, 1, 1];
  for (let i = 3; i < n; i++) {
    fib[i] = fib[i - 2] + fib[i - 3];
  }
  return fib[n - 1];
}




// Armstrong Numbers
function armstrongNumber(n) {
  let sumOfCubes = 0, temp = n;
  while (temp > 0) {
    sumOfCubes += (temp % 10) ** 3;
    temp = Math.floor(temp / 10);
  }
  return sumOfCubes === n;
}
// console.log(armstrongNumber(153));

