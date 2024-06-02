const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getAverageProductsPerUser(req, res) {
  try {
    const usersWithProductCount = await prisma.product.groupBy({
      by: ['userId'],
      _count: {
        id: true,
      },
    });

    const totalUsers = usersWithProductCount.length;
    const totalProducts = usersWithProductCount.reduce((sum, user) => sum + user._count.id, 0);

    const averageProductsPerUser = totalProducts / totalUsers;
    res.json({ averageProductsPerUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAverageProductsPerUser;
