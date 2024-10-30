const http=require('http'); // commonjs import 방식

// req => HttpRequest, res => HttpResponse
const server = http.createServer((req, res) => {
    res.statusCode = 200; //ok
    res.setHeader("Content-type","text/Plain"); // client에 제공해줄 컨텐트 데이터 타입은 text
    resizeTo.write("Hello World");
    res.end();
});

server.listen(4500);