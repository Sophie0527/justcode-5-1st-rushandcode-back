const bcrypt = require('bcryptjs')


const { readuser,createUser } = require('../models/user');
const { signup,login } = require('../services/user');


const signupController = async (req, res) => {
    const {user_id, password,name} = req.body;
    const user = await readuser(user_id);
    signup(user,password,user_id,name);
    const encryptedPassword = bcrypt.hashSync(password,10);
    await createUser(user_id,encryptedPassword,name);
    return res.status(200).json({완료:'회원가입을 축하드립니다.'});
  }
  


const loginController = async (req,res)=>{
  const {user_id, password} = req.body;
  const user = await readuser(user_id);
  const token = login(user,user_id,password);
  return res.status(201).json({ 받아라토큰: token });
}


module.exports = { signupController, loginController };
