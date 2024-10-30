// 객체 순회
let personInfo = {  // 객체생성시 {} 
    name: 'lee',
    age: 55,
    address: '서울 금천구 독산동 123',
    hobby: ['독서','등산','낚시','넷플릭스']
}

for(let key in personInfo) {
    console.log(`${key} => ${personInfo[key]}`);
}
console.log('-----------------');
console.log(` key list : ${Object.keys(personInfo)}`);

console.log(` key list type : ${typeof(Object.keys(personInfo))}`);  //object

// console.log(personInfo[`test`][`a`]);  // 없는 경우 personInfo is not defined
Object.keys(personInfo).forEach(key => {
    console.log(`${key} => ${personInfo[key]}`);
});

const keys = Object.keys(personInfo);
console.log(keys.includes('test'));

// consolek.log(personInfo['test'][`a`]);

if(keys.includes('test')) {
    console.log(personInfo['test']['a']);  // not error
}