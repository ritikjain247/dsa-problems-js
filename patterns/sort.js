const arrayToSort = [-6, 20, 8, -2, 4];

// Selection Sort [O(n^2)]
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let iMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[iMin]) iMin = j;
    }
    if (iMin != i) {
      let temp = array[i];
      array[i] = array[iMin];
      array[iMin] = temp;
    }
  }
  return array;
}
// console.log(selectionSort(arrayToSort));

// Selection sort recursive XXX
function selectionSortRec(array, n) {
  if (n === 0 || n === 1) return array;
  let iMin = 0;
  for (let i = 0; i < n; i++) {
    if (array[i] < array[iMin]) iMin = i;
  }
  if (iMin != 0) {
    let temp = array[0];
    array[0] = array[iMin];
    array[iMin] = temp;
  }
  return [array[0], ...selectionSortRec(array.slice(1), n - 1)];
}
// console.log(selectionSortRec(arrayToSort, arrayToSort.length));

function selectionSortRecInPlace(array, n, start = 0) {
  if (start >= n - 1) return array; // Base case: stop recursion when start index is at the last or beyond
  let iMin = start;
  // Find the index of the minimum element in the remaining part of the array
  for (let i = start + 1; i < n; i++) {
    if (array[i] < array[iMin]) {
      iMin = i;
    }
  }
  // Swap the minimum element with the current start element
  if (iMin !== start) {
    let temp = array[start];
    array[start] = array[iMin];
    array[iMin] = temp;
  }
  // Recursively sort the rest of the array starting from the next element
  selectionSortRecInPlace(array, n, start + 1);
  return array;
}



// Bubble Sort [O(n^2)]
function bubbleSort(array, n) {
  for (let j = 0; j < n; j++) {
    let swapped = false;
    for (let i = 0; i < n - j; i++) { // optimised n - j
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return array;
}

// Bubble Sort recursive XXX
function bubbleSortRec(array, n) {
  if (n === 0 || n === 1) return array;
  for (let i = 0; i < n - 1; i++) {
    if (array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
    }
  }
  return [...bubbleSortRec(array.slice(0, -1), n - 1), array[n - 1]];
}

function bubbleSortRecInPlace(array, n) {
  if (n <= 1) return array; // Base case: if array has 0 or 1 elements, it's already sorted
  // Perform one pass of bubble sort
  for (let i = 0; i < n - 1; i++) {
    if (array[i] > array[i + 1]) {
      // Swap elements if they are out of order
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
    }
  }
  // Recursively sort the remaining elements (excluding the last one)
  bubbleSortRecInPlace(array, n - 1);
  return array;
}
// console.log(bubbleSortRec(arrayToSort, arrayToSort.length));


// Optimized Bubble Sort w/ Early exit [O(n^2)]
function bubbleSortOptimized(array) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return array;
}
// console.log(bubbleSortOptimized(arrayToSort));



// Insertion Sort [O(n^2)]
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let numberToInsert = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > numberToInsert) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = numberToInsert;
  }
  return array;
}

// Recursive insertion sort
function insertionSortRecInPlace(array, n) {
  if (n === 0 || n === 1) return;
  insertionSortRec(array, n - 1);
  let numberToInsert = array[n - 1];
  let j = n - 2;
  while (j >= 0 && array[j] > numberToInsert) {
    array[j + 1] = array[j];
    j--;
  }
  array[j + 1] = numberToInsert;
}

function insertionSortRec(array, n) {
  if (n === 0 || n === 1) return array.slice();
  let sortedArray = insertionSortRec(array, n - 1);
  let numberToInsert = array[n - 1];
  let j = n - 2;
  while (j >= 0 && sortedArray[j] > numberToInsert) {
    sortedArray[j + 1] = sortedArray[j];
    j--;
  }
  sortedArray[j + 1] = numberToInsert;
  return sortedArray;
}
// console.log(arrayToSort);
// console.log(insertionSortRec(arrayToSort, 5));
// console.log(arrayToSort);



// Quick Sort [O(n^2)] [Θ(nlogn)]
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// console.log(quickSort(arrayToSort));


// Mutate
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return; // Base case: stop recursion when left >= right
  // Partitioning
  let pivot = arr[right]; // Choose the rightmost element as pivot
  let partitionIndex = partition(arr, left, right, pivot);
  // Recursively sort elements before and after partition
  quickSortInPlace(arr, left, partitionIndex - 1);
  quickSortInPlace(arr, partitionIndex + 1, right);
  // No need to return anything as the array is sorted in place
}
function partition(arr, left, right, pivot) {
  let i = left - 1; // Index of smaller element
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j); // Swap elements at i and j
    }
  }
  swap(arr, i + 1, right); // Place the pivot element in its correct position
  return i + 1; // Return the partition index
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}





// Merge Sort [O(nlogn)]
function mergeSort(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) sorted.push(left.shift());
    else sorted.push(right.shift());
  }
  return [...sorted, ...left, ...right];
}


// Mutate original / in-place sorting
function mergeSortInPlace(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  mergeSortInPlace(left);
  mergeSortInPlace(right);
  mergeInPlace(array, left, right);
  return array;
}
function mergeInPlace(array, left, right) {
  let i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }
  while (i < left.length) {
    array[k++] = left[i++];
  }
  while (j < right.length) {
    array[k++] = right[j++];
  }
}
// console.log(mergeSort(arrayToSort)); 

