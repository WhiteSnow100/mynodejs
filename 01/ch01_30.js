// async : 비동기
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // fetch from remote if success true else fail error
        setTimeout(() => {
            const success = false;
            const data = {
                name: 'lee', age:15
            }
            const error = {
                message: 'error 505'
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
// await = resolve.then과 동일

async function getData() {
    try{
        const data = await fetchData();
        console.log(`fetchData result => ${JSON.stringify(data)}`, data);
    }catch(e) {
        // console.error(e);
        console.log(`error : `,e);
        console.log(`error : ${JSON.stringify(e)}`);
    }
}

getData();
