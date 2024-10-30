const http = require("http");
const url = require('url');
// const test2 = require('./test2.json');
const fs = require(`fs`);

http.createServer((req, res) => { // req:HttpRequest, res:HttpResponse
    const path = url.parse(req.url, true).pathname;
    // true : query string parsing 할지 말지 여부, 
    // http://localhost:3000/json?name=Lee&age=30

    if(path=='/json') { // http://localhost:4500/json
        res.setHeader('Content-Type', 'application/json');
 //       res.setHeader('Content-Type', 'application/json;charset=UTF-8');
 //       res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        const data = {
            name: "lee", age: 48, address : "서울시 동작구 신대방동"
        }
        const result = JSON.stringify(data); // json string
        res.end(result);
    } else if(path == "/test") {
        // http://localhost:4500/test
        // test2.json의 내용을 JSON 포맷으로 클라이언트에 응답
        res.setHeader('Content-Type', 'application/json');
        const data = fs.readFileSync(`test2.json`,'utf-8');
        const result = JSON.parse(data);
        const posts = result['data'];

        res.end(JSON.stringify({
            data: posts
        }));
 //       const data = test2.data;
 //       const result = JSON.stringify(data);
 //       res.end(result);
    }
}).listen(4500);