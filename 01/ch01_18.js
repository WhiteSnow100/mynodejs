// map : callback 함수
// map : 기존 배열의 요소로 새로운 요소생성
// => : 화살표 함수
let arr = [1,2,3,4,5,6,7,8,9,10];
const arr2 = arr.map((x)=>x*2);
console.log(arr2);

const arr22 = arr.map(function(x) {
    return x*2;
});
console.log(arr22);