// 삼항연산자
let test;
console.log(typeof(test)); // undefined

test = typeof(test) != 'undefined'? test: 'initial';  // typeof(test) != 'undefined' 이조건이면 test=test 이고 아니면 test='initial'
console.log(test); //initial