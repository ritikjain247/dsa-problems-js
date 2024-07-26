const arrayToSearch = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]

// Linear search [O(n)]
// /**
//  * @param {number[]} arr 
//  * @param {number} target
//  *
//  * @returns {number}
//  */
const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// console.log(linearSearch(arrayToSearch, 2));


// Binary search [O(log n)]
// /**
//  * @param {number[]} arr 
//  * @param {number} target
//  *
//  * @returns {number}
//  */
const binarySearch = (arr, target) => {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex <= rightIndex) {
    let middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    if (target === arr[middleIndex]) return middleIndex;
    else if (target < arr[middleIndex]) rightIndex = middleIndex - 1;
    else leftIndex = middleIndex + 1;
  }
  return -1;
}
// console.log(binarySearch(arrayToSearch, 8));

// /**
//  * @param {number[]} arr 
//  * @param {number} target
//  *
//  * @returns {number}
//  */
const binarySearchRecursive = (arr, target) => {
  return search(arr, target, 0, arr.length - 1);
}
function search(arr, target, leftIndex, rightIndex) {
  if (leftIndex > rightIndex) return -1;
  let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
  if (target === arr[middleIndex]) return middleIndex;
  else if (target < arr[middleIndex]) return search(arr, target, leftIndex, middleIndex - 1);
  else return search(arr, target, middleIndex + 1, rightIndex);
}
// console.log(binarySearchRecursive(arrayToSearch, 10));

// Practice
// const binarySearch = (arr, target) => {
//   let start = 0, end = arr.length - 1;
//   while (start <= end) {
//     const mid = start + Math.floor((end - start) / 2);
//     if (target === arr[mid]) return mid;
//     else if (target < arr[mid]) end = mid - 1;
//     else start = mid + 1;
//   }
//   return -1;
// }

// const binarySearchRecursive = (arr, target, start, end) => {
//   if (start > end) return -1;
//   let mid = start + Math.floor((end - start) / 2);
//   if (target === arr[mid]) return mid;
//   else if (target < arr[mid]) return binarySearchRecursive(arr, target, start, mid - 1);
//   else if (target > arr[mid]) return binarySearchRecursive(arr, target, mid + 1, end);
// }
// console.log(binarySearchRecursive(arrayToSearch, 55, 0, arrayToSearch.length - 1));


// Ternary Search
const ternarySearch = (array, target) => {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const mid1 = start + Math.floor((end - start) / 3);
    const mid2 = end - Math.floor((end - start) / 3);
    if (target === array[mid1]) return mid1;
    if (target === array[mid2]) return mid2;
    if (target < array[mid1]) end = mid1 - 1;
    else if (target > array[mid2]) start = mid2 + 1;
    else {
      start = mid1 + 1;
      end = mid2 - 1;
    }
  }
  return -1;
}
// console.log(ternarySearch(arrayToSearch, 13));


// Jump Search [O(sqrt(n))]
const jumpSearch = (array, target) => {
  let block = Math.floor(Math.sqrt(array.length));
  let n = 0;
  while (n * block < array.length && array[n * block] < target) {
    n++;
  }
  for (let i = (n - 1) * block; i < array.length; i++) {
    if (target === array[i]) return i;
  }
  return -1;
}
// console.log(jumpSearch(arrayToSearch, 89));


// Interpolation Search
const linearInterpolationSearch = (array, target) => {
  let start = 0, end = array.length - 1;
  const pos = Math.floor(start + ((target - array[start]) * (end - start)) / (array[end] - array[start]));
  for (let i = pos; i < array.length; i++) {
    if (target === array[i]) return i;
  }
  return -1;
}
// console.log(linearInterpolationSearch(arrayToSearch, 55));


// Exponential Search
const exponentialSearch = (array, target) => {
  if (array[0] === target) return 0;
  let i = 1;
  let n = array.length;
  while (i < n && array[i] <= target) i = i * 2;
  if (i > array.length) return -1;
  return search(array, target, i / 2, Math.min(i, n - 1));
}
// console.log(exponentialSearch(arrayToSearch, 55));



