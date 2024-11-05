const express = require(`express`);
const mongoose = require(`mongoose`);
mongoose.connect("mongodb://localhost/post");  // connect mongodb
const db = mongoose.connection;  // get connection object

db.on("error", (err)=> {  // error 발생했을 때
    console.error(`db connect fail: ${JSON.stringify(err)}`);
});

db.once("open", ()=>{ // 연결이 성공했을 때
    console.log(`db connect success`);
});

//make Schema
// define Schema
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', PostSchema); // create collection(tabel)
// const Comment = mongoose.model('Comment', PostSchema); // create collection(tabel)

const app = express();
app.use(express.json());

// npx nodemon app.js
app.post("/posts", async (req, res)=>{
    const { title, content, author } = req.body; //get content title from body
    try{
        const post = new Post({ // create post object
            title: title,
            content: content,
            author: author
        });

        await post.save(); // save mongodb
        res.status(200).json({data: post, message:'ok'}); // return result to user
    }catch(e){
        res.status(500).json({message: e});
    }
});

// post list find : 글 목록 가져오기
app.get("/posts", async (req, res)=>{
    // const author = req.params.author;  // app.get("/posts/:author" 로..
    const author = req.query.author;  // app.get("/posts" 로..
    const content = req.query.content;  // app.get("/posts" 로..

    try{
        const posts = await Post.find({author:author, content:content});  // select * from Post
        res.status(200).json({data: posts, message:'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
});

// update
app.put("/posts/:id", async (req, res)=>{
    const { id } = req.params;
    const { title, content, author } = req.body; //get content title from body

    try{
        const post = await Post.findByIdAndUpdate(
            id,
            {
                title: title,
                content: content,
                author: author                
            },
            {new : true}  //업데이트가 적용된 후의 문서를 반환합니다.
        );
        res.status(200).json({data: post, message:'ok'}); // return result to user
    }catch(e){
        res.status(500).json({message: e});
    }
});

// delete
app.delete("/posts/:id", async (req, res)=>{
    const { id } = req.params;

    try{
        await Post.findByIdAndDelete(id);
        res.status(204).send(); // 204: 응답메세지를 아무것도 안줄때 
    }catch(e){
        res.status(500).json({message: e});
    }
});

app.listen(3000, ()=>{
    console.log(`server is running`);
});

