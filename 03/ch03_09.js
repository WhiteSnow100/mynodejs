// JSON : JavaScript Object Notation 자바스크립트 객체 표현식
// 객체 {} "key": value 형식 ""으로 
const fs = require(`fs`);

const result = fs.readFileSync("test.json", 'utf-8');
// console.log(result);  
// console.log(typeof(result)); // string

const data = JSON.parse(result); //여기서의 핵심 내용입니다.
// console.log(data["data"]);
// console.log(typeof(data)); // object

const posts = data["data"]; // array
posts.forEach(x => {
    console.log(x["title"], x["content"], x.author);  // x["author"] = x.author
});