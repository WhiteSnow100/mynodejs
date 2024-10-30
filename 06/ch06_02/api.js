const express = require("express");
const moment = require("moment"); // 날짜관련 함수
const sqlite3 = require("sqlite3"); // db
const path = require("path");
const exp = require("constants");

// database setting
const db_name = path.join(__dirname,"post.db"); // sqllite3 database file name
const db = new sqlite3.Database(db_name);  // db. 으로 사용 (db.exec() )

const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createAt datetime default current_timestamp,
        count integer default 0
    );
`;

db.serialize(() => {  // 
    db.run(create_sql, (err) => {
        console.log(err);  // error가 없을때는 null로
    });  // post.db
});
// npx nodemon api.js

const app = express();
const PORT = 3000;
app.use(express.json());

// add route
// post /posts : create
// insert : postman - post로 data insert
app.post(`/posts`, (req,res) => {
    const { title, content, author } = req.body;
    let sql = ` insert into posts(title, content, author) values(?, ?, ?) `;

    // db.run : insert, update, delete 할때 사용
    db.run(sql, [title, content, author], function (err) {
        if(err) {
            res.status(500).json({error: err.message});
        }
        console.log(`row id: ${JSON.stringify(this)}`);
        res.status(201).json({result: 'success', id: this.lastID});
    });
});

// select : postman - get으로 확인
// best case : localhost:3000/posts?page=2
// page처리 : offset 
app.get(`/posts`, (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1; // page가 null일경우 1로 셋팅
    const limit = 5; // 한페이지 5개 게시글을 보여주세요.
    const offset = (page-1) * limit;
    // page:1 offset:0, page:2 offset:5, page:3 offset:10

    let sql = ` select id, title, author, createAt, count from posts order by createAt desc limit ? offset ? `;
    // select * from posts 
    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
        }
        let total_sql = ` select count(1) as total_count from posts `
        db.get(total_sql, (err1, row) => {
            if(err1) {
                res.status(500).json({error:err1.message});
            }
            const total = row.total_count;  // total:13, limit:5
            const totalPages = Math.ceil(total / limit); // 3
            res.status(200).json({items: rows, currentPage: page, totalPages: totalPages});
        });
    });
});

app.get('/posts/:id', (req,res) => {
    const id = req.params.id;

    let sql = ` select id, title, content, author, createAt, count from posts where id = ? `;
    let count_sql = ' update posts set count = count + 1 where id = ? ';
    db.run(count_sql, [id], (err) => {  //1. update view count
        if(err) {
            res.status(500).json({error: err.message});
        }    
        db.get(sql, [id], (err1, row) => {  //2.select * from posts where id = ?
            if(err1) {
                res.status(500).json({error: err1.message});
            }
            res.json({item: row});
        });
    });
});

// put : localhost:3000/posts/1
// body -> raw -> json {"title":"update title", "content":"content"}
app.put('/posts/:id', (req,res) => {
    const id = req.params.id;
    const { title, content } = req.body; // title, content 만 get

    let sql = ' update posts set title = ?, content = ? where id = ? ';
    db.run(sql, [title, content, id], (err) => {
        if(err) {
            res.status(500).json({error: err.message});
        }

        res.json({result: "success"});
    });
});

// delete : localhost:3000/posts/1
app.delete('/posts/:id', (req,res) => {
    const id = req.params.id;

    let sql = ' delete from posts where id = ? ';
    db.run(sql, [id], (err) => {
        if(err) {
            res.status(500).json({error: err.message});
        }

        res.json({result: "success"});
    });
});

app.listen(PORT);


