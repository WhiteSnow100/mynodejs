let personINfo = {  // 객체생성시 {} 
    name: 'lee',
    age: 55,
    address: '서울 금천구 독산동 123',
    hobby: ['독서','등산','낚시','넷플릭스']
}
console.log(personINfo);
// JSON(JavaScript Object Notation)
console.log(JSON.stringify(personINfo));

console.log(personINfo['name']); //lee
console.log(personINfo.name); // lee

console.log(personINfo['age']); // 55

// console.log(personINfo[age]); // error

const age = 'age';
console.log(personINfo[age]); // 55

console.log('------------------------'); //  
personINfo['gender'] = 'M' // M MAN 기존에 없는 키 추가 : insert
console.log(personINfo);

personINfo['address'] = '서울 양천구 신정동';  //기존키에 값을 넣으면 수정의 의미 : update
console.log(personINfo);

