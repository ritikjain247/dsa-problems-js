// Maximum of all subarrays of size k
function max_of_subarrays(arr, n, k) {
  let deque = [];
  let result = [];
  let i = 0;

  while (i < n) {
    // Remove elements from the back of the deque while they are smaller than the current element
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      deque.pop();
    }
    // Add the current element's index to the deque
    deque.push(i);
    // Remove the element from the front of the deque if it's outside the current window
    if (deque[0] === i - k) {
      deque.shift();
    }
    // Once the window size is reached, add the front of the deque to the result
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
    }
    i++;
  }

  return result;
}
// console.log(max_of_subarrays([1, 2, 3, 1, 4, 5, 2, 3, 6], 9, 3));
// console.log(max_of_subarrays([8, 5, 10, 7, 9, 4, 15, 12, 90, 13], 10, 3));



// Union of two sorted arrays
function findUnion(arr1, arr2) {
  // return Array.from(new Set([...arr1, ...arr2])).sort((a, b) => a - b);

  let i = 0, j = 0; // Pointers
  let union = []; // Union array
  while (i < n && j < m) {
    if (arr1[i] <= arr2[j]) { // Case 1 and 2
      if (union.length === 0 || union[union.length - 1] !== arr1[i]) {
        union.push(arr1[i]);
      }
      i++;
    } else { // Case 3
      if (union.length === 0 || union[union.length - 1] !== arr2[j]) {
        union.push(arr2[j]);
      }
      j++;
    }
  }
  while (i < n) { // If any elements left in arr1
    if (union.length === 0 || union[union.length - 1] !== arr1[i]) {
      union.push(arr1[i]);
    }
    i++;
  }
  while (j < m) { // If any elements left in arr2
    if (union.length === 0 || union[union.length - 1] !== arr2[j]) {
      union.push(arr2[j]);
    }
    j++;
  }
  return union;

}
// console.log(findUnion([1, 2, 3, 4, 5], [1, 2, 3]));



// Equal 0, 1 and 2
function getSubstringWithEqual012(Str) {
  let zc = 0
  let oc = 0;
  let tc = 0;
  let ansMap = new Map()
  ansMap['0#0'] = 1;
  let ans = 0;
  for (let i = 0; i < Str.length; i++) {
    if (Str[i] === '0') zc++;
    else if (Str[i] === '1') oc++;
    else tc++;
    let p = (zc - oc) + '#' + (oc - tc);
    console.log('p:', p);
    console.log('ansMap:', ansMap);
    if (ansMap[p]) {
      ans += ansMap[p]
      ansMap[p]++;
    }
    else ansMap[p] = 1;
  }
  return ans;
}
// console.log(getSubstringWithEqual012('0102010'));



function longestSubstrDistinctChars(s) {
  let max = 0;
  let len = 0;
  let seen = {};
  let i = 0;
  while (i < s.length) {
    console.log(s[i], len);
    if (!seen.hasOwnProperty(s[i])) {
      seen[s[i]] = i;
      len++;
      i++;
    }
    else {
      i = seen[s[i]] + 1;
      seen = {};
      len = 0;
    }
    console.log(len, seen);
    max = Math.max(max, len);
  }
  return max;
}
// console.log(longestSubstrDistinctChars('asdfasdfasdfasdf'));



function maxOccured(n, l, r, maxx) {
  // Step 1: Initialize the frequency array
  let freq = new Array(maxx + 2).fill(0);

  // Step 2: Mark the ranges
  for (let i = 0; i < n; i++) {
    freq[l[i]] += 1;
    if (r[i] + 1 <= maxx) {
      freq[r[i] + 1] -= 1;
    }
  }

  console.log(freq);
  // Step 3: Compute the prefix sum
  let maxCount = 0;
  let maxOccurring = 0;
  let currentCount = 0;

  for (let i = 0; i <= maxx; i++) {
    currentCount += freq[i];
    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxOccurring = i;
    }
  }

  return maxOccurring;
}
// console.log(maxOccured(4, [1, 4, 3, 1], [15, 8, 5, 4], 15));





function sortHalves(arr, n) {
  let i = 0;
  let first = [], second = [];
  do {
    first.push(arr[i]);
    i++;
  } while (arr[i] > arr[i - 1]);

  do {
    second.push(arr[i]);
    i++;
  } while (i < n);

  console.log('first: ', first, 'second: ', second);
  let pf = 0, ps = 0;
  for (let i = 0; i < n; i++) {
    if (!second[ps] || (first[pf] <= second[ps])) {
      arr[i] = first[pf];
      pf++;
    }
    else if (!first[pf] || (first[pf] > second[ps])) {
      arr[i] = second[ps];
      ps++;
    }
  }
  console.log(arr);
}
// console.log(sortHalves([2, 3, 8, -1, 7, 10], 6));




function countDistinct(arr, n, k) {
  let distinct = [];
  let seen = {};
  let currDistinct = 0;
  let l = 0, r = 0;
  while (r < n) {
    console.log('be', seen, [l, r], 'distinct', distinct, 'currDistinct', currDistinct);
    if (!seen[arr[r]]) {
      currDistinct++;
    }
    seen[arr[r]] = (seen[arr[r]] || 0) + 1;
    if (r - l + 1 === k) {
      distinct.push(currDistinct);
      seen[arr[l]]--;
      if (seen[arr[l]] === 0) currDistinct--;
      l++;
    }
    console.log('af', seen, [l, r], 'distinct', distinct, 'currDistinct', currDistinct);
    r++;
  }
  return distinct;
}
// console.log(countDistinct([1, 2, 1, 3, 4, 2, 3], 7, 4));




function maxLen(arr, n) {
  if (n === 1) return 0;
  const prefixSumMap = new Map();
  let prefixSum = 0;
  let maxLength = 0;
  // Iterate through the array
  for (let i = 0; i < n; i++) {
    // Treat 0 as -1 to balance the count
    prefixSum += arr[i] === 1 ? 1 : -1;
    // If prefixSum is 0, we found a balanced subarray from the start to i
    if (prefixSum === 0) {
      maxLength = i + 1;
    }
    // If prefixSum has been seen before, calculate the length of the subarray
    if (prefixSumMap.has(prefixSum)) {
      maxLength = Math.max(maxLength, i - prefixSumMap.get(prefixSum));
    } else {
      // Otherwise, store the first occurrence of this prefixSum
      prefixSumMap.set(prefixSum, i);
    }
  }
  return maxLength;
  // const hash = { '0': 0, '1': 0 };
  // for (let i = 0; i < n; i++) {
  // 	hash[arr[i]]++;
  // }
  // if (hash['0'] === hash['1']) return n;
  // if (hash['0'] === 0 || hash['1'] === 0) return 0;

  // console.log(hash);

  // let l = 0, r = n - 1;
  // while (hash['0'] !== hash['1']) {
  // 	while (hash['0'] > hash['1'] && arr[r] === 0) {
  // 		hash['0']--;
  // 		r--;
  // 	}
  // 	while (hash['0'] > hash['1'] && arr[l] === 0) {
  // 		hash['0']--;
  // 		l++;
  // 	}

  // 	while (hash['0'] < hash['1'] && arr[r] === 1) {
  // 		hash['1']--;
  // 		r--;
  // 	}
  // 	while (hash['0'] < hash['1'] && arr[l] === 1) {
  // 		hash['1']--;
  // 		l++;
  // 	}
  // }
  // return r - l + 1;
}
// console.log(maxLen([0, 0, 1, 0, 0], 5));




// Circular tour
function circularTour(p, n) {
  // let start = 0;
  // let end = 1;
  // let curr_petrol = p[start].petrol - p[start].distance;
  // while (end !== start || curr_petrol < 0) {
  //     while (curr_petrol < 0 && start !== end) {
  //         curr_petrol -= p[start].petrol - p[start].distance;
  //         start = (start + 1) % n;
  //         if (start === 0) return -1;
  //     }
  //     curr_petrol += p[end].petrol - p[end].distance;
  //     end = (end + 1) % n;
  // }
  // return start;

  const DISTANCE_PER_PETROL = 1;
  let start = 0;
  let required = 0;
  let remaining = 0;
  for (let i = 0; i < n; i++) {
    remaining += (DISTANCE_PER_PETROL * p[i].petrol) - p[i].distance;
    if (remaining < 0) {
      start = i + 1;
      required += remaining;
      remaining = 0;
    }
  }
  if (required + remaining >= 0) return start;
  return -1;
}



// Maximum tip
function maxTip(n, x, y, arr, brr) {
  const diff = arr.map((el, i) => [Math.abs(el - brr[i]), i]);
  diff.sort((a, b) => {
    return b[0] === a[0] ? b[1] - a[1] : b[0] - a[0];
  });
  let aServed = 0, bServed = 0;
  // console.log(diff);

  return diff.reduce((totalTip, curr, i) => {
    let tip = 0;
    if (bServed === y || (arr[curr[1]] >= brr[curr[1]] && aServed < x)) {
      tip = arr[curr[1]];
      aServed++;
    }
    else if (aServed === x || bServed < y) {
      tip = brr[curr[1]];
      bServed++;
    }
    // console.log(i, tip, curr[1], aServed, bServed);
    return totalTip += tip;
  }, 0);
}
// let tip = maxTip(7, 3, 4, [8, 7, 15, 19, 16, 16, 18], [1, 7, 15, 11, 12, 31, 9]);
let tip = maxTip(10, 8, 2, [1, 7, 6, 6, 6, 1, 3, 4, 8, 10], [10, 7, 7, 9, 1, 3, 2, 9, 3, 4]);
// console.log(tip);


// Count triplets with sum less than k
function countTriplets(arr, n, sum) {
  arr.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < n - 2; i++) {
    let j = i + 1, k = n - 1;
    while (j < k) {
      if (arr[i] + arr[j] + arr[k] < sum) {
        count += k - j;
        j++;
      }
      else k--;
    }
  }
  return count;
}


// Closest Three Sum
function threeSumClosest(arr, target) {
  arr.sort((a, b) => a - b);
  let res = -Infinity;
  let minDiff = Infinity;
  for (let i = 0; i < arr.length - 2; i++) {
    let l = i + 1;
    let r = arr.length - 1;
    while (l < r) {
      const sum = arr[i] + arr[l] + arr[r];
      const diff = Math.abs(sum - target);
      if (diff < minDiff) {
        minDiff = diff;
        res = sum;
      }
      else if (diff === minDiff) res = Math.max(res, sum);

      if (sum > target) r--;
      else if (sum < target) l++;
      else {
        return res;
      }
    }
  }
  return res;
}
// console.log(threeSumClosest([-7, 9, 8, 3, 1, 1], 2));


// Remove Reverse 
function removeReverse(S) {
  let s = S.split("");
  let freq = {};
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    freq[ch] = (freq[ch] || 0) + 1;
  }
  let l = 0, r = s.length - 1, f = 0;
  while (l <= r) {
    if (f === 0) {
      let ch = s[l];
      if (freq[ch] === 1) {
        l++;
      } else {
        freq[ch]--;
        s[l] = "#";
        l++;
        f ^= 1;
      }
    } else {
      let ch = s[r];
      if (freq[ch] === 1) {
        r--;
      } else {
        freq[ch]--;
        s[r] = "#";
        r--;
        f ^= 1;
      }
    }
  }
  if (f === 1) s.reverse();
  let ans = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '#') {
      ans += s[i];
    }
  }
  return ans;
}


// Container With Most Water
function maxArea(arr, n) {
  let l = 0, r = n - 1;
  let max = 0;
  while (l < r) {
    let curr = (r - l) * (Math.min(arr[l], arr[r]));
    max = Math.max(max, curr);
    if (arr[r] < arr[l]) r--;
    else l++;
  }
  return max;
}

// Total water trapped in above problem
function totalWaterTrapped(arr, n) {
  let total = 0;
  let l = 0, r = n - 1;
  let step = 0;
  while (l < r) {
    let curr = (r - l) * (Math.min(arr[l], arr[r]) - step);
    total += curr;
    step = Math.min(arr[l], arr[r]);
    if (arr[r] < arr[l]) while (arr[r] < arr[l]) r--;
    else while (arr[l] < arr[r]) l++;
  }
  return total;
}


// Trapping rain water between unit width blocks
function trappingWater(arr, n) {
  let total = 0;
  let maxLeft = [], maxRight = [];
  let currMax = 0;
  for (let i = 0; i < n; i++) {
    currMax = Math.max(currMax, arr[i]);
    maxLeft[i] = currMax;
  }
  currMax = 0;
  for (let i = n - 1; i >= 0; i--) {
    currMax = Math.max(currMax, arr[i]);
    maxRight[i] = currMax;
  }
  for (let i = 0; i < n; i++) {
    total += Math.min(maxLeft[i], maxRight[i]) - arr[i];
  }
  return total;
}



// Fruit Into Baskets
function sumSubarrayMins(n, fruits) {
  const seen = new Map();
  const ALLOWED_TYPES = 2;
  let max = 0;
  let l = 0, r = 0;

  while (r < n) {
    seen.set(fruits[r], (seen.get(fruits[r]) || 0) + 1);
    if (seen.size > ALLOWED_TYPES) {
      seen.set(fruits[l], seen.get(fruits[l]) - 1);
      if (seen.get(fruits[l]) === 0) seen.delete(fruits[l]);
      l++;
    }
    if (seen.size <= ALLOWED_TYPES) max = Math.max(max, r - l + 1);
    r++;
  }

  return max;
}
// console.log(sumSubarrayMins(82, '2 0 0 1 2 1 2 2 2 1 0 1 0 2 2 2 2 0 1 1 0 1 1 1 0 2 1 1 0 2 1 2 2 2 0 0 0 2 0 2 2 0 1 0 1 2 2 2 1 2 0 2 2 1 2 1 2 0 0 2 0 2 1 2 2 1 0 2 1 2 2 1 2 2 0 2 2 1 2 1 2 0'.split(' ')));
// console.log(sumSubarrayMins(6, [0, 1, 2, 2, 2, 2]));



// Find Indexes of a subarray with given sum
function subarraySum(arr, n, s) {
  let start = 0;
  let windowSum = 0;
  for (let end = 0; end < n; end++) {
    // Add the current element to the window's sum
    windowSum += arr[end];
    // While the window's sum is greater than the target sum, remove elements from the start
    while (windowSum > s && start <= end) {
      windowSum -= arr[start];
      start++;
    }
    // If the window's sum equals the target sum, return the 1-based indices
    if (windowSum === s && start <= end) return [start + 1, end + 1];
  }
  return [-1];
}
// console.log(subarraySum([1, 2, 3, 4], 4, 0));




// Count subarrays with all distinct numbers from original array
function countDistinctSubarray(n, arr) {
  // let count = 0;
  // const hash = {};
  // for (let i = 0; i < n; i++) {
  //   hash[arr[i]] = (hash[arr[i]] || 0) + 1;
  // }
  // const distinct = Object.keys(hash).length;
  // console.log('distinct', distinct);
  // let l = 0, r = 0;
  // let seen = new Map();
  // while (r < n) {
  //   if (!seen.has(arr[r])) seen.set(arr[r], 1);
  //   else seen.set(arr[r], seen.get(arr[r]) + 1);

  //   if (seen.size === distinct) count++;

  //   while (r === n - 1 && l < r) {
  //     seen.set(arr[l], seen.get(arr[l]) - 1);
  //     if (seen.get(arr[l]) === 0) seen.delete(arr[l]);
  //     if (seen.size === distinct) count++;

  //     console.log('after loop:', [l, r], seen, count);
  //     l++
  //   }

  //   console.log('after loop:', [l, r], seen, count);
  //   r++;
  // }
  // return count;

  const totalDistinctCount = new Set(arr).size;
  let subarrayCount = 0;

  let left = 0;
  let right = 0;
  let currentWindow = new Map();

  while (right < n) {
    // Add the current element to the current window
    currentWindow.set(arr[right], (currentWindow.get(arr[right]) || 0) + 1);

    // Check if the current window has the same number of distinct elements
    while (currentWindow.size === totalDistinctCount) {
      subarrayCount += n - right;  // All subarrays starting from 'left' to 'right' and ending from 'right' to 'n-1'

      // Remove the leftmost element from the current window
      currentWindow.set(arr[left], currentWindow.get(arr[left]) - 1);
      if (currentWindow.get(arr[left]) === 0) {
        currentWindow.delete(arr[left]);
      }
      left++;
    }

    right++;
  }

  return subarrayCount;
}
// console.log(countDistinctSubarray(5, [2, 1, 3, 2, 3]));


// Binary subarray with sum
function numberOfSubarrays(n, arr, k) {
  // let l = 0, r = 0;
  // let count = 0;
  // let currSum = 0;
  // while (r < n) {
  //   currSum += arr[r];
  //   while (currSum > k && l <= r) {
  //     currSum -= arr[l];
  //     l++;
  //   }
  //   if (currSum === k) {
  //     count++;
  //     // Check for other possible subarrays
  //     let tempSum = currSum;
  //     let tempL = l;

  //     while (tempL < r && tempSum === k) {
  //       tempSum -= arr[tempL];
  //       tempL++;
  //       if (tempSum === k) count++;
  //     }
  //   }
  //   r++;
  // }
  // return count;

  let prefixSum = 0;
  let count = 0;
  let prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Initialize with 0 sum having one count

  for (let r = 0; r < n; r++) {
    prefixSum += arr[r];

    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }

    if (prefixSumCount.has(prefixSum)) {
      prefixSumCount.set(prefixSum, prefixSumCount.get(prefixSum) + 1);
    } else {
      prefixSumCount.set(prefixSum, 1);
    }
  }

  return count;
}
// console.log(numberOfSubarrays(5, [1, 0, 1, 0, 1], 2));




//  Number of substrings with all characters as original string containing only abc's
function allCharacters(str) {
  const totalCount = new Set(str.split('')).size; // generalized solution not specific to three chars abc
  let count = 0;
  let seen = {};
  let l = 0;

  for (let r = 0; r < str.length; r++) {
    seen[str[r]] = r;
    // if (Object.keys(seen).length === totalCount) count += Math.min(...Object.values(seen)) + 1; // O(N^2)
    while (Object.keys(seen).length === totalCount) {
      count += str.length - r;
      if (seen[str[l]] === l) {
        delete seen[str[l]];
      }
      l++;
    }

  }
  return count;
}
// console.log(allCharacters('bbacba'));



// Number of subarrays with maximum values in given range
function count(a, n, maxVal) {
  let count = 0;
  let l = 0;

  for (let r = 0; r < n; r++) {
    if (a[r] > maxVal) {
      l = r + 1;
    }
    count += (r - l + 1);
  }

  return count;
}

function countSubarrays(a, n, L, R) {
  return count(a, n, R) - count(a, n, L - 1);
}
// console.log(countSubarrays([2, 0, 11, 3, 0], 5, 1, 10));



// Smallest distinct window
function findSubString(str) {
  const totalCount = new Set(str.split('')).size;
  let min = str.length;
  let seen = new Map();

  let l = 0;

  for (let r = 0; r < str.length; r++) {
    seen.set(str[r], r);
    while (seen.size === totalCount) {
      min = Math.min(min, r - l + 1);
      if (seen.get(str[l]) === l) seen.delete(str[l]);
      l++;
    }
  }

  return min;
}
// console.log(findSubString('geeksGEEKSFOR'));


//  Substrings of length k with k-1 distinct elements
function countOfSubstrings(s, k) {
  let count = 0;
  let l = 0, r = 0;
  const seen = new Map();
  while (r < s.length) {
    seen.set(s[r], r);

    if (r - l >= k - 1) {
      if (seen.size === k - 1) count++;
      if (seen.get(s[l]) === l) seen.delete(s[l]);
      l++;
    }
    r++;
  }
  return count;
}



// Search occurances of anagrams
function searchAnagrams(pat, txt) {
  const n = txt.length;
  const patmap = {};
  for (let i = 0; i < pat.length; i++) {
    patmap[pat[i]] = (patmap[pat[i]] || 0) + 1;
  }
  console.log(patmap);

  function checkSeen(seen, pat) {
    for (let char in pat) {
      if (!seen.get(char) || pat[char] > seen.get(char)) return false;
    }
    seen.forEach(char => {
      if (!pat[char]) return false;
    });
    return true;
  }

  let count = 0;
  let l = 0, r = 0;
  let seen = new Map();

  while (r < n) {
    seen.set(txt[r], (seen.get(txt[r]) || 0) + 1);

    if (r - l >= pat.length - 1) {
      if (checkSeen(seen, patmap)) {
        count++;
        console.log([l, r], seen, count);
      }
      seen.set(txt[l], seen.get(txt[l]) - 1);
      if (seen.get(txt[l]) === 0) seen.delete(txt[l]);
      l++;
    }
    r++;
  }

  return count;
}
// console.log(searchAnagrams('for', 'forxxorfxdofr'));


// Longest subarray with sum divisible by K
function longSubarrWthSumDivByK(arr, n, k) {
  let prefixSum = 0;
  let max = 0;
  const remainderMap = new Map();

  for (let i = 0; i < n; i++) {
    prefixSum += arr[i];
    let remainder = ((prefixSum % k) + k) % k;
    if (remainder == 0) max = i + 1;
    else {
      if (remainderMap.has(remainder)) {
        max = Math.max(max, i - remainderMap.get(remainder));
      } else {
        remainderMap.set(remainder, i);
      }
    }
  }
  return max;
}


// Longest Repeating Character Replacement
function characterReplacement(S, K) {
  let max = 0;
  const seen = new Map();
  let l = 0, maxCount = 0;

  for (let r = 0; r < S.length; r++) {
    seen.set(S[r], (seen.get(S[r]) || 0) + 1);
    maxCount = Math.max(maxCount, seen.get(S[r]));
    if (r - l + 1 - maxCount > K) {
      seen.set(S[l], seen.get(S[l]) - 1);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }

  // let minFreq = Infinity;
  // let l = 0, r = 0;
  // while (r < S.length) {
  //   // console.log('\nbe', [l, r], seen, minFreq, max);
  //   seen.set(S[r], (seen.get(S[r]) || 0) + 1);
  //   minFreq = Math.min(...seen.values());
  //   if (seen.size <= 2 && minFreq <= K) {
  //     max = Math.max(max, r - l + 1);
  //   }
  //   while ((seen.size > 2) || (minFreq > K)) {
  //     seen.set(S[l], seen.get(S[l]) - 1);
  //     if (seen.get(S[l]) === 0) seen.delete(S[l]);
  //     minFreq = Math.min(...seen.values());
  //     l++
  //   }
  //   // console.log('af', [l, r], seen, minFreq, max);
  //   r++;
  // }

  return max;
}
// console.log(characterReplacement('HQGHUMEAYLNLFDXFIRCVSCXGGBWKFNQDUXWFNFOZV', 2));



// First negative integer in every window of size k
function printFirstNegativeInteger(n, k, arr) {
  let res = [];
  let firstNegativeIndex = 0;
  let firstNegativeElement;
  for (let i = k - 1; i < n; i++) {
    while ((firstNegativeIndex < i) && (firstNegativeIndex <= i - k || arr[firstNegativeIndex] >= 0)) {
      firstNegativeIndex++;
    }
    firstNegativeElement = arr[firstNegativeIndex] < 0 ? arr[firstNegativeIndex] : 0;
    res.push(firstNegativeElement);
  }
  return res;
}