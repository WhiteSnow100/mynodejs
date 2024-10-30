console.log(String(52)); // 52
console.log(typeof(String(52))); // string
console.log(typeof(52+"")); // string
console.log(typeof(`${52}`)); // string ``안은 항상 문자

console.log(typeof(Number("45"))); // number
console.log(typeof(parseInt("45"))); // number
console.log(typeof(parseFloat("45.23"))); // number

console.log(Number("Hello"));  // Nan : Not a Number

console.log(isNaN(Number("Hello")));  // true
