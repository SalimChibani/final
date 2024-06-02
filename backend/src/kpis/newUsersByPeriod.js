const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getNewUsersByPeriod(req, res) {
  const { startDate, endDate } = req.query;
  try {
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    res.json({ newUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getNewUsersByPeriod;
