// callback
let data;

console.log("begin");
//from remote mock
const fetchData = (cb) => { // cb:handledData
    setTimeout(()=> {
        data = {
            name: 'lee',
            age: 15,
        };
        cb(data);
    },2000);
}
console.log("end");

const handleData = (data) => {  // callback function
    console.log(`from callback : ${JSON.stringify(data)}`);
}

fetchData(handleData);

