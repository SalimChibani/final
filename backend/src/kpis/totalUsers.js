const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getTotalUsers(req, res) {
  try {
    const totalUsers = await prisma.user.count();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getTotalUsers;
