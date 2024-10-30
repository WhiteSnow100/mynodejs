// settimeout : 몇초후 timout
console.log(`begin`);
setTimeout(()=>{
    console.log(`1초 뒤에 호출`);
}, 1000); // 1000ms => 1second
console.log('end'); 
// begin, end, 1초 뒤에 호출 순으로 출력

setInterval(() => {
    console.log(`1초 마다 실행`);
}, 1000)  // 1초마다 실행