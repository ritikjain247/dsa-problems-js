
// var mergeAlternately = function (word1, word2) {
//   let arr = [];
//   let arr1 = word1.split(''), arr2 = word2.split('');
//   for (let i = 0; i < word1.length + word2.length; i++) {
//     if ((i % 2 === 0 || !arr2.length) && arr1.length) arr.push(arr1.shift())
//     else if ((i % 2 !== 0 || !arr1.length) && arr2.length) arr.push(arr2.shift())
//   }
//   return arr.join('');
// };
// mergeAlternately('abc', 'pqrst')


// 
// var findTheDifference = function (s, t) {
//   let countInS = {}, countInT = {};
//   for (let i = 0; i < s.length; i++) {
//     countInS[s[i]] = countInS[s[i]] ? countInS[s[i]] + 1 : 1;
//     countInT[t[i]] = countInT[t[i]] ? countInT[t[i]] + 1 : 1;
//   }
//   countInT[t[t.length - 1]] = countInT[t[t.length - 1]] ? countInT[t[t.length - 1]] + 1 : 1;
//   for (let key in countInT) {
//     if (countInT[key] > (countInS[key] || 0)) return key;
//   }
// };
// console.log(findTheDifference('abcd', 'abcde'));



var isAnagram = function (s, t) {
  for (let char of s) {
    t = t.replace(char, '')
  }
  return !t.length;
};

// var isAnagram = function (s, t) {
//   if (s.length !== t.length) return false;
//   return s.split('').sort().join('') == t.split('').sort().join('');
// };
console.log(isAnagram('anagram', 'nagaram'));

