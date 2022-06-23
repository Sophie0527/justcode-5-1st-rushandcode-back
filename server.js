require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const {PrismaClient} =require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncWrap = require('./asyncWrap')

const prisma = new PrismaClient()


const routes = require('./routes');

const { getProductsByConditions } = require('./controllers/product');

const app = express();
app.use(cors());
app.use(express.json());
//app.use(routes);

app.get('/products', getProductsByConditions);

app.post('/signup', asyncWrap(async (req,res)=>{
  const {user_id, password,name} = req.body;
  const [id] = await prisma.$queryRaw
  `SELECT users.user_id From users WHERE users.user_id = ${user_id}`;
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
  
  const encryptedPassword = bcrypt.hashSync(password,10);

  await prisma.$queryRaw 
  `INSERT INTO users (user_id,password,name) VALUES (${user_id},${encryptedPassword},${name})`;
  return res.status(200).json({완료:'회원가입을 축하드립니다.'});
}));

app.post('/login', asyncWrap(async (req,res)=>{
  const {user_id, password} = req.body;
  const [user] = await prisma.$queryRaw
  `SELECT users.user_id,users.password From users WHERE users.user_id = ${user_id}`;
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
      return res.status(201).json({ 받아라토큰: token });
  }
  else {
      const error = new Error('로그인이 실패하였습니다.');
      error.statuCode= 400;
      throw error;
  }
}));

app.use((err, req, res, next) =>{
  if (err) {
      console.log(err)
      return res.status(err.statuscode || 500).json({message: err.message || "실패하였습니다. 관리자에게 문의 하세요"});
  };
  });

  

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
