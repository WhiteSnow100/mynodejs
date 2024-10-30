// filter : callback함수
// filter 조건에 맞는 요소만 return

let arr = [1,2,3,4,5,6,7,8,9,10];
const arr2 = arr.filter((x)=>{
    return x % 2 == 0;  // true 조건만 return
});
console.log(arr2);

const arr22 = arr.filter(x=>x%2==0);
console.log(arr22);

