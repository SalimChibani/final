const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getUserRoleDistribution(req, res) {
  try {
    const userRolesDistribution = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true,
      },
    });

    res.json({ userRolesDistribution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getUserRoleDistribution;
