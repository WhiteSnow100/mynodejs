const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    let token;
    if(req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]; // Bearer xxxx 에서 xxxx값만
    }
    if(!token) return res.status(401);  // token값이 없는경우 에러로 무조건튕김
    jwt.verify(token, 'access', (err, user) => {
        if(err) return res.status(401);  // token값이 유효하지 않으면 에러로 무조건튕김
        req.user = user;  //id, email
        next();
    });
}

module.exports = {
    authenticate
}