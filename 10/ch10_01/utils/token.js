const jwt = require(`jsonwebtoken`);

const generatedAccessToken = (user) => { // access token
    return jwt.sign({
        id: user.id,
        email: user.email
    }, 'access', {expiresIn: '14d'})  // 14d:14일, 14m:14분
}

const generatedRefreshToken = (user) => { // access token
    return jwt.sign({
        id: user.id,
        email: user.email
    }, 'refresh', {expiresIn: '15d'})  // 14d:14일, 14m:14분
}

module.exports = {
    generatedAccessToken,
    generatedRefreshToken
}
// 