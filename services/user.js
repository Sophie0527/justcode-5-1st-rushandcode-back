const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function signup(id,password,user_id,name) {
    if(id){
        const error = new Error('이미존재합니다.');
        error.statusCode = 400;
        throw error;
    }
    
    if(user_id<4){
        const error = new Error('ID가 너무 짧습니다.');
        error.statusCode = 400;
        throw error;
    }
    
    if(password.length<8){
        const error = new Error('PASSWORD가 너무 짧습니다.')
        error.statuCode = 400;
        throw error;
    }
    if(name.length<2){
        const error = new Error('실명을 작성하세요')
        error.statuCode = 400;
        throw error;
    }
}

function login(user,user_id,password) {
    if(!user){
        const error = new Error('등록되지 않은 ID입니다');
        error.statusCode = 400;
        throw error;
    }
    if(user_id<4){
        const error = new Error('ID가 너무 짧습니다.');
        error.statusCode = 400;
        throw error;
    }
    
    if(password.length<8){
        const error = new Error('PASSWORD가 너무 짧습니다.')
        error.statuCode = 400;
        throw error;
    }
    if (bcrypt.compareSync(password,user.password)){
        const token = jwt.sign({ id : user.user_id},process.env.SECRET_KEY,{expiresIn: '1d'});
        return token
    }
    else {
        const error = new Error('로그인이 실패하였습니다.');
        error.statuCode= 400;
        throw error;
    }
}

module.exports = { signup, login };
