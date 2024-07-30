// "use strict"
const myGraphLib = 'https://www.npmjs.com/package/react-d3-graph-modified'


// Frontend Resources
const google = 'https://web.dev/'
const learningKit = 'https://github.com/sadanandpai/frontend-learning-kit';
const frontendResource = 'https://www.greatfrontend.com/';
const bigfrontend = 'https://bigfrontend.dev/';
const chakdeFEInterviewQuestions = 'https://www.youtube.com/watch?v=c_kVh_-gQtI';
const UIBasedProblems = ['https://workat.tech/frontend-development/practice', 'https://www.w3schools.com/howto/default.asp'];

const roadmap = 'https://roadmap.sh/frontend';
const bestPractises = 'https://roadmap.sh/best-practices/frontend-performance';


// DSA
const loveBabbarDSA = 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA';
const babbar450 = 'https://450dsa.com/';
const babbar450gfg = 'https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/';
const dsaCheatSheet = 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/';
const DSA75 = 'https://www.techinterviewhandbook.org/grind75';
const neetcode = 'https://neetcode.io/practice';
const striversTuf = 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems';
const binarySearchQs = 'https://docs.google.com/document/d/1V6-bCyst7xYYiMl6mjrg802VjikoKbssvwLTuFw9G_Y/edit?usp=sharing';


const jsDsaResources = 'https://github.com/manassahoo-dev/DSA';
const gfgDSA = 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/';


// Technical Round
const interviewQuestions = 'https://www.frontendinterviewhandbook.com/javascript-questions/';
const javascriptInterviewQuestions = 'https://github.com/sudheerj/javascript-interview-questions';
const reactQuestions = 'https://bigfrontend.dev/react';
const jsQuestions = 'https://bigfrontend.dev/problem';


// System Design
const greatFrontendSystemDesign = 'https://www.greatfrontend.com/system-design';
const chakdeSystemDesign = 'https://www.youtube.com/playlist?list=PL4CFloQ4GGWICE0Tz6iXKfN3XWkXRlboU';
const frontendMasterySysDes = 'https://frontendmastery.com/posts/frontend-system-design-interview-guide/';
const BFEDesign = 'https://bigfrontend.dev/design';
const namasteFeSysDes = 'https://namastedev.com/learn/namaste-frontend-system-design';


// Behavioural/Cultural-Fit Round
const behavioralInterview = 'https://www.greatfrontend.com/behavioral-interview-guidebook';


// Coding Books
// 1) System Design by Alex Wu
// 2) Eloquent Javascript by Marijn Haverbeke.
// 3) The Pragmatic Programmer by David Thomas and Andrew Hunt
// 4) Clean Code by Robert C. Martin 
// 5) Designing Data-Intensive Applications by Martin Kleppmann


//// Closures example
// function outermost() {
//   let c = 20;
//   function outer(b) {
//     function inner() {
//       console.log(a, b, c, d);
//     }
//     let a = 10;
//     return inner;
//   }
//   return outer;
// }
// let d = 40;
// outermost()('hi')(); 


//// This
// const obj = {
//   a: 10,
//   x: function () {
//     const y = function () {
//       console.log(this);
//     };
//     y();
//   },
// };
// obj.x();

// Arrays, sets and maps are iterable, objects are not

// Time ccomplexity of common array methods

// Insert / remove from end = O(1)
// Insert / remove from start = O(n)
// Access an element - O(1)
// Search an element - O(n)
// push / pop - O(1)
// shift / unshift / concat / slice / splice - O(n)
// forEach / map / filter / reduce - O(n)


// Time ccomplexity of common object methods

// Insert / remove = O(1)
// Access an element - O(1)
// Search an element - O(n)
// keys / values / entries - O(n)

const sortedArrayWithDuplicates = [1, 3, 5, 5, 5, 5, 67, 123, 355];
const myset = new Set(sortedArrayWithDuplicates);
const myMap = new Map([['a', 1], ['b', 5]]);
// console.log(myset);

