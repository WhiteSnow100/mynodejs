const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const express = require("express");

// !는 필수란 의미입니다.
const schema = buildSchema(`
    type Query {
        hello: String
        welcome(name: String!): String
    }
`);
// hello, welcome : 리졸버의 함수와 맵핑

// resolver 리졸버 정의
// client library for react :  https://www.apollographql.com/docs/react/get-started
const root = {
    hello: () => {
        return "Hello GraphQL";
    },
    welcome: ({name}) => {
        return `Welcome ${name}`;
    }
}

// 서버설정 : localhost:4000/graphql 로 접속, 공란일 경우 localhost:4000/ 으로 접속
const app = express();
app.use("/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,  // resolver
        graphiql: true  // true : Client UI 기본 제공
    })
);

app.listen(4000);
