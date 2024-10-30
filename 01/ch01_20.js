// for each

let arr = [1,2,3,4,5,6,7,8,9,10];
arr.push(11);  // 값 추가
arr.push(12);
arr.push(13);
arr.push(13);
arr.pop();  // 마지막 제거

arr.forEach((x,i) => { // x:element, i:index
    console.log(`${x} ${i}`);
});

arr.forEach((x) => {
    console.log(`${x}`);
});
