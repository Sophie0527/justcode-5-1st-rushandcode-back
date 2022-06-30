const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(user_name, encryptedPassword, name) {
  return await prisma.$queryRaw`INSERT INTO users (user_name,password,name) VALUES (${user_name},${encryptedPassword},${name})`;
}

async function readuser(user_name) {
  const [id] =
    await prisma.$queryRaw`SELECT users.user_name,users.password,users.name From users WHERE users.user_name = ${user_name}`;
  return id;
}
async function readname(name) {
  const [naming] =
    await prisma.$queryRaw`SELECT users.user_name,users.password,users.name From users WHERE users.name = ${name}`;
  return naming;
}
async function readUserNameAndId(user_name) {
  const [data] =
    await prisma.$queryRaw`SELECT users.user_name,users.id From users WHERE users.user_name = ${user_name}`;
  return data;
}

module.exports = { createUser, readuser, readUserNameAndId, readname };
