const { exec } = require(`child_process`);  // 객체를 읽을때 { exec: exec }를 사용 축약형으로 { exec } 만 써도 됨
const cp = require(`child_process`); // cp.exec 로 사용

const cmd = `dir`;  // mac : ls-la
exec(cmd, {encoding: `utf-8`}, (err,stdout,stderr) => {
    if(err){
        console.error(`error 발생 : ${err}`);
        return;
    }
    console.log(stdout);
});
// window의 경우 한글이 깨져서 나옴