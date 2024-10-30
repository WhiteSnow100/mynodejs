// promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // fetch from remote if success true else fail error
        setTimeout(() => {
            const success = true;
            const data = {
                name: 'lee', age:15
            }
            const error = {
                message: 'error '
            }

            if(success) {
                resolve(data); 
            } else {
                reject(error);
            }
    },2000);
    });
}
// 윗부분은 외부에서 처리해서 던져주게됨.

const result = fetchData();
result.then((data) => {  // then : 결과호출
    console.log('resolve', data);
}).catch((error) => {
    console.log(`reject`, error);
});
