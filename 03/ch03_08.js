// os 모듈
const os = require(`os`);

console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPU-core: ${os.cpus().length}`);
console.log(`CPU: ${JSON.stringify(os.cpus())}`);
console.log(`TOtal Mem: ${os.totalmem()/1024/1024/1024}GB`);
console.log(`hostname: ${os.hostname()}`);
console.log(`network: ${JSON.stringify(os.networkInterfaces())}`);