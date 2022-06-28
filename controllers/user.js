const { signup, login } = require('../services/user');

const signupController = async (req, res) => {
  const { user_name, password, name } = req.body;
  await signup(user_name, password, name);
  return res.status(200).json({ message: '회원가입을 축하드립니다.' });
};

const loginController = async (req, res) => {
  const { user_name, password } = req.body;
  const data = await login(user_name, password);
  return res
    .status(201)
    .json({ data: data });
};

module.exports = { signupController, loginController };
