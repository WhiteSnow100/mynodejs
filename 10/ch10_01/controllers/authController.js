const bcrypt = require(`bcryptjs`);  // 단방향암호화
const { generatedAccessToken, generatedRefreshToken } = require(`../utils/token`);
const userService = require(`../services/userService`);
const jwt = require(`jsonwebtoken`);

// // sign up : 회원가입
const register = async (req, res) => {
    const {email, name, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10자리로 암호화
    try {
        const user = await userService.createUser({
            email: email, name: name, password: hashedPassword
        });
        res.status(201).json({message: 'ok', data: user});
    } catch(e) {
        res.status(500).json({message: 'error', data: e.message});
    }
}

// 로그인
const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await userService.findUserByEmail(email);
        if(!user){
            return res.status(400).json({message: 'INvalid email or password', data: ''});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'INvalid email or password', data: ''});
        }
        const accessToken = generatedAccessToken(user);
        const refreshToken = generatedRefreshToken(user);
        res.status(200).json({accessToken,refreshToken});
        //res.status(200).json({message: 'ok', data: `${accessToken,refreshToken}`});
    }catch(e){
        return res.status(500).json({message: 'error', data: e.message});
    }
}

//refresh token 재생성
const refresh = async (req, res) => {
    const { token } = req.body;  // refresh token
    if(!token) return res.sendStatus(401);  // 401로 바로보낸다
    
    jwt.verify(token, 'refresh', (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generatedAccessToken(user);
        res.status(200).json({message: 'ok', data: accessToken});
    });
} 

module.exports = {
    register,
    login,
    refresh
}
