// express 띄우기
const express = require("express");
const path = require("path");
const models = require("./models");  // models/index.js 호출

const multer = require(`multer`); // added 2024-11-04 npm i multer

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({exteneded: true}));  // true : 복잡한것도 ok
app.use("/downloads", express.static(path.join(__dirname, "public/uploads"))); // addes 2024.11.04
// req : http://localhost:3000/downloads/test.png
// res : public/uploads/test.png

const upload_dir = "public/uploads"; 
const storage = multer.diskStorage({
    destination : `./${upload_dir}`,
    filename: function(req, file, cb) { // originalname : test.png
        cb(null,
            path.parse(file.originalname).name + //test 
            "-" +
            Date.now() +
            path.extname(file.originalname) //.png
        );
    } // test.png => test-202411041104.png  
});
// 중복발생을 막기 위해 파일이름을 읽어서 현재일시를 붙혀서 파일이름을 다시 만들어줌
// cb : callback의 약자
const upload = multer({storage: storage}); 

// upload.single("file") : 2024.11.04 수정내용으로 middleware
// callback함수를 async로
app.post('/posts', upload.single("file"), async (req, res) => {
    const {title, content, author} = req.body;
    let filename = req.file ? req.file.filename : null;  // added 2024.11.04
    filename = `/downloads/${filename}`; // /downloads/test-20241104....png 로 
    const post = await models.Post.create({
        title: title,
        content: content,
        author: author,
        filename: filename  // 2024.11.04
    });
    res.status(201).json({post:post});
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const {content} = req.body;
    // insert into comments(postId, content) values(?, ?)
    const comment = await models.Comment.create({  
        PostId: postId,
        content: content
    });
    res.status(201).json({data:comment});
});

app.get('/posts', async (req,res) => {
    const posts = await models.Post.findAll({
        include: [
            {model: models.Comment}
        ]
    });
    res.json({ data: posts });
});

app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const {title, content, author} = req.body;
    const post = await models.Post.findByPk(id);
    if(post) {
        post.title = title;
        post.content = content;
        post.author = author;
        await post.save();
        res.status(200).json({data: post});
    }else{
        res.status(404).json({result:`post not found`});
    }
});

app.delete('/posts/:id', async (req,res) => {
    const result = await models.Post.destroy({
        where: {id: req.params.id}
    });
    console.log(result);
    if(result) {
        res.status(204).send();
    }else{
        res.status(404).json({data:'post not found'});
    }
});

app.get('/posts/:id', async (req,res) => {
    const id = req.params.id;
    
    const post = await models.Post.findOne({
        where: {id:id}
    });
    if(post) {
        res.status(200).json({data:post});
    }else{
        res.status(404).json({data:'post not found'});
    }
});

// comment update : 수정시는 put method
app.put(`/posts/:postId/comments/:commentId`, async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const {content} = req.body;
    const comment = await models.Comment.findByPk(commentId); //1. comment get
    if(comment) {
        comment.content = content;
        await comment.save(); //2. comment update
        res.status(200).json({data: comment});
    }else{
        res.status(404).json({result: "comment not found"});
    }
});

// comment delete
app.delete(`/posts/:postId/comments/:commentId`, async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const result = await models.Comment.destroy({ where : {id: commentId}});

    if (result) {
        res.status(204).json({result: `${result}건이 삭제 되었습니다`});
    }else{
        res.status(404).json({result: "comment not found"});
    }
});

// npx nodemon app.js
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
    models.sequelize
        .sync({force: false}) // false는 재실행시 오류없이 pass
        .then(()=>{
            console.log('DB Connected');
        })
        .catch((err) => {
            console.log(`DB error: ${err}`);
            process.exit();
        });
});

