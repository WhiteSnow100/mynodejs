const express = require(`express`); // express import
const fs = require(`fs`);
const app = express();  // app에 express함수 할당
const PORT = 3000;  //3000번 할당

app.get("/", (req, res)=>{  // app.get => GET요청처리 : router이름, callback함수
    res.send(`<h1>Hello World</h1>`);
}); 

app.get('/write', (req, res) => {
    const posts = [];
    for(let i=0;i<10;i++){
        posts.push({
            id: i,
            title: `테스트 타이틀(${i})`,
            content: `내용입니다.(${i})`
        });
    }
    fs.writeFileSync("test.json", JSON.stringify({data: posts}));
    res.send("<h1>test.json 파일 생성 성공</h1>");
});

app.get(`/list`,(req, res) => {
    // test.json에서 파일을 읽어서
    // json 형태로 브라우저에 출력
    // 1. test.json 에서 파일을 읽어서
    const data = fs.readFileSync(`test.json`,'utf-8');

    // 2. 객체로 파싱을 하고 
    const result = JSON.parse(data);

    // data객체를 posts에 담기
    const posts = result["data"];

    // (author 정보를 추가)
    posts.forEach(x => { // posts 배열을 돌면서 author 객체 추가
        x["author"] = {
            name: `박길동`,
            email: "h2@naver.com"
        }
    });

    // 3. 다시 객체를 JSON 문자열로 변환한다.
    // res.send(JSON.stringify(posts));   
    res.status(200).json({data: posts})  // res.json을 쓰면 자동으로 객체를 JSON문자열로 변환
});

//http://localhost:3000/view/1
//http://localhost:3000/view/2
//http://localhost:3000/view/3 -> 1, 2, 3 동적으로
app.get("/view/:postId", (req, res) => {
    const postId = req.params.postId;
    const data = fs.readFileSync("test.json","utf-8");
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"]; // array filter
    const selectedPost = posts.filter(item=> {
        return item.id == postId
    });
    console.log(selectedPost);
    res.json({data: selectedPost});
});

app.listen(PORT, ()=>{  // 해당포트번호로 서버소켓이 열린다. 1024이상 40000까지는 application, 아파치,톰캣:8080, 파이썬(장고):5000
    console.log(`서버오픈 - ${PORT}`);
}); 
// get, post, put, delete

// 0번 ~ 1023번: 잘 알려진 포트 (well-known port) 관리작 허가 필요
// 80:http, 443:https, 21:ftp, 22:ssh, 25:smtp, 3306:mysql, 5432:postgresql
// 1025 40000까지는 application, 아파치,톰캣:8080, 파이썬(장고):5000
// 1024번 ~ 49151번: 등록된 포트 (registered port)
// 49152번 ~ 65535번: 동적 포트 (dynamic port)
// 49xxx:client 포트

