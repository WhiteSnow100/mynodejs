채팅 프로그램
12>npx create-react-app ch12_01  // ch12_01 폴더 생성
12>ch12_01> npm i socket.io-client
12>ch12_01> server 폴더 생성
12>ch12_01>server>npm init -y  // init는 package.json 생성
12>ch12_01>server>npm i express socket.io   
12>ch12_01>server>index.js 생성

cors 옵션 : 크로스브라우저 체크하는 부분을 열어준다.
--> http는 3000번이고 socket은 3030을 체크해서 주고받는 포트가 달라 오류발생하는 문제 해결

emit : 메세지 방출

https://simplecss.org/


public>index.html - head에 simplecss.org 경로 추가
ch12_01>package.json : scripts > 
start를 client로 변경하고
"server": "node server/index.js", 추가

터미널 2개 띄움
npm run server
npm run client

app.js -> client
server>index.js -> server

12>npx create-react-app ch12_02
12>ch12_02>npm i socket.io-client concurrently  
// concurrently : 서버, 클라이언트 동시 실행위해 사용
12>ch12_02>package.json 수정
server 폴더 생성
12>ch12_02>server>npm init -y
12>ch12_02>server>npm i express socket.io
12>ch12_02>server>index.js 파일 만들기



