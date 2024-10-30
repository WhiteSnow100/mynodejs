const express = require("express");
const moment = require("moment"); // 날짜관련 함수
const path = require("path");
const Database = require("better-sqlite3"); // db

// db setting 
const db_name = path.join(__dirname,"post.db"); //  
const db = new Database(db_name);  // db. 으로 사용 (db.exec() )

const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createAt datetime default current_timestamp,
        count integer default 0
    );

    create table if not exists comments(
        id integer primary key autoincrement,
        content text not null,
        postId integer,
        foreign key(postId) references posts(id)
    );    
`;

db.exec(create_sql);
 
const app = express();
const PORT = 3000;
app.use(express.json());


// GET localhost:3000/posts?page=2 -> list
app.get(`/posts`, (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const offset = (page-1)*limit;
    const sql = ` select id, title, author, createAt, count from posts order by createAt desc limit ? offset ? `;
    const stnt = db.prepare(sql);
    const rows = stnt.all(limit, offset);

    const total_sql = ` select count(1) as count from posts `;
    const row = db.prepare(total_sql).get();
    const totalpages = Math.ceil(row.count / limit);
    // error 는 try/catch 로

    res.json({items: rows, currentpage: page, totalPages:totalpages});
});


// GET localhost:3000/posts/1
app.get('/posts/:id', (req,res) => {
    const id = req.params.id;

    let sql = ` select id, title, content, author, createAt, count from posts where id = ? `;
    let count_sql = ' update posts set count = count + 1 where id = ? ';

    db.prepare(count_sql).run(id);  // const stnt = db.prepare(count_sql); stnt.run(id);
    const post = db.prepare(sql).get(id); // const stnt = db.prepare(sql); const post = stnt.get(id);
    res.status(200).json({item: post}) //
    // error try/catch 써서 처리    
});

// POST 
app.post(`/posts`, (req,res) => {
    const { title, content, author } = req.body;
    let sql = ` insert into posts(title, content, author) values(?, ?, ?) `;

    const result = db.prepare(sql).run(title, content, author);
    console.log(`result is ${JSON.stringify(result)}`);
    res.status(201).json({id: result.lastInsertRowid, title:title, content:content});
});

// PUT localhost:3000/posts?
app.put('/posts/:id', (req,res) => {
    const id = req.params.id; 
    const { title, content, author } = req.body; // title, content 만 get

    let sql = ' update posts set title = ?, content = ?, author = ? where id = ? ';
    try{
        const result = db.prepare(sql).run(title, content, author, id); 
        console.log(' update resule : ${JSON.stringigy(result)}');
        // res.status(200).json({id: id, title:title, content:content, author:author});
        if(result.changes){ // changes:updated count if 0 fail else success
            res.status(200).json({result: 'success'});
        }else{
            res.status(404).json({result: 'post not found', result2: result.changes});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

app.delete('/posts/:id', (req,res) => {
    const id = req.params.id;
    let sql = ' delete from posts where id = ? ';
    try{
        const result = db.prepare(sql).run(id);   
        if(res.changes){
            res.status(200).json({result : 'success'});
        }else{
            res.status(404).json({result: 'post not found'});
        }
    }catch(e){
        res.status(500).json({error: e});
    }
    const result = db.prepare(sql).run(id);    
});

app.post("/posts/:postId/comments", (req,res) => {
    const postId = req.params.postId;
    const {content} = req.body;
    const result = db.prepare(` insert into comments(postId, content) values (?, ?) `).run(postId, content);
    res.status(200).json({id: result.lastInsertRowid, postId: postId, content: content});
});

app.get('/posts/:postId/comments', (req,res) => {
    const postId = req.params.id;
    const comments = db.prepare(` select * from comments where postId = ? `).all(postId);  // .all 은 multi row data를 가져올떄
    res.json({comments:comments});
});

app.put('/posts/:postId/comments/:id', (req,res) => {
    const id = req.params.id;
    const {content} = req.body;
    const result = db.prepare(` update comments set content = ? where id = ? `).run(content, id);  
    if (result.changes) {
        res.status(200).json({result:'ok', message:'success', error:''})
    } else {
        res.status(404).json({result:'ok', message:'comment is not found', error:''})
    } 
});

// localhost:3000/posts/4/comments/3
app.delete('/posts/:postId/comments/:id', (req,res) => {
    const id = req.params.id; 
    const result = db.prepare(` delete from comments where id = ? `).run(id);  
    if (result.changes) {
        res.status(200).json({result:'ok', message:'success', error:''})
    } else {
        res.status(404).json({result:'ok', message:'comment is not found', error:''})
    } 
});

// 문제1) 게시글 상세 GET /posts/1을 요청할 경우 해당글의 comments에 답글이 있는 경우
// 게시글 상세와 답글 목록을 한번에 조회해 보세요. 쿼리는 한번에 서브쿼리, 조인을 쓰셔도 됩니다.
app.get('/posts/comments/:postId', (req,res) => {
    const postId = req.params.postId;
    const sql = ` 
        select a.*, '[' || group_concat('{ "id":'||b.id||','||'"content":'||'"'||b.content||'"}',',')||']' comments 
        from posts a left join  comments b 
        on a.id = b.postId 
        where a.id = ? 
        group by a.id`; 
    db.prepare(' update posts set count = count + 1 where id = ? ').run(postId);
    const post = db.prepare(sql).get(postId);    
    post.comments = JSON.parse(post.comments);
    res.status(200).json({item: post});
});

app.listen(PORT);