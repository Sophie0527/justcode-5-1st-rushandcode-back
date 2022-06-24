const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { readuser, createUser } = require('../models/user');

async function signup(user_id, password, name) {
  const id = await readuser(user_id);

  if (id) {
    const error = new Error('이미존재합니다.');
    error.statusCode = 400;
    throw error;
  }

  if (user_id.length < 4) {
    const error = new Error('ID가 너무 짧습니다.');
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error('PASSWORD가 너무 짧습니다.');
    error.statuCode = 400;
    throw error;
  }
  if (name.length < 2) {
    const error = new Error('실명을 작성하세요');
    error.statuCode = 400;
    throw error;
  }
  const encryptedPassword = bcrypt.hashSync(password, 10);
  await createUser(user_id, encryptedPassword, name);
}

async function login(user_id, password) {
  const user = await readuser(user_id);

  if (!user) {
    const error = new Error('등록되지 않은 ID입니다');
    error.statusCode = 400;
    throw error;
  }
  if (user_id < 4) {
    const error = new Error('ID가 너무 짧습니다.');
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error('PASSWORD가 너무 짧습니다.');
    error.statuCode = 400;
    throw error;
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return token;
  } else {
    const error = new Error('로그인이 실패하였습니다.');
    error.statuCode = 400;
    throw error;
  }
}

module.exports = { signup, login };
