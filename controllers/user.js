const { signup, login } = require('../services/user');

const signupController = async (req, res) => {
  const { user_id, password, name } = req.body;
  await signup(user_id, password, name);
  return res.status(200).json({ 완료: '회원가입을 축하드립니다.' });
};

const loginController = async (req, res) => {
  const { user_id, password } = req.body;
  const token = await login(user_id, password);
  return res.status(201).json({ 받아라토큰: token });
};

module.exports = { signupController, loginController };
