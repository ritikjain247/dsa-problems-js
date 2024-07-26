


// Top 50 string problems

// Longest common prefix in an array
function longestCommonPrefix(arr, n) {
  if (n === 0) return '-1';
  if (n === 1) return arr[0];
  let res = arr[0];
  for (let i = 1; i < n; i++) {
    let temp = '';
    let len = Math.min(res.length, arr[i].length);
    for (let j = 0; j < len; j++) {
      if (res[j] === arr[i][j]) temp += res[j];
      else break;
    }
    res = temp;
    if (res === '') break;
  }
  return res.length ? res : '-1';
}
// console.log(longestCommonPrefix(['geeksforgeeks', 'geeks', 'geek', 'geezer'], 4));


// Closest strings
function shortestDistance(s, word1, word2) {
  let i1 = -1, i2 = -1; // initialize index of word1, word2
  let minDistance = Number.MAX_VALUE; // initialize minimum distance to a high value
  for (let i = 0; i < s.length; i++) {
    if (s[i] === word1) i1 = i; // if current word is equal to word1, update index of word1 to the current index
    if (s[i] === word2) i2 = i; // if current word is equal to word2, update index of word2 to the current index
    if (i1 !== -1 && i2 !== -1) minDistance = Math.min(minDistance, Math.abs(i1 - i2)); // if both word1 and word2 have been found, calculate/update the minimum distance
  }
  return minDistance;
}
// function shortestDistance(s, word1, word2) {
//   const hashMap = {};
//   const indexMap = {};
//   const n = s.length;
//   for (let i = 0; i < n; i++) {
//     if (hashMap.hasOwnProperty(s[i])) {
//       hashMap[s[i]] += 1;
//       indexMap[s[i]].push(i);
//     } else {
//       hashMap[s[i]] = 1;
//       indexMap[s[i]] = [i];
//     }
//   }
//   return findMinDifference(indexMap[word1], indexMap[word2]);
// }
// function findMinDifference(arr1, arr2) {
//   if (arr1.length === 0 || arr2.length === 0) return null;
//   arr1.sort((a, b) => a - b);
//   arr2.sort((a, b) => a - b);
//   let i = 0, j = 0;
//   let minDiff = Infinity;
//   while (i < arr1.length && j < arr2.length) {
//     let diff = Math.abs(arr1[i] - arr2[j]);
//     minDiff = Math.min(minDiff, diff);
//     if (arr1[i] < arr2[j]) {
//       i++;
//     } else {
//       j++;
//     }
//   }
//   return minDiff;
// }

// console.log(shortestDistance(["the", "quick", "brown", "fox", "quick", "fox"], 'the', 'fox'));


// Equal point in a string of brackets
function findIndex(str) {
  const n = str.length;
  let open = new Array(n + 1).fill(0), closed = new Array(n + 1).fill(0);
  if (str[0] == '(') open[1] = 1;
  if (str[n - 1] == ')') closed[n - 1] = 1;

  for (let i = 1; i < n; i++) {
    open[i + 1] = str[i] === '(' ? open[i] + 1 : open[i];
  }
  for (let i = n - 2; i >= 0; i--) {
    closed[i] = str[i] === ')' ? closed[i + 1] + 1 : closed[i + 1];
  }

  if (open[n] == 0) return n;
  if (closed[0] == 0) return 0;

  for (let i = 0; i < n; i++) {
    if (open[i] === closed[i]) return i;
  }
}
// console.log(findIndex('))))(()'));
// console.log(findIndex('(())))('));


// K-anagram
function areKAnagrams(str1, str2, k) {
  const n = str1.length, m = str2.length;
  const hash1 = {}, hash2 = {};
  if (n !== m) return false;
  for (let i = 0; i < n; i++) {
    hash1[str1[i]] = (hash1[str1[i]] || 0) + 1;
    hash2[str2[i]] = (hash2[str2[i]] || 0) + 1;
  }
  let uncommonChars = 0;
  for (const key in hash1) {
    if (hash2.hasOwnProperty(key)) {
      uncommonChars += Math.abs(hash1[key] - hash2[key]);
    } else {
      uncommonChars += hash1[key];
    }
  }
  for (const key in hash2) {
    if (hash2.hasOwnProperty(key) && !hash1.hasOwnProperty(key)) {
      uncommonChars += hash2[key];
    }
  }
  return uncommonChars / 2 <= k;
}
// console.log(areKAnagrams('wurkbxkgkfmlzofn', 'mczujslxzvhecrpy', 10));



// Check if string is rotated by two places
function isRotated(str1, str2) {
  return str2 === rotate(str1, 2, 'clockwise') || str2 === rotate(str1, 2, 'anti-clockwise');
}

function rotate(str, k, dir) {
  const n = str.length;
  return dir === 'clockwise' ? str.substring(n - k) + str.substring(0, n - k) : str.substring(k) + str.substring(0, k);
}


// Isomorphic Strings
function areIsomorphic(str1, str2) {
  // Create a map to store character mappings
  const charMap = new Map();
  // Create a set to track seen characters in str2
  const seen = new Set();
  // Iterate through both strings simultaneously
  for (let i = 0; i < str1.length; i++) {
    const char1 = str1[i];
    const char2 = str2[i];
    // Check if char1 is already mapped
    if (charMap.has(char1)) {
      // If mapped character doesn't match char2, return false
      if (charMap.get(char1) !== char2) {
        return false;
      }
    } else {
      // If char1 not mapped, check if char2 has already been seen
      if (seen.has(char2)) {
        return false;
      }
      // Add mapping and mark char2 as seen
      charMap.set(char1, char2);
      seen.add(char2);
    }
  }
  // If loop completes without issues, strings are isomorphic
  return true;
}
// console.log(areIsomorphic('rfkqyuqf', 'jkxyqvnr'));


// Divisible by 7
function isDivisibleBySeven(num) {
  if (num.length === 0) return true;
  let remainder = 0;
  for (let i = 0; i < num.length; i++) {
    let digit = parseInt(num.charAt(i));
    remainder = (remainder * 10 + digit) % 7;
  }
  return remainder == 0 ? true : false;
}
// console.log(isDivisibleBySeven('8955795758'));


// Longest K unique characters substring
function longestKSubstr(s, k) {
  if (k === 0 || k > s.length) return -1;
  let charCount = new Map();
  let maxLength = -1;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const charRight = s[right];
    charCount.set(charRight, (charCount.get(charRight) || 0) + 1);
    // Shrink the window until we have exactly k unique characters
    while (charCount.size > k) {
      const charLeft = s[left];
      charCount.set(charLeft, charCount.get(charLeft) - 1);
      if (charCount.get(charLeft) === 0) {
        charCount.delete(charLeft);
      }
      left++;
    }
    // Check if the current window has exactly k unique characters
    if (charCount.size === k) {
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }
  return maxLength;
}


// Check Panagram
function checkPangram(s) {
  const hash = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i].toLowerCase();
    if (alphabets.includes(char)) hash.set(char, (hash[char] || 0) + 1);
  }
  if (hash.size === 26) return true;
  else return false;
}


// License Key Formatting
function reFormatString(S, K) {
  const cleanString = S.replace(/-/g, '').toUpperCase();
  const n = cleanString.length;
  let res = '';
  const firstGroupLength = n % K || K; // Calculate the length of the first group
  res = cleanString.slice(0, firstGroupLength); // Add the first group to the result
  let index = firstGroupLength;
  // Add the remaining groups of size K
  while (index < n) {
    res += '-' + cleanString.slice(index, index + K);
    index += K;
  }
  return res;
}
// console.log(reFormatString("5F3Za-2e-9-w", 4));


// Encrypt the string - 2
function encryptString(S) {
  const n = S.length;
  let res = '';
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (S[i] === S[i - 1]) count++;
    else {
      res += S[i - 1] + count.toString(16).split('').reverse().join('');
      count = 1;
    }
  }
  res += S[n - 1] + count.toString(16).split('').reverse().join('');
  return res.split('').reverse().join('');
}
// console.log(encryptString('aaaaaaaaaaaaaaaaaa'));


// Print Anagrams Together
const list = ['act', 'god', 'cat', 'dog', 'tac'];

function groupAnagrams(n, string_list) {
  const map = new Map();
  // Iterate through the string list
  for (let i = 0; i < n; i++) {
    // Sort the characters of the current string
    const sortedStr = string_list[i].split('').sort().join('');
    // If the sorted string is already in the map, add the current string to its group
    if (map.has(sortedStr)) {
      map.get(sortedStr).push(string_list[i]);
    } else {
      // Otherwise, create a new group with the sorted string
      map.set(sortedStr, [string_list[i]]);
    }
  }
  // Convert the map values to an array of arrays (groups)
  const result = Array.from(map.values()).sort();
  return result;
}
// console.log(groupAnagrams(5, list));





// Validate an IP Address
function isValidIP(s) {
  return s.split('.').length === 4 && s.split('.').every(el => Number(el) >= 0 && Number(el) <= 255 && el.length > 0 && el.length < 4 && !leadingZeroes(el)) ? 1 : 0;
}
function leadingZeroes(str) {
  return (str[0] == '0' && str.length > 1);
}
// console.log(isValidIP('172.16.254.01'));





// Multiply two strings
function multiplyStrings(s1, s2) {
  // Helper function to remove leading zeros
  function removeLeadingZeros(str) {
    let i = 0;
    while (i < str.length && str[i] === '0') {
      i++;
    }
    return str.slice(i) || '0';
  }
  // Handle negative signs
  const negative = (num1[0] === '-' ? 1 : 0) + (num2[0] === '-' ? 1 : 0);
  if (num1[0] === '-') num1 = num1.slice(1);
  if (num2[0] === '-') num2 = num2.slice(1);
  // Remove leading zeros
  num1 = removeLeadingZeros(num1);
  num2 = removeLeadingZeros(num2);
  if (num1 === '0' || num2 === '0') return '0';
  const result = Array(num1.length + num2.length).fill(0);
  // Multiply each digit and add the results to the result array
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const sum = mul + result[i + j + 1];
      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }
  // Convert result array to string
  let resultStr = result.join('');
  resultStr = removeLeadingZeros(resultStr);
  // Add negative sign if needed
  if (negative === 1) resultStr = '-' + resultStr;
  return resultStr;
}



function getMaxOccuringChar(str) {
  const hash = {};
  let maxCount = 0, maxChar = '';
  for (let i = 0; i < str.length; i++) {
    hash[str[i]] = (hash[str[i]] || 0) + 1;
    if (hash[str[i]] > maxCount) {
      maxCount = hash[str[i]];
    }
  }
  for (let key in hash) {
    if (hash[key] === maxCount) {
      if (!maxChar) maxChar = key;
      else maxChar = key < maxChar ? key : maxChar;
    }
  }
  console.log(hash, maxCount);
  return maxChar;
}
// console.log(getMaxOccuringChar('orqxvbq'));


function countOddEven(arr, n) {
  let odd = 0, even = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] % 2 === 0) even++;
    else odd++;
  }
  return `${odd} ${even}`;
}
// console.log(countOddEven([1, 2, 3, 4, 5], 5));


function uncommonChars(A, B) {
  const hash = {}
  for (let char of A) {
    hash[char] = (hash[char] || 0) + 1;
  }
  for (let char of B) {
    if (hash.hasOwnProperty(char)) delete hash[char];
    else hash[char] = (hash[char] || 0) + 1;
  }
  console.log(hash, Object.keys(hash).sort());
  return Object.keys(hash).sort().join('');
}
// console.log(uncommonChars('peeksquiz', 'geeksforgeeks'));





function findSum(str) {
  let sum = 0;
  for (let char of str) {
    console.log(char, Number(char), sum);
    if (Number(char)) sum += Number(char);
  }
  return sum;
}
// console.log(findSum('1abc23'));




function toDecimal(str) {
  // return parseInt(str, 2);
  return str.split('').reverse().reduce((x, y, i) => (y === '1' ? x + Math.pow(2, i) : x), 0);
}

