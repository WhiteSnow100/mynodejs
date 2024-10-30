// for 문 순회
// for of 는 element
let arr = [5, 23, "hello", true, 'world', -9];

for(element of arr) {
    console.log(`${element}`);
    console.log(typeof(element)); // number, number, string, boolean, string, number
}