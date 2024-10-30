const posts = {
    data: [
        {
            title: "Test title",
            content: 'Test COntent',
            author: {
                name: 'lee',
                id: 1,
                age: 15
            }
        },
        {
            title: "Test title2",
            content: 'Test COntent2',
            author: {
                name: 'hong' 
            }
        },
        {
            title: "Test title3",
            content: 'Test COntent3',
            author: {

            }       
        },     
        {
            title: "Test title4",
            content: 'Test COntent4'     
        }                  
    ]
}

posts['data'].forEach(item=> {
//    if('author' in item) {  // item 안에 author이 있는지 체크
//        console.log(item['author']['name']);
//    }
//    console.log('-----------------------');
    try {
        console.log(item['author']['name']);
    } catch {
        console.log(`error : ${Error}`);
    } finally {
        // file close, db close
        console.log(`finally`);
    }
    console.log('-----------------------');
});