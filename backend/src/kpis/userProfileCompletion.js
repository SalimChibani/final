const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getUserProfileCompletion(req, res) {
  try {
    const totalUsers = await prisma.user.count();
    const usersWithInfo = await prisma.userInfo.count();
    const percentageWithInfo = (usersWithInfo / totalUsers) * 100;
    res.json({ percentageWithInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getUserProfileCompletion;
