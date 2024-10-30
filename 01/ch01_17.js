// break, continue 
// continue를 만나면 for문으로 
let arr = [5, 23, "hello", true, 'world', -9];

for(i in arr) {
    if(typeof(arr[i])=='string') {
        // break;
        continue; 
    } 
    console.log(`${arr[i]}`);  //5, 23
}