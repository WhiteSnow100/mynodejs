const fs = require(`fs`);  // require 대신 import를 사용할 경우는 사용가능한 버젼인지 체크해야 한다.
const path = require(`path`);

// __dirname : 현재디렉토리
const newFilePath = path.join(__dirname, `a3`,`b3`,`c3`,`d3.txt`);
console.log(newFilePath);
console.log(typeof(newFilePath));
console.log(path.parse.newFilePath);
console.log(path.parse(newFilePath).dir);
console.log(path.parse(newFilePath).base);

const makeFile = (fpath, content) => {
    const filename = path.parse(fpath).base;  // end가 file 이라고 가정
    if(filename.includes(".")) {  // 파일인지 확인하기 위해 .으로 확장자 여부 체크
        const dirname = path.parse(fpath).dir;
        fs.mkdirSync(dirname, {recursive: true});
        fs.writeFileSync(fpath, content);
    }
}

makeFile(newFilePath,`새로운 파일이 생성되었습니다.`);
