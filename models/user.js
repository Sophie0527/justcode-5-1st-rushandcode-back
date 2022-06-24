const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(user_id, encryptedPassword, name) {
  return await prisma.$queryRaw`INSERT INTO users (user_id,password,name) VALUES (${user_id},${encryptedPassword},${name})`;
}

async function readuser(user_id) {
  const [id] =
    await prisma.$queryRaw`SELECT users.user_id,users.password From users WHERE users.user_id = ${user_id}`;
  return id;
}

module.exports = { createUser, readuser };
