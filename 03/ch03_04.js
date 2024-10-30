// 파일생성
const fs = require('fs');

const content = `안녕하세요
백설미자입니다
오늘은 10월 24일이고 
날씨가 화창합니다.`;

// 1.파일명, 2.내용, 3:에러콜백함수
// fs.writeFile('out.txt', content, `utf-8`, (err) => {
//    console.error(err);
// });

// sync형식의 linebyline
fs.writeFileSync(`out2.txt`, content, `utf-8`);