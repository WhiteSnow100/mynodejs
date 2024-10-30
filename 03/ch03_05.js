// 디렉토리 생성
const fs = require('fs');

const dirname = "naver/daum/google"
fs.mkdirSync(dirname, {recursive: true});  // false일경우 디렉토리가 있을 경우 오류발생

const content = `
안녕하세요 
네이버
구글
카카오
다음 중 하나에 입사하고 싶어요.`;

// naver/daum/google/out.txt <- content 내용을 넣어주세요.
fs.writeFileSync(`${dirname}/out1.txt`, content, `utf-8`);