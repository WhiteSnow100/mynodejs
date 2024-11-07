const express = require(`express`);  //was역할을 하는 미들웨어
const http = require(`http`);    //웹서버역할
const socketIo = require(`socket.io`);

const app = express();  // not http server middleware
const server = http.createServer(app); // 웹서버
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        method: ["GET","POST"]
    }
});

// socket.io 받은 데이터를 처리하는 로직  on은 listen과 동일, socket은 사용자마다 할당
io.on('connection', (socket) => {  // 2) app.js const socket = io(......) 부분으로 요청받아서 socket할당
    console.log(`a user connected`, socket);

    socket.on(`disconnect`, () => {
        console.log(`user disconnect`);
    });

    socket.on(`chat:message`, (msg) => {  // 4)
        console.log(`chat:message => ${msg}`);
        io.emit(`chat:message`, msg);   // 5)
    });
});

server.listen(3030, () => {
    console.log(`socket.io server is running on 3030`);
});

