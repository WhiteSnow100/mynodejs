// 중첩조건문
const date = new Date();
const hour = date.getHours();

if (hour < 11) {
    console.log(`아침`, hour);
} else {
    if(hour < 15) {
        console.log(`점심 : 오늘날짜는 ${date}이고 현재시간은 ${hour}시 입니다.`);
    }  else {
        console.log(`저녁`);
    }
}

