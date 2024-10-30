const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;  // 포트지정

app.set("view engine", "ejs");
app.set("views", "./views");  // views폴더를 가리킴

app.get("/", (req, res)=> {  //http://localhost:3000/
    res.render("index", {
        title: "안녕하세요",
        message: "여러분 반갑습니다"
    });
});

const posts = [
    {title:"테스트 타이틀1", content:"테스트 컨덴트1"},
    {title:"테스트 타이틀2", content:"테스트 컨덴트2"},
    {title:"테스트 타이틀3", content:"테스트 컨덴트3"}
];

app.get("/sample", (req, res) => {
    res.render("sample", {data:posts});
});

app.listen(PORT); // PORT 열기